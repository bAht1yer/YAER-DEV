"use client";

import { Html } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import * as THREE from "three";

type Block = {
    x: number;
    y: number;
    z: number;
    sx: number;
    sy: number;
    sz: number;
    phase: number;
    speed: number;
    drift: number;
    color: THREE.Color;
    projectIndex: number | null;
};

type FloatingBlockFieldProps = {
    reducedMotion: boolean;
    selectedProject?: number | null;
    onProjectSelect?: (projectIndex: number) => void;
};

function seededRandom(seed: number) {
    let value = seed >>> 0;
    return () => {
        value += 0x6d2b79f5;
        let result = value;
        result = Math.imul(result ^ (result >>> 15), result | 1);
        result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
        return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
    };
}

function createBlocks(mobile: boolean): Block[] {
    const random = seededRandom(mobile ? 2307 : 7319);
    // Extra desktop columns stay outside a standard viewport but fill ultrawide/full-screen displays.
    // Instancing keeps the larger wall to a single draw call.
    const columns = mobile ? 5 : 14;
    const rows = mobile ? 8 : 7;
    const gapX = mobile ? 0.88 : 1.28;
    const gapY = mobile ? 1.05 : 1.22;
    const colors = ["#16303A", "#132830", "#1A2033", "#10232A", "#20243A"];
    const blocks: Block[] = [];
    const projectPortals = new Map<string, number>([
        ["3:8", 0],
        ["1:7", 1],
        ["2:9", 2],
        ["4:7", 3],
        ["5:8", 4],
    ]);

    for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
            const edgeDistance = Math.abs(column - (columns - 1) / 2) / columns;
            blocks.push({
                x: (column - (columns - 1) / 2) * gapX + (random() - 0.5) * 0.08,
                y: (row - (rows - 1) / 2) * gapY + (random() - 0.5) * 0.08,
                z: -2.65 + random() * 1.65 - edgeDistance * 0.35,
                sx: gapX * (0.78 + random() * 0.16),
                sy: gapY * (0.76 + random() * 0.18),
                sz: 0.28 + random() * 1.15,
                phase: random() * Math.PI * 2,
                speed: 0.42 + random() * 0.42,
                drift: 0.055 + random() * 0.075,
                color: new THREE.Color(colors[Math.floor(random() * colors.length)]),
                projectIndex: mobile ? null : (projectPortals.get(`${row}:${column}`) ?? null),
            });
        }
    }

    return blocks;
}

function DemandTicker({ active, fps }: { active: boolean; fps: number }) {
    const invalidate = useThree((state) => state.invalidate);

    useEffect(() => {
        invalidate();
        if (!active) return;

        let cancelled = false;
        let timer = 0;
        let animationFrame = 0;

        const tick = () => {
            if (cancelled) return;
            invalidate();
            timer = window.setTimeout(() => {
                animationFrame = window.requestAnimationFrame(tick);
            }, 1000 / fps);
        };

        tick();
        return () => {
            cancelled = true;
            window.clearTimeout(timer);
            window.cancelAnimationFrame(animationFrame);
        };
    }, [active, fps, invalidate]);

    return null;
}

