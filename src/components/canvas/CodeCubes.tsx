"use client";

import { MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * CodeCubes — Cyan Chrome holographic glass.
 * Faux-glass cubes (translucent body + bright cyan wireframe + inner glow),
 * faces labelled with real tech + project names. Motion: orbital drift
 * around a vertical axis with depth parallax, vertical bob, scroll-reactive
 * speed, and a holographic glow pulse. Honors reduced motion.
 */

const LABELS = [
    "NEXT.JS", "REACT", "THREE.JS", "AI/LLM", "PRISMA", "STRIPE",
    "BOSSIMATING", "DIGITAO", "SPIRIT VEIN",
];

const DESKTOP_COUNT = 6;
const MOBILE_COUNT = 3;

const CYAN = "#34E5FF";
const VIOLET = "#9B7BFF";

interface CubeData {
    id: string;
    label: string;
    radius: number;
    angle: number;
    y: number;
    bobAmp: number;
    bobSpeed: number;
    orbitSpeed: number;
    scale: number;
    spin: THREE.Vector3;
    phase: number;
}

interface PointerState { x: number; y: number; targetX: number; targetY: number; }

function makeLabelTexture(label: string) {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 512; canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.clearRect(0, 0, 512, 512);
    ctx.shadowColor = CYAN;
    ctx.shadowBlur = 12;
    ctx.fillStyle = "#EAF7FB";
    const size = label.length > 8 ? 46 : label.length > 6 ? 56 : 74;
    ctx.font = `700 ${size}px JetBrains Mono, Consolas, monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, 256, 256);
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 0.6;
    ctx.strokeStyle = CYAN;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(176, 320); ctx.lineTo(336, 320); ctx.stroke();
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    texture.needsUpdate = true;
    return texture;
}

function buildCubeData(count: number, compact: boolean): CubeData[] {
    return Array.from({ length: count }, (_, i) => {
        const t = i / count;
        return {
            id: `cube-${i}`,
            label: LABELS[i % LABELS.length],
            radius: (compact ? 1.8 : 3.0) + (i % 3) * (compact ? 0.5 : 0.9),
            angle: t * Math.PI * 2 + (i % 2) * 0.6,
            y: (t - 0.5) * (compact ? 5 : 7),
            bobAmp: 0.18 + (i % 3) * 0.06,
            bobSpeed: 0.3 + (i % 4) * 0.05,
            orbitSpeed: (compact ? 0.05 : 0.07) * (i % 2 ? 1 : -1) * (0.7 + (i % 3) * 0.2),
            scale: (compact ? 0.5 : 0.68) + (i % 2) * 0.08,
            spin: new THREE.Vector3(0.05 + (i % 3) * 0.01, 0.07 + (i % 2) * 0.012, 0.03),
            phase: i * 1.37,
        };
    });
}

const scrollState = { velocity: 0 };

function CubeMesh({
    data, index, pointer, reducedMotion,
}: {
    data: CubeData;
    index: number;
    pointer: MutableRefObject<PointerState>;
    reducedMotion: boolean;
}) {
    const groupRef = useRef<THREE.Group | null>(null);
    const edgeMat = useRef<THREE.LineBasicMaterial>(null);
    const coreMat = useRef<THREE.MeshBasicMaterial>(null);
    // Accumulate orbit angle in a ref (not on the memoized `data` object — mutating
    // that is disallowed and would also reset on viewport-driven rebuilds).
    const angle = useRef(data.angle);

    const faceTexture = useMemo(() => makeLabelTexture(data.label), [data.label]);
    const edgeGeometry = useMemo(() => {
        const box = new THREE.BoxGeometry(1.02, 1.02, 1.02);
        const edges = new THREE.EdgesGeometry(box);
        box.dispose();
        return edges;
    }, []);

    useEffect(() => () => { faceTexture?.dispose(); edgeGeometry.dispose(); }, [edgeGeometry, faceTexture]);

    useFrame((state, frameDelta) => {
        const g = groupRef.current;
        if (!g) return;
        const delta = Math.min(frameDelta, 0.045);
        const m = reducedMotion ? 0 : 1;
        const elapsed = state.clock.elapsedTime + data.phase;

        const speed = data.orbitSpeed * (1 + scrollState.velocity * 1.5);
        angle.current += speed * delta * m;
        const px = pointer.current.x * 0.4;
        const py = pointer.current.y * 0.3;
        g.position.x = Math.cos(angle.current) * data.radius + px;
        g.position.z = Math.sin(angle.current) * data.radius - 2.5;
        g.position.y = data.y + Math.sin(elapsed * data.bobSpeed) * data.bobAmp * m + py;

        g.rotation.x += data.spin.x * delta * m;
        g.rotation.y += data.spin.y * delta * m;
        g.rotation.z += data.spin.z * delta * m;

        const pulse = reducedMotion ? 0 : (Math.sin(elapsed * 0.8) + 1) * 0.5;
        if (edgeMat.current) edgeMat.current.opacity = 0.5 + pulse * 0.3;
        if (coreMat.current) coreMat.current.opacity = 0.05 + pulse * 0.06;
    });

    return (
        <group ref={groupRef} position={[Math.cos(data.angle) * data.radius, data.y, Math.sin(data.angle) * data.radius - 2.5]} scale={data.scale} name={`cube-${index}`}>
            <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial
                    color="#0E171D"
                    emissive={CYAN}
                    emissiveIntensity={0.06}
                    roughness={0.25}
                    metalness={0.1}
                    transparent
                    opacity={0.32}
                />
            </mesh>
            <lineSegments geometry={edgeGeometry}>
                <lineBasicMaterial ref={edgeMat} color={CYAN} transparent opacity={0.6} depthWrite={false} toneMapped={false} />
            </lineSegments>
            <mesh scale={0.86}>
                <boxGeometry args={[1, 1, 1]} />
                <meshBasicMaterial ref={coreMat} color={VIOLET} transparent opacity={0.06} depthWrite={false} toneMapped={false} />
            </mesh>
            {faceTexture && (
                <>
                    <mesh position={[0, 0, 0.512]}>
                        <planeGeometry args={[0.88, 0.88]} />
                        <meshBasicMaterial map={faceTexture} transparent opacity={0.85} depthWrite={false} polygonOffset polygonOffsetFactor={-1} toneMapped={false} />
                    </mesh>
                    <mesh position={[0, 0, -0.512]} rotation={[0, Math.PI, 0]}>
                        <planeGeometry args={[0.88, 0.88]} />
                        <meshBasicMaterial map={faceTexture} transparent opacity={0.85} depthWrite={false} polygonOffset polygonOffsetFactor={-1} toneMapped={false} />
                    </mesh>
                </>
            )}
        </group>
    );
}

export default function CodeCubes() {
    const { size } = useThree();
    const groupRef = useRef<THREE.Group>(null);
    const pointer = useRef<PointerState>({ x: 0, y: 0, targetX: 0, targetY: 0 });
    const [reducedMotion, setReducedMotion] = useState(false);
    const compact = size.width < 768;
    const count = compact ? MOBILE_COUNT : DESKTOP_COUNT;
    const cubes = useMemo(() => buildCubeData(count, compact), [count, compact]);

    useEffect(() => {
        const q = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => setReducedMotion(q.matches);
        update();
        q.addEventListener("change", update);
        return () => q.removeEventListener("change", update);
    }, []);

    useEffect(() => {
        const onMove = (e: PointerEvent) => {
            pointer.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
            pointer.current.targetY = -((e.clientY / window.innerHeight) * 2 - 1);
        };
        let lastY = window.scrollY;
        const onScroll = () => {
            const y = window.scrollY;
            scrollState.velocity = Math.min(Math.abs(y - lastY) / 40, 1.5);
            lastY = y;
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    useFrame((_, delta) => {
        const d = Math.min(delta, 0.045);
        pointer.current.x = THREE.MathUtils.damp(pointer.current.x, pointer.current.targetX, 5, d);
        pointer.current.y = THREE.MathUtils.damp(pointer.current.y, pointer.current.targetY, 5, d);
        scrollState.velocity = THREE.MathUtils.damp(scrollState.velocity, 0, 3, d);
    });

    return (
        <group ref={groupRef}>
            <fog attach="fog" args={["#0A1014", 8, 22]} />
            <ambientLight intensity={0.4} />
            <directionalLight position={[6, 8, 5]} intensity={0.7} color="#ffffff" />
            <pointLight position={[-6, 4, 2]} intensity={0.4} color={CYAN} />
            <pointLight position={[7, -5, 1]} intensity={0.3} color={VIOLET} />
            {cubes.map((data, index) => (
                <CubeMesh key={data.id} data={data} index={index} pointer={pointer} reducedMotion={reducedMotion} />
            ))}
        </group>
    );
}
