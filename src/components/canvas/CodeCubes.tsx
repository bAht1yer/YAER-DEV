"use client";

import { MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * CodeCubes — industrial re-material.
 *
 * Same scene as before (labelled cubes drifting down, pointer-reactive tilt, click
 * to cycle palette) but re-materialized for the industrial aesthetic:
 *  - Single tight palette (lime + steel + safety) instead of rainbow neon
 *  - Lower emissive intensity (glow as accent, not signature)
 *  - Heavier wireframe edges (engineering, not hacker)
 *  - Slower motion, fewer cubes by default
 *  - Neutral lighting (white/steel) instead of cyan + orange point lights
 */

const DESKTOP_COUNT = 5;
const MOBILE_COUNT = 3;

const CAPABILITY_STEPS = [
    "SOLVE",
    "DESIGN",
    "AI",
    "BUILD",
    "SHIP",
];

// Industrial palette — three options instead of five. Lime carries it; steel and
// safety appear as accents to keep the cubes distinguishable but cohesive.
const PALETTE = [
    { edge: "#E6FF3A", glow: "#E6FF3A" }, // lime — primary
    { edge: "#D4DCE3", glow: "#D4DCE3" }, // steel
    { edge: "#FF5A1F", glow: "#FF5A1F" }, // safety
    { edge: "#E6FF3A", glow: "#E6FF3A" }, // lime again — weighted toward the primary
    { edge: "#D4DCE3", glow: "#D4DCE3" }, // steel
];

interface CubeData {
    id: string;
    label: string;
    paletteIndex: number;
    color: string;
    glow: string;
    laneFactor: number;
    y: number;
    z: number;
    scale: number;
    velocity: number;
    drift: number;
    driftSpeed: number;
    phase: number;
    rotationBase: THREE.Euler;
    rotationSpeed: THREE.Vector3;
}

interface PointerState {
    x: number;
    y: number;
    targetX: number;
    targetY: number;
}

type CubeRegistry = MutableRefObject<Array<THREE.Group | null>>;

function makeLabelTexture(label: string, color: string) {
    if (typeof document === "undefined") return null;

    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;
    // Subtle shadow only — industrial means restraint, not blown-out glow
    ctx.shadowColor = color;
    ctx.shadowBlur = 6;
    ctx.fillStyle = "#f4f6f8";
    ctx.font = `700 ${label.length > 6 ? 58 : 76}px JetBrains Mono, Consolas, monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, 256, 256);

    ctx.shadowBlur = 0;
    ctx.globalAlpha = 0.55;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(196, 324);
    ctx.lineTo(316, 324);
    ctx.stroke();

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    texture.needsUpdate = true;
    return texture;
}

function buildCubeData(count: number, viewportHeight: number, compact: boolean): CubeData[] {
    // Lane factor: -1..1 mapped to usable horizontal range. The previous version had
    // factors > 0.5 which all got clamped to the viewport edge — same-side cubes
    // stacked on top of each other. New lanes are spread so each cube has its own
    // X column with enough gap to never overlap, even with drift sin() motion.
    const desktopLanes = [-0.80, 0.55, -0.20, 0.80, -0.50];
    const mobileLanes = [-0.65, 0.65, 0.05];
    const lanes = compact ? mobileLanes : desktopLanes;
    const spacing = (viewportHeight + 8) / count;

    return Array.from({ length: count }, (_, index) => {
        const label = CAPABILITY_STEPS[index % CAPABILITY_STEPS.length];
        const palette = PALETTE[index % PALETTE.length];
        const laneFactor = lanes[index % lanes.length];
        const depthCycle = index % 3;

        return {
            id: `${label}-${index}`,
            label,
            paletteIndex: index % PALETTE.length,
            color: palette.edge,
            glow: palette.glow,
            laneFactor,
            y: viewportHeight / 2 + 4 - index * spacing,
            z: -2.4 - depthCycle * 1.15,
            scale: (compact ? 0.54 : 0.7) + (index % 2) * 0.06,
            // Velocity / drift slowed ~30% from the cyberpunk version — industrial = restrained motion
            velocity: compact ? 0.15 : 0.18,
            drift: compact ? 0.08 : 0.14,
            driftSpeed: 0.18 + (index % 3) * 0.025,
            phase: index * 1.37,
            rotationBase: new THREE.Euler(0.16 * (index % 2 ? -1 : 1), 0.28 * (index % 3 - 1), 0.08),
            rotationSpeed: new THREE.Vector3(
                0.028 + (index % 3) * 0.008,
                0.036 + (index % 3) * 0.01,
                0.018 + (index % 2) * 0.005
            ),
        };
    });
}

function CodeBlock({
    data,
    index,
    paletteIndex,
    compact,
    clickedIndex,
    pointer,
    registerCube,
    reducedMotion,
}: {
    data: CubeData;
    index: number;
    paletteIndex: number;
    compact: boolean;
    clickedIndex: number | null;
    pointer: MutableRefObject<PointerState>;
    registerCube: (index: number, group: THREE.Group | null) => void;
    reducedMotion: boolean;
}) {
    const groupRef = useRef<THREE.Group | null>(null);
    const bodyMaterial = useRef<THREE.MeshStandardMaterial>(null);
    const coreMaterial = useRef<THREE.MeshBasicMaterial>(null);
    const edgeMaterial = useRef<THREE.LineBasicMaterial>(null);
    const pulse = useRef(0);
    const { camera, viewport } = useThree();
    const activePalette = PALETTE[paletteIndex];

    const faceTexture = useMemo(
        () => makeLabelTexture(data.label, activePalette.edge),
        [activePalette.edge, data.label]
    );

    const edgeGeometry = useMemo(() => {
        const boxGeometry = new THREE.BoxGeometry(1.025, 1.025, 1.025);
        const edgesGeometry = new THREE.EdgesGeometry(boxGeometry);
        boxGeometry.dispose();
        return edgesGeometry;
    }, []);

    useEffect(() => () => {
        faceTexture?.dispose();
        edgeGeometry.dispose();
    }, [edgeGeometry, faceTexture]);

    useEffect(() => {
        if (clickedIndex === index) {
            pulse.current = 1;
        }
    }, [clickedIndex, index]);

    useEffect(() => {
        bodyMaterial.current?.emissive.set(activePalette.glow);
        coreMaterial.current?.color.set(activePalette.glow);
        edgeMaterial.current?.color.set(activePalette.edge);
    }, [activePalette.edge, activePalette.glow]);

    const setGroupRef = useCallback((node: THREE.Group | null) => {
        groupRef.current = node;
        registerCube(index, node);
    }, [index, registerCube]);

    useFrame((state, frameDelta) => {
        const group = groupRef.current;
        if (!group) return;

        const delta = Math.min(frameDelta, 0.045);
        const elapsed = state.clock.elapsedTime + data.phase;
        const motionScale = reducedMotion ? 0.18 : 1;
        const depthViewport = viewport.getCurrentViewport(camera, new THREE.Vector3(0, 0, data.z));
        // Map laneFactor (-1..1) directly onto the usable half-width — no clamp,
        // because lane factors are already constrained to ±0.85 in buildCubeData.
        const usableHalfWidth = Math.max(depthViewport.width / 2 - 1.1, 1.6);
        const laneX = data.laneFactor * usableHalfWidth;
        const pointerNudge = pointer.current.x * (compact ? 0.06 : 0.1);
        const targetX = laneX + Math.sin(elapsed * data.driftSpeed) * data.drift * motionScale + pointerNudge;

        group.position.x = THREE.MathUtils.damp(group.position.x, targetX, 4.2, delta);
        group.position.y -= data.velocity * delta * motionScale;
        group.position.z = data.z + Math.sin(elapsed * 0.2) * 0.15;

        const verticalLimit = depthViewport.height / 2 + data.scale * 1.8;
        if (group.position.y < -verticalLimit) {
            // Stagger respawn by full cube index so cycling doesn't bunch them up over time
            group.position.y = verticalLimit + index * 1.4;
        }

        const proximity = Math.max(
            0,
            1 - Math.hypot(pointer.current.x * viewport.width * 0.5 - group.position.x, pointer.current.y * viewport.height * 0.5 - group.position.y) / (compact ? 3.2 : 4.6)
        );
        const tiltX = data.rotationBase.x + pointer.current.y * proximity * 0.32;
        const tiltY = data.rotationBase.y - pointer.current.x * proximity * 0.32;

        group.rotation.x = THREE.MathUtils.damp(
            group.rotation.x,
            tiltX + Math.sin(elapsed * data.rotationSpeed.x) * 0.14 * motionScale,
            3.6,
            delta
        );
        group.rotation.y = THREE.MathUtils.damp(
            group.rotation.y,
            tiltY + Math.cos(elapsed * data.rotationSpeed.y) * 0.16 * motionScale,
            3.6,
            delta
        );
        group.rotation.z = THREE.MathUtils.damp(
            group.rotation.z,
            data.rotationBase.z + Math.sin(elapsed * data.rotationSpeed.z) * 0.09 * motionScale,
            3.6,
            delta
        );

        pulse.current = THREE.MathUtils.damp(pulse.current, 0, 5.8, delta);
        const pulseValue = pulse.current;
        const edgeWave = (Math.sin(elapsed * 1.2) + 1) * 0.5;
        group.scale.setScalar(data.scale * (1 + pulseValue * 0.09));

        // Lower emissive than the cyberpunk version — glow as accent, not signature
        if (bodyMaterial.current) {
            bodyMaterial.current.emissiveIntensity = 0.04 + proximity * 0.07 + pulseValue * 0.16;
        }
        if (coreMaterial.current) {
            coreMaterial.current.opacity = 0.06 + proximity * 0.04 + pulseValue * 0.14;
        }
        if (edgeMaterial.current) {
            edgeMaterial.current.opacity = 0.55 + proximity * 0.18 + edgeWave * 0.14 + pulseValue * 0.2;
        }
    });

    const initialViewport = viewport.getCurrentViewport(camera, new THREE.Vector3(0, 0, data.z));
    const initialUsableHalfWidth = Math.max(initialViewport.width / 2 - 1.1, 1.6);
    const initialX = data.laneFactor * initialUsableHalfWidth;

    return (
        <group
            ref={setGroupRef}
            position={[initialX, data.y, data.z]}
            scale={data.scale}
            name={`capability-cube-${index}`}
        >
            <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial
                    ref={bodyMaterial}
                    color="#16181C"
                    emissive={activePalette.glow}
                    emissiveIntensity={0.04}
                    roughness={0.62}
                    metalness={0.36}
                    transparent
                    opacity={0.72}
                />
            </mesh>

            <lineSegments geometry={edgeGeometry}>
                <lineBasicMaterial
                    ref={edgeMaterial}
                    color={activePalette.edge}
                    transparent
                    opacity={0.58}
                    depthWrite={false}
                    toneMapped={false}
                />
            </lineSegments>

            <mesh scale={0.9}>
                <boxGeometry args={[1, 1, 1]} />
                <meshBasicMaterial
                    ref={coreMaterial}
                    color={activePalette.glow}
                    transparent
                    opacity={0.06}
                    depthWrite={false}
                    toneMapped={false}
                />
            </mesh>

            {faceTexture && (
                <>
                    <mesh position={[0, 0, 0.512]}>
                        <planeGeometry args={[0.86, 0.86]} />
                        <meshBasicMaterial
                            map={faceTexture}
                            transparent
                            opacity={0.78}
                            depthWrite={false}
                            polygonOffset
                            polygonOffsetFactor={-1}
                            toneMapped={false}
                        />
                    </mesh>
                    <mesh position={[0, 0, -0.512]} rotation={[0, Math.PI, 0]}>
                        <planeGeometry args={[0.86, 0.86]} />
                        <meshBasicMaterial
                            map={faceTexture}
                            transparent
                            opacity={0.78}
                            depthWrite={false}
                            polygonOffset
                            polygonOffsetFactor={-1}
                            toneMapped={false}
                        />
                    </mesh>
                </>
            )}
        </group>
    );
}

export default function CodeCubes() {
    const { camera, size, viewport } = useThree();
    const groupRef = useRef<THREE.Group>(null);
    const cubeRefs: CubeRegistry = useRef([]);
    const pointer = useRef<PointerState>({ x: 0, y: 0, targetX: 0, targetY: 0 });
    const raycaster = useMemo(() => new THREE.Raycaster(), []);
    const [clickedIndex, setClickedIndex] = useState<number | null>(null);
    const [paletteIndices, setPaletteIndices] = useState<number[]>([]);
    const [reducedMotion, setReducedMotion] = useState(false);
    const compact = size.width < 768;
    const cubeCount = reducedMotion ? Math.min(compact ? 3 : 5, compact ? MOBILE_COUNT : DESKTOP_COUNT) : compact ? MOBILE_COUNT : DESKTOP_COUNT;

    const cubes = useMemo(
        () => buildCubeData(cubeCount, viewport.height, compact),
        [compact, cubeCount, viewport.height]
    );

    const registerCube = useCallback((index: number, group: THREE.Group | null) => {
        cubeRefs.current[index] = group;
    }, [cubeRefs]);

    useEffect(() => {
        const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        const updateMotionPreference = () => setReducedMotion(motionQuery.matches);

        updateMotionPreference();
        motionQuery.addEventListener("change", updateMotionPreference);
        return () => motionQuery.removeEventListener("change", updateMotionPreference);
    }, []);

    useEffect(() => {
        const updatePointer = (e: PointerEvent) => {
            pointer.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
            pointer.current.targetY = -((e.clientY / window.innerHeight) * 2 - 1);
        };

        const handleClick = (e: PointerEvent) => {
            const target = e.target;
            if (target instanceof Element && target.closest("a,button,input,textarea,select,[role='button']")) {
                return;
            }

            const mouse = new THREE.Vector2(
                (e.clientX / window.innerWidth) * 2 - 1,
                -((e.clientY / window.innerHeight) * 2 - 1)
            );
            const clickables = cubeRefs.current.filter(Boolean) as THREE.Group[];

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(clickables, true);
            const hit = intersects.find((intersect) => {
                let object: THREE.Object3D | null = intersect.object;
                while (object && !object.name.startsWith("capability-cube-")) {
                    object = object.parent;
                }
                return Boolean(object?.name.startsWith("capability-cube-"));
            });

            if (!hit) return;

            let object: THREE.Object3D | null = hit.object;
            while (object && !object.name.startsWith("capability-cube-")) {
                object = object.parent;
            }

            if (!object) return;

            const index = Number(object.name.replace("capability-cube-", ""));
            if (Number.isFinite(index)) {
                setPaletteIndices((current) => {
                    const next = [...current];
                    const baseIndex = next[index] ?? cubes[index]?.paletteIndex ?? 0;
                    next[index] = (baseIndex + 1) % PALETTE.length;
                    return next;
                });
                setClickedIndex(index);
                window.setTimeout(() => setClickedIndex(null), 140);
            }
        };

        window.addEventListener("pointermove", updatePointer, { passive: true });
        window.addEventListener("pointerdown", handleClick, { passive: true });

        return () => {
            window.removeEventListener("pointermove", updatePointer);
            window.removeEventListener("pointerdown", handleClick);
        };
    }, [camera, cubes, raycaster]);

    useFrame((_, delta) => {
        const clampedDelta = Math.min(delta, 0.045);
        pointer.current.x = THREE.MathUtils.damp(pointer.current.x, pointer.current.targetX, 5.6, clampedDelta);
        pointer.current.y = THREE.MathUtils.damp(pointer.current.y, pointer.current.targetY, 5.6, clampedDelta);
    });

    return (
        <group ref={groupRef}>
            {/* Industrial fog — neutral, no neon color cast */}
            <fog attach="fog" args={["#0A0B0D", 7, 18]} />
            <ambientLight intensity={0.32} />
            <directionalLight position={[6, 8, 5]} intensity={0.85} color="#ffffff" />
            {/* Subtle steel rim + lime accent — replaces cyberpunk cyan/orange combo */}
            <pointLight position={[-6, 4, 2]} intensity={0.28} color="#D4DCE3" />
            <pointLight position={[7, -5, 1]} intensity={0.22} color="#E6FF3A" />

            {cubes.map((data, index) => (
                <CodeBlock
                    key={data.id}
                    data={data}
                    index={index}
                    paletteIndex={paletteIndices[index] ?? data.paletteIndex}
                    compact={compact}
                    clickedIndex={clickedIndex}
                    pointer={pointer}
                    registerCube={registerCube}
                    reducedMotion={reducedMotion}
                />
            ))}
        </group>
    );
}