function BlockWall({
    active,
    mobile,
    pointerRef,
    selectedProject,
    onProjectSelect,
}: {
    active: boolean;
    mobile: boolean;
    pointerRef: RefObject<THREE.Vector2>;
    selectedProject: number | null;
    onProjectSelect?: (projectIndex: number) => void;
}) {
    const solidRef = useRef<THREE.InstancedMesh | null>(null);
    const groupRef = useRef<THREE.Group | null>(null);
    const cursorLightRef = useRef<THREE.PointLight | null>(null);
    const featuredLightRef = useRef<THREE.PointLight | null>(null);
    const [hoveredProject, setHoveredProject] = useState<number | null>(null);
    const hoveredProjectRef = useRef<number | null>(null);
    const blocks = useMemo(() => createBlocks(mobile), [mobile]);
    const portalBlocks = useMemo(
        () => blocks.filter((block) => block.projectIndex !== null),
        [blocks]
    );
    const lifts = useMemo(() => new Float32Array(blocks.length), [blocks]);
    const animatedColors = useMemo(
        () => blocks.map((block) => block.color.clone()),
        [blocks]
    );
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const smoothedPointer = useRef(new THREE.Vector2(0.45, 0.08));
    const portalColor = useMemo(() => new THREE.Color("#246978"), []);
    const portalFeaturedColor = useMemo(() => new THREE.Color("#8A3C2A"), []);
    const portalFeaturedHoverColor = useMemo(() => new THREE.Color("#FF6A3D"), []);
    const portalFeaturedSelectedColor = useMemo(() => new THREE.Color("#FFE0B5"), []);
    const portalHoverColor = useMemo(() => new THREE.Color("#42C5D7"), []);
    const portalSelectedColor = useMemo(() => new THREE.Color("#A4F7FF"), []);
    const featuredAnimatedColor = useMemo(() => new THREE.Color("#A4F7FF"), []);

    useEffect(() => {
        const solid = solidRef.current;
        if (!solid) return;

        solid.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        blocks.forEach((block, index) => {
            const initialColor =
                block.projectIndex === null
                    ? block.color
                    : block.projectIndex === 0
                      ? portalFeaturedColor
                      : portalColor;
            animatedColors[index].copy(initialColor);
            solid.setColorAt(index, initialColor);
        });
        if (solid.instanceColor) solid.instanceColor.needsUpdate = true;
    }, [animatedColors, blocks, portalColor, portalFeaturedColor]);

    useFrame((state, delta) => {
        const solid = solidRef.current;
        if (!solid) return;

        const targetPointer = active ? pointerRef.current : new THREE.Vector2(0.45, 0.08);
        smoothedPointer.current.lerp(targetPointer, active ? 0.09 : 0.035);

        const pointerX = smoothedPointer.current.x * (mobile ? 2.25 : 5.7);
        const pointerY = smoothedPointer.current.y * (mobile ? 3.7 : 3.65);
        const elapsed = state.clock.elapsedTime;
        const featuredPulse = active ? (Math.sin(elapsed * 1.1) + 1) * 0.5 : 0.35;
        featuredAnimatedColor.lerpColors(
            portalFeaturedColor,
            portalFeaturedHoverColor,
            0.12 + featuredPulse * 0.18
        );

        blocks.forEach((block, index) => {
            const dx = block.x - pointerX;
            const dy = block.y - pointerY;
            const influence = Math.exp(-(dx * dx + dy * dy) * (mobile ? 0.7 : 0.46));
            const float = active ? Math.sin(elapsed * block.speed + block.phase) * block.drift : 0;
            const push = influence * (mobile ? 0.72 : 1.12);
            const isSelected = block.projectIndex !== null && block.projectIndex === selectedProject;
            const isHovered = block.projectIndex !== null && block.projectIndex === hoveredProject;
            const isFeatured = block.projectIndex === 0;
            const targetLift = isSelected
                ? 1.08 + (isFeatured ? featuredPulse * 0.12 : 0)
                : isHovered
                  ? isFeatured
                      ? 0.5 + featuredPulse * 0.08
                      : 0.42
                  : isFeatured
                    ? 0.14 + featuredPulse * 0.08
                    : 0;
            lifts[index] = THREE.MathUtils.damp(
                lifts[index],
                targetLift,
                isSelected ? 8 : 6,
                Math.min(delta, 1 / 20)
            );

            const featuredJitterX =
                isFeatured && active
                    ? Math.sin(elapsed * 0.82 + block.phase) * 0.035 +
                      Math.sin(elapsed * 1.65) * 0.01
                    : 0;
            const featuredJitterY =
                isFeatured && active
                    ? Math.sin(elapsed * 0.68 + 0.8) * 0.045 +
                      Math.sin(elapsed * 1.3 + block.phase) * 0.012
                    : 0;
            const featuredJitterZ =
                isFeatured && active ? Math.sin(elapsed * 0.94 + 1.7) * 0.04 : 0;

            dummy.position.set(
                block.x + float * 0.18 + featuredJitterX,
                block.y + float * 0.26 + featuredJitterY,
                block.z + float + push + lifts[index] + featuredJitterZ
            );
            dummy.rotation.set(
                -dy * influence * 0.018 +
                    (isFeatured && active ? Math.sin(elapsed * 0.76) * 0.018 : 0),
                dx * influence * 0.022 +
                    (isFeatured && active ? Math.sin(elapsed * 0.62 + 0.6) * 0.022 : 0),
                isFeatured && active ? Math.sin(elapsed * 0.88) * 0.012 : 0
            );
            dummy.scale.set(block.sx, block.sy, block.sz + influence * 0.16);
            if (isFeatured) dummy.scale.multiplyScalar(1.08 + featuredPulse * 0.03);
            if (isSelected) dummy.scale.multiplyScalar(1.055);
            else if (isHovered) dummy.scale.multiplyScalar(1.025);
            dummy.updateMatrix();
            solid.setMatrixAt(index, dummy.matrix);

            if (block.projectIndex !== null) {
                const targetColor = isFeatured
                    ? isSelected
                        ? portalFeaturedSelectedColor
                        : isHovered
                          ? portalFeaturedHoverColor
                          : featuredAnimatedColor
                    : isSelected
                      ? portalSelectedColor
                    : isHovered
                      ? portalHoverColor
                      : portalColor;
                animatedColors[index].lerp(
                    targetColor,
                    1 - Math.exp(-Math.min(delta, 1 / 20) * (isSelected ? 10 : 7))
                );
                solid.setColorAt(index, animatedColors[index]);
            }
        });

        solid.instanceMatrix.needsUpdate = true;
        if (solid.instanceColor) solid.instanceColor.needsUpdate = true;

        if (groupRef.current) {
            groupRef.current.rotation.x = THREE.MathUtils.damp(
                groupRef.current.rotation.x,
                -smoothedPointer.current.y * 0.018,
                5,
                1 / 30
            );
            groupRef.current.rotation.y = THREE.MathUtils.damp(
                groupRef.current.rotation.y,
                smoothedPointer.current.x * 0.025,
                5,
                1 / 30
            );
        }

        if (cursorLightRef.current) {
            cursorLightRef.current.position.set(pointerX, pointerY, 3.4);
            cursorLightRef.current.intensity = active ? 22 : 12;
        }

        if (featuredLightRef.current) {
            featuredLightRef.current.intensity =
                (selectedProject === 0 ? 28 : hoveredProject === 0 ? 23 : 14) +
                featuredPulse * 4;
        }
    });

    const handlePortalOver = (projectIndex: number) => {
        if (hoveredProjectRef.current === projectIndex) return;
        hoveredProjectRef.current = projectIndex;
        setHoveredProject(projectIndex);
    };

    const handlePortalOut = () => {
        if (hoveredProjectRef.current === null) return;
        hoveredProjectRef.current = null;
        setHoveredProject(null);
    };

    return (
        <>
            <ambientLight intensity={0.34} color="#86AAB4" />
            <directionalLight position={[-3, 5, 6]} intensity={0.78} color="#DDFBFF" />
            <pointLight
                ref={cursorLightRef}
                position={[2.5, 0.5, 3.4]}
                intensity={18}
                distance={8.5}
                decay={2}
                color="#34E5FF"
            />
            <pointLight
                ref={featuredLightRef}
                position={[1.9, 0, 2.2]}
                intensity={18}
                distance={7}
                decay={2}
                color="#FF6A3D"
            />
            <group ref={groupRef}>
                <instancedMesh
                    ref={solidRef}
                    args={[undefined, undefined, blocks.length]}
                    frustumCulled={false}
                >
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial
                        color="#C4D5D9"
                        roughness={0.52}
                        metalness={0.3}
                        emissive="#06151A"
                        emissiveIntensity={0.16}
                    />
                </instancedMesh>

                {!mobile &&
                    portalBlocks.map((block) => (
                        <Html
                            key={`portal-hit-${block.projectIndex}`}
                            position={[block.x, block.y, block.z + block.sz * 0.52]}
                            center
                            zIndexRange={[3, 3]}
                        >
                            <button
                                type="button"
                                aria-label={
                                    block.projectIndex === 0
                                        ? "Open featured Nuo project from cube"
                                        : `Open project ${block.projectIndex! + 1} from cube`
                                }
                                onPointerEnter={() => handlePortalOver(block.projectIndex!)}
                                onPointerLeave={handlePortalOut}
                                onClick={() => onProjectSelect?.(block.projectIndex!)}
                                className={`cursor-pointer bg-transparent focus-visible:outline-none focus-visible:ring-2 ${
                                    block.projectIndex === 0
                                        ? "h-36 w-36 focus-visible:ring-[#FF8A5B]"
                                        : "h-24 w-24 focus-visible:ring-[#7AF0FF]"
                                }`}
                            />
                        </Html>
                    ))}
            </group>
        </>
    );
}

function StaticFallback() {
    return (
        <div className="absolute inset-0 bg-[#070B0E]" aria-hidden="true">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(52,229,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(52,229,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(52,229,255,0.13),rgba(155,123,255,0.06)_27%,transparent_62%)]" />
        </div>
    );
}

export default function FloatingBlockField({
    reducedMotion,
    selectedProject = null,
    onProjectSelect,
}: FloatingBlockFieldProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const pointerRef = useRef(new THREE.Vector2(0.45, 0.08));
    const [webGLAvailable, setWebGLAvailable] = useState<boolean | null>(null);
    const [inView, setInView] = useState(true);
    const [pageVisible, setPageVisible] = useState(true);
    const [mobile, setMobile] = useState(false);

    useEffect(() => {
        const canvas = document.createElement("canvas");
        const supported = !!(
            window.WebGLRenderingContext &&
            (canvas.getContext("webgl", { powerPreference: "low-power" }) ||
                canvas.getContext("experimental-webgl"))
        );
        const media = window.matchMedia("(max-width: 1023px)");
        const updateMobile = () => setMobile(media.matches);
        const initialFrame = window.requestAnimationFrame(() => {
            setWebGLAvailable(supported);
            updateMobile();
        });
        media.addEventListener("change", updateMobile);
        return () => {
            window.cancelAnimationFrame(initialFrame);
            media.removeEventListener("change", updateMobile);
        };
    }, []);

    useEffect(() => {
        const element = containerRef.current;
        if (!element) return;
        const observer = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { threshold: 0.02 }
        );
        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const updateVisibility = () => setPageVisible(!document.hidden);
        updateVisibility();
        document.addEventListener("visibilitychange", updateVisibility);
        return () => document.removeEventListener("visibilitychange", updateVisibility);
    }, []);

    useEffect(() => {
        const updatePointer = (event: PointerEvent) => {
            const element = containerRef.current;
            if (!element || event.pointerType !== "mouse") return;
            const rect = element.getBoundingClientRect();
            if (
                event.clientX < rect.left ||
                event.clientX > rect.right ||
                event.clientY < rect.top ||
                event.clientY > rect.bottom
            ) {
                return;
            }
            pointerRef.current.set(
                ((event.clientX - rect.left) / rect.width) * 2 - 1,
                -(((event.clientY - rect.top) / rect.height) * 2 - 1)
            );
        };

        window.addEventListener("pointermove", updatePointer, { passive: true });
        return () => window.removeEventListener("pointermove", updatePointer);
    }, []);

    const active = inView && pageVisible && !reducedMotion;
    // Keep the WebGL context mounted while off-screen. Only the demand ticker pauses;
    // remounting the canvas caused an empty/white frame and rebuilt every cube on return.
    const shouldMountCanvas = webGLAvailable === true;

    return (
        <div ref={containerRef} className="absolute inset-0">
            {!shouldMountCanvas ? (
                <StaticFallback />
            ) : (
                <Canvas
                    frameloop="demand"
                    dpr={mobile ? [1, 1.1] : [1, 1.35]}
                    camera={{ position: [0, 0, 8], fov: mobile ? 49 : 46, near: 0.1, far: 30 }}
                    gl={{
                        antialias: false,
                        alpha: false,
                        depth: true,
                        stencil: false,
                        powerPreference: "low-power",
                    }}
                    onCreated={({ gl }) => {
                        gl.setClearColor(new THREE.Color("#070B0E"), 1);
                        gl.outputColorSpace = THREE.SRGBColorSpace;
                    }}
                >
                    <DemandTicker active={active} fps={mobile ? 20 : 30} />
                    <BlockWall
                        active={active}
                        mobile={mobile}
                        pointerRef={pointerRef}
                        selectedProject={selectedProject}
                        onProjectSelect={onProjectSelect}
                    />
                </Canvas>
            )}
        </div>
    );
}
