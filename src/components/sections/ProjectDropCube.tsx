"use client";

import { MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import * as THREE from "three";
import { projects, type Project } from "./Projects";

const CUBE_SIZE = 1.04;
const HALF = CUBE_SIZE / 2;
const START_SCALE = 0.1; // emerges tiny

// Fallback timeline thresholds (overwritten at runtime from the measured
// section + viewport height so the motion stays correct at any size):
//   0 .. DROP_END        emerge from the hero card
//   DROP_END .. CYCLE_END cycle the project faces (section pinned)
//   CYCLE_END .. 1        stay visible and ride up out with the section
const DEFAULT_DROP_END = 0.24;
const DEFAULT_CYCLE_END = 0.76;

// Section scroll length scales with the number of projects so each gets room.
function sectionVhForCount(n: number) {
    return 100 + Math.max(1, n - 1) * 70;
}

type CardAnchor = { xFrac: number; yFrac: number };
type PhaseKey = { rp: number; phase: number };

// Cube faces, in order: front(+z), right(+x), back(-z), left(-x), top, bottom.
const LABEL_FACES = [
    { position: [0, 0, HALF + 0.012], rotation: [0, 0, 0] },
    { position: [HALF + 0.012, 0, 0], rotation: [0, Math.PI / 2, 0] },
    { position: [0, 0, -HALF - 0.012], rotation: [0, Math.PI, 0] },
    { position: [-HALF - 0.012, 0, 0], rotation: [0, -Math.PI / 2, 0] },
    { position: [0, HALF + 0.012, 0], rotation: [-Math.PI / 2, 0, 0] },
    { position: [0, -HALF - 0.012, 0], rotation: [Math.PI / 2, 0, 0] },
] as const;
const FACE_COUNT = 6;

const FACE_NORMALS = [
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(0, 0, -1),
    new THREE.Vector3(-1, 0, 0),
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(0, -1, 0),
] as const;

const AXIS_X = new THREE.Vector3(1, 0, 0);
const AXIS_Y = new THREE.Vector3(0, 1, 0);
const WORLD_UP = new THREE.Vector3(0, 1, 0);

// Each project->next transition turns the cube 90deg about a *varied* axis, so
// it tumbles (turn right, flip down, turn left, flip up, ...) instead of only
// spinning one way. The face textures are kept upright every frame (see the
// useFrame loop) so the cube can tumble while images/text stay readable.
const TURN_SEQUENCE: Array<{ axis: THREE.Vector3; angle: number }> = [
    { axis: AXIS_Y, angle: -Math.PI / 2 }, // turn left -> right
    { axis: AXIS_X, angle: -Math.PI / 2 }, // flip top over (upside down)
    { axis: AXIS_Y, angle: Math.PI / 2 }, // turn right -> left
    { axis: AXIS_X, angle: Math.PI / 2 }, // flip up
];

function easeOutCubic(v: number) {
    return 1 - Math.pow(1 - v, 3);
}

function easeInOutCubic(v: number) {
    return v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2;
}

// Continuous "phase" (0..n-1) vs scroll, with a dwell on each project.
function buildPhaseKeys(n: number): PhaseKey[] {
    if (n <= 1) return [{ rp: 0, phase: 0 }, { rp: 1, phase: 0 }];
    const holdW = 1;
    const turnW = 1.4;
    const total = n * holdW + (n - 1) * turnW;
    const keys: PhaseKey[] = [];
    let acc = 0;
    for (let i = 0; i < n; i++) {
        keys.push({ rp: acc / total, phase: i });
        acc += holdW;
        keys.push({ rp: acc / total, phase: i });
        acc += turnW;
    }
    keys[0].rp = 0;
    keys[keys.length - 1].rp = 1;
    return keys;
}

function phaseFromKeys(keys: PhaseKey[], rp: number) {
    if (rp <= keys[0].rp) return keys[0].phase;
    const last = keys[keys.length - 1];
    if (rp >= last.rp) return last.phase;
    for (let i = 1; i < keys.length; i++) {
        const a = keys[i - 1];
        const b = keys[i];
        if (rp <= b.rp) {
            const span = b.rp - a.rp || 1;
            const local = easeInOutCubic((rp - a.rp) / span);
            return THREE.MathUtils.lerp(a.phase, b.phase, local);
        }
    }
    return last.phase;
}

// Resting orientation for each project (compose the varied 90deg turns).
function buildOrientations(n: number): THREE.Quaternion[] {
    const list = [new THREE.Quaternion()];
    for (let i = 1; i < n; i++) {
        const turn = TURN_SEQUENCE[(i - 1) % TURN_SEQUENCE.length];
        const r = new THREE.Quaternion().setFromAxisAngle(turn.axis, turn.angle);
        list.push(r.clone().multiply(list[i - 1]));
    }
    return list;
}

function frontFaceOf(q: THREE.Quaternion) {
    const v = new THREE.Vector3();
    let best = 0;
    let bestZ = -Infinity;
    for (let f = 0; f < FACE_COUNT; f++) {
        const z = v.copy(FACE_NORMALS[f]).applyQuaternion(q).z;
        if (z > bestZ) {
            bestZ = z;
            best = f;
        }
    }
    return best;
}

// Project shown on a face: faces that rest square to the camera serve the
// nearest project from their schedule; other faces hold a stable project so the
// cube always looks "full" and never swaps a texture in view.
function projectForFace(schedule: number[][], faceIndex: number, phase: number, n: number) {
    const list = schedule[faceIndex];
    if (list && list.length) {
        let best = list[0];
        let bestDist = Math.abs(phase - list[0]);
        for (let j = 1; j < list.length; j++) {
            const d = Math.abs(phase - list[j]);
            if (d < bestDist) {
                bestDist = d;
                best = list[j];
            }
        }
        return best;
    }
    return n > 0 ? faceIndex % n : -1;
}

function activeIndexFromState(progress: number, keys: PhaseKey[], dropEnd: number, cycleEnd: number, count: number) {
    if (progress < dropEnd) return 0;
    const rp = THREE.MathUtils.clamp((progress - dropEnd) / (cycleEnd - dropEnd), 0, 1);
    return THREE.MathUtils.clamp(Math.round(phaseFromKeys(keys, rp)), 0, count - 1);
}

type FaceSpec = { label: string; image?: string };

function drawLabelBar(ctx: CanvasRenderingContext2D, label: string, y: number) {
    ctx.save();
    ctx.fillStyle = "rgba(9, 15, 19, 0.92)";
    ctx.fillRect(56, y, 400, 66);
    ctx.fillStyle = "#34E5FF";
    ctx.shadowColor = "rgba(52, 229, 255, 0.9)";
    ctx.shadowBlur = 16;
    ctx.fillRect(56, y, 5, 66);
    ctx.fillRect(451, y, 5, 66);
    ctx.font = "700 30px JetBrains Mono, Consolas, monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, 256, y + 33, 360);
    ctx.restore();
}

function makeFaceTexture(face: FaceSpec) {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;

    const redraw = (img: HTMLImageElement | null) => {
        if (!ctx) return;
        ctx.clearRect(0, 0, 512, 512);
        if (img) {
            const targetAR = 1;
            const ar = img.width / img.height;
            let sw: number, sh: number, sx: number, sy: number;
            if (ar > targetAR) {
                sh = img.height;
                sw = img.height * targetAR;
                sx = (img.width - sw) / 2;
                sy = 0;
            } else {
                sw = img.width;
                sh = img.width / targetAR;
                sx = 0;
                sy = (img.height - sh) / 2;
            }
            ctx.drawImage(img, sx, sy, sw, sh, 0, 0, 512, 512);
            ctx.fillStyle = "rgba(10, 22, 28, 0.28)";
            ctx.fillRect(0, 0, 512, 512);
            const grad = ctx.createLinearGradient(0, 300, 0, 512);
            grad.addColorStop(0, "rgba(6, 15, 19, 0)");
            grad.addColorStop(1, "rgba(6, 15, 19, 0.9)");
            ctx.fillStyle = grad;
            ctx.fillRect(0, 280, 512, 232);
            drawLabelBar(ctx, face.label, 418);
        } else {
            drawLabelBar(ctx, face.label, 223);
        }
        texture.needsUpdate = true;
    };

    redraw(null);
    if (face.image && typeof window !== "undefined") {
        const img = new Image();
        img.onload = () => redraw(img);
        img.src = face.image;
    }
    return texture;
}

function useFaceTextures(faces: FaceSpec[]) {
    const textures = useMemo(() => {
        if (typeof document === "undefined") return [];
        return faces.map((face) => makeFaceTexture(face));
    }, [faces]);

    useEffect(() => {
        return () => textures.forEach((texture) => texture.dispose());
    }, [textures]);

    return textures;
}

function ProjectCubeScene({
    featuredProjects,
    progressRef,
    cardAnchorRef,
    dropEndRef,
    cycleEndRef,
    phaseKeys,
    reducedMotion,
}: {
    featuredProjects: Project[];
    progressRef: MutableRefObject<number>;
    cardAnchorRef: MutableRefObject<CardAnchor>;
    dropEndRef: MutableRefObject<number>;
    cycleEndRef: MutableRefObject<number>;
    phaseKeys: PhaseKey[];
    reducedMotion: boolean;
}) {
    const cubeRef = useRef<THREE.Group>(null);
    const bodyMaterial = useRef<THREE.MeshStandardMaterial>(null);
    const labelMaterials = useRef<Array<THREE.MeshBasicMaterial | null>>([]);
    const faceMeshes = useRef<Array<THREE.Mesh | null>>([]);
    const edgeMaterial = useRef<THREE.LineBasicMaterial>(null);
    const qTmp = useRef(new THREE.Quaternion());
    const qSpin = useRef(new THREE.Quaternion());
    // Reusable temporaries for the per-frame "keep upright" math.
    const tmp = useRef({
        nW: new THREE.Vector3(),
        tUp: new THREE.Vector3(),
        xA: new THREE.Vector3(),
        mat: new THREE.Matrix4(),
        wq: new THREE.Quaternion(),
        cubeInv: new THREE.Quaternion(),
    }).current;
    const { viewport, clock } = useThree();

    const projectCount = featuredProjects.length;

    const projectFaces = useMemo<FaceSpec[]>(
        () =>
            featuredProjects.map((p, i) => ({
                label: (p?.title ?? `PROJECT_${i + 1}`).toUpperCase().replace(/\s+/g, "_"),
                image: p?.image,
            })),
        [featuredProjects],
    );
    const projectTextures = useFaceTextures(projectFaces);

    // Resting orientations + which face is square to the camera for each project.
    const orientations = useMemo(() => buildOrientations(projectCount), [projectCount]);
    const faceSchedule = useMemo(() => {
        const schedule: number[][] = Array.from({ length: FACE_COUNT }, () => []);
        orientations.forEach((q, i) => schedule[frontFaceOf(q)].push(i));
        return schedule;
    }, [orientations]);

    const edgeGeometry = useMemo(() => {
        const box = new THREE.BoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);
        const edges = new THREE.EdgesGeometry(box);
        box.dispose();
        return edges;
    }, []);

    useEffect(() => () => edgeGeometry.dispose(), [edgeGeometry]);

    useFrame(() => {
        const cube = cubeRef.current;
        if (!cube || orientations.length === 0) return;

        const progress = progressRef.current;
        const t = clock.getElapsedTime();
        const dropEnd = dropEndRef.current;
        const cycleEnd = cycleEndRef.current;

        const isWide = viewport.width / viewport.height > 1.05;
        const finalX = isWide ? viewport.width * 0.24 : 0;
        const finalY = isWide ? 0 : -0.35;

        const anchor = cardAnchorRef.current;
        const startX = (anchor.xFrac - 0.5) * viewport.width;
        const startY = (0.5 - anchor.yFrac) * viewport.height;

        const dropProgress = THREE.MathUtils.clamp(progress / dropEnd, 0, 1);
        const rotateProgress = THREE.MathUtils.clamp((progress - dropEnd) / (cycleEnd - dropEnd), 0, 1);
        const exitProgress = THREE.MathUtils.clamp((progress - cycleEnd) / (1 - cycleEnd), 0, 1);

        const opacity = reducedMotion ? 1 : easeOutCubic(THREE.MathUtils.clamp(dropProgress / 0.35, 0, 1));

        // Position + scale (emerge tiny from the card, ride up out at the end).
        const posT = reducedMotion ? 1 : easeInOutCubic(dropProgress);
        const translateX = THREE.MathUtils.lerp(startX, finalX, posT);
        const baseY = THREE.MathUtils.lerp(startY, finalY, posT);
        const exitLift = exitProgress * (viewport.height + CUBE_SIZE);
        const bob = reducedMotion ? 0 : Math.sin(t * 0.7) * 0.035 * rotateProgress * (1 - exitProgress);
        cube.position.set(translateX, baseY + exitLift + bob, 0);
        cube.scale.setScalar(reducedMotion ? 1 : THREE.MathUtils.lerp(START_SCALE, 1, posT));

        // Orientation: slerp between the two nearest resting orientations.
        const phase = phaseFromKeys(phaseKeys, rotateProgress);
        const i0 = THREE.MathUtils.clamp(Math.floor(phase), 0, projectCount - 1);
        const i1 = Math.min(i0 + 1, projectCount - 1);
        const frac = easeInOutCubic(phase - i0);
        const q = qTmp.current.copy(orientations[i0]).slerp(orientations[i1], frac);

        if (!reducedMotion) {
            // Emerge yaw that fades, plus a slight tilt and idle wobble for life.
            qSpin.current.setFromAxisAngle(AXIS_Y, THREE.MathUtils.degToRad(-40) * (1 - posT));
            q.premultiply(qSpin.current);
            const idleYaw = Math.sin(t * 0.4) * 0.012 * rotateProgress * (1 - exitProgress);
            qSpin.current.setFromAxisAngle(AXIS_Y, idleYaw);
            q.premultiply(qSpin.current);
            const tilt = THREE.MathUtils.degToRad(-12) * posT + Math.sin(t * 0.5) * 0.025 * rotateProgress * (1 - exitProgress);
            qSpin.current.setFromAxisAngle(AXIS_X, tilt);
            q.premultiply(qSpin.current);
        }
        cube.quaternion.copy(q);

        if (bodyMaterial.current) bodyMaterial.current.opacity = 0.4 * opacity;
        if (edgeMaterial.current) edgeMaterial.current.opacity = 0.85 * opacity;

        // Per-face: keep the picture upright (roll about the rotated normal so the
        // texture's up points to screen-up), pick its project, fade by facing.
        cube.updateMatrixWorld();
        tmp.cubeInv.copy(cube.quaternion).invert();
        labelMaterials.current.forEach((material, index) => {
            const mesh = faceMeshes.current[index];
            if (!material || !mesh) return;

            const nW = tmp.nW.copy(FACE_NORMALS[index]).applyQuaternion(cube.quaternion).normalize();
            const tUp = tmp.tUp.copy(WORLD_UP).addScaledVector(nW, -WORLD_UP.dot(nW));
            if (tUp.lengthSq() < 1e-5) {
                // Face normal is near-vertical: fall back to a stable up.
                tUp.set(0, 0, 1).addScaledVector(nW, -nW.z);
                if (tUp.lengthSq() < 1e-5) tUp.set(1, 0, 0);
            }
            tUp.normalize();
            const xA = tmp.xA.crossVectors(tUp, nW).normalize();
            tmp.mat.makeBasis(xA, tUp, nW);
            tmp.wq.setFromRotationMatrix(tmp.mat);
            // Local orientation (relative to the cube) that yields the world one.
            mesh.quaternion.copy(tmp.cubeInv).multiply(tmp.wq);

            const facing = THREE.MathUtils.smoothstep(nW.z, 0.3, 0.8);
            const k = projectForFace(faceSchedule, index, phase, projectCount);
            if (k >= 0 && k < projectCount) {
                const tex = projectTextures[k];
                if (tex && material.map !== tex) {
                    material.map = tex;
                    material.needsUpdate = true;
                }
                material.opacity = opacity * facing;
            } else {
                material.opacity = 0;
            }
        });
    });

    return (
        <>
            <ambientLight intensity={0.8} />
            <directionalLight position={[3, 4, 5]} intensity={1.1} />
            <pointLight position={[-3, 2, 3]} intensity={1.8} color="#34E5FF" />
            <group ref={cubeRef}>
                <mesh>
                    <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} />
                    <meshStandardMaterial
                        ref={bodyMaterial}
                        color="#0E1418"
                        emissive="#34E5FF"
                        emissiveIntensity={0.08}
                        roughness={0.3}
                        metalness={0.12}
                        transparent
                        opacity={0.4}
                        depthWrite
                    />
                </mesh>

                {LABEL_FACES.map((face, index) => {
                    const initialMap = projectTextures.length ? projectTextures[index % projectTextures.length] : undefined;
                    return (
                        <mesh
                            key={index}
                            ref={(mesh) => {
                                faceMeshes.current[index] = mesh;
                            }}
                            position={face.position}
                            rotation={face.rotation}
                        >
                            <planeGeometry args={[0.96, 0.96]} />
                            <meshBasicMaterial
                                ref={(material) => {
                                    labelMaterials.current[index] = material;
                                }}
                                map={initialMap}
                                transparent
                                opacity={0}
                                depthWrite={false}
                                toneMapped={false}
                            />
                        </mesh>
                    );
                })}

                <lineSegments geometry={edgeGeometry}>
                    <lineBasicMaterial ref={edgeMaterial} color="#34E5FF" transparent opacity={0.85} toneMapped={false} />
                </lineSegments>
            </group>
        </>
    );
}

export default function ProjectDropCube() {
    const sectionRef = useRef<HTMLElement>(null);
    const progressRef = useRef(0);
    const cardAnchorRef = useRef<CardAnchor>({ xFrac: 0.5, yFrac: 0.82 });
    const dropEndRef = useRef(DEFAULT_DROP_END);
    const cycleEndRef = useRef(DEFAULT_CYCLE_END);
    const prefersReducedMotion = useReducedMotion();

    // Drive everything off the project list — add a project and the cube,
    // its phases, the progress dots and the section length all follow.
    const featuredProjects = useMemo(() => projects, []);
    const projectCount = featuredProjects.length;
    const phaseKeys = useMemo(() => buildPhaseKeys(projectCount), [projectCount]);
    const sectionVh = useMemo(() => sectionVhForCount(projectCount), [projectCount]);

    const [activeIndex, setActiveIndex] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    // Measure the hero card bottom (emerge point) and derive the timeline
    // thresholds from the actual section + viewport height.
    useEffect(() => {
        const measure = () => {
            const vh = window.innerHeight || 1;
            const vw = window.innerWidth || 1;

            const card = document.getElementById("hero-card");
            if (card) {
                const r = card.getBoundingClientRect();
                const pageBottom = r.bottom + window.scrollY;
                cardAnchorRef.current = {
                    xFrac: (r.left + r.width / 2) / vw,
                    yFrac: pageBottom / vh,
                };
            }

            const section = sectionRef.current;
            if (section) {
                const sectionH = section.offsetHeight || vh;
                const span = sectionH + vh;
                dropEndRef.current = vh / span;
                cycleEndRef.current = sectionH / span;
            }
        };
        const raf = requestAnimationFrame(measure);
        window.addEventListener("resize", measure);
        window.addEventListener("load", measure);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", measure);
            window.removeEventListener("load", measure);
        };
    }, [sectionVh]);

    // Page-top -> section fully leaving the top (so the cube can ride out).
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const infoOpacity = useTransform(scrollYProgress, (v) =>
        THREE.MathUtils.smoothstep(v, dropEndRef.current + 0.02, dropEndRef.current + 0.07),
    );
    const infoY = useTransform(scrollYProgress, (v) =>
        THREE.MathUtils.lerp(18, 0, THREE.MathUtils.smoothstep(v, dropEndRef.current + 0.02, dropEndRef.current + 0.07)),
    );

    useEffect(() => {
        const frame = requestAnimationFrame(() => {
            const latest = scrollYProgress.get();
            progressRef.current = latest;
            setActiveIndex(activeIndexFromState(latest, phaseKeys, dropEndRef.current, cycleEndRef.current, projectCount));
        });
        return () => cancelAnimationFrame(frame);
    }, [projectCount, phaseKeys, scrollYProgress]);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        progressRef.current = latest;
        setActiveIndex(activeIndexFromState(latest, phaseKeys, dropEndRef.current, cycleEndRef.current, projectCount));
    });

    const activeProject = featuredProjects[activeIndex];
    const ActiveIcon = activeProject.icon;

    return (
        <>
            {mounted &&
                createPortal(
                    <div className="pointer-events-none fixed inset-0 z-[5]" aria-hidden="true">
                        <Canvas camera={{ position: [0, 0, 7.1], fov: 35 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
                            <ProjectCubeScene
                                featuredProjects={featuredProjects}
                                progressRef={progressRef}
                                cardAnchorRef={cardAnchorRef}
                                dropEndRef={dropEndRef}
                                cycleEndRef={cycleEndRef}
                                phaseKeys={phaseKeys}
                                reducedMotion={!!prefersReducedMotion}
                            />
                        </Canvas>
                    </div>,
                    document.body,
                )}

            <section
                id="projects"
                ref={sectionRef}
                className="relative w-full bg-transparent"
                style={{ minHeight: `${sectionVh}vh` }}
                aria-label="Project reel"
            >
                <div className="sticky top-0 flex min-h-screen items-center overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
                    <div className="relative z-[4] mx-auto grid w-full max-w-6xl items-center gap-9 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
                        <motion.div
                            style={{
                                opacity: prefersReducedMotion ? 1 : infoOpacity,
                                y: prefersReducedMotion ? 0 : infoY,
                            }}
                            className="order-2 lg:order-1"
                        >
                            <div className="mb-4 flex items-center gap-3">
                                <span className="h-px w-10 bg-[#34E5FF]" />
                                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#34E5FF]">
                                    Selected Work
                                </span>
                            </div>

                            <h2 className="max-w-xl text-4xl font-black leading-[1.02] tracking-tight text-white sm:text-5xl">
                                Projects that already shipped.
                            </h2>

                            <p className="mt-5 max-w-xl text-sm leading-7 text-[#8AA3AD] sm:text-base">
                                Real builds with live screens, contractor flows, mobile UX,
                                and practical AI where it earns its place.
                            </p>

                            <motion.div
                                key={activeProject.title}
                                initial={prefersReducedMotion ? false : { opacity: 0, x: 28, filter: "blur(8px)" }}
                                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="relative mt-8 overflow-hidden border border-[#34E5FF]/35 bg-[#061116]/75 p-5 shadow-[0_0_46px_rgba(52,229,255,0.1),inset_0_0_35px_rgba(52,229,255,0.04)] backdrop-blur-md before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(90deg,rgba(52,229,255,0.12),transparent_18%,transparent_78%,rgba(52,229,255,0.08)),repeating-linear-gradient(0deg,rgba(255,255,255,0.035)_0px,rgba(255,255,255,0.035)_1px,transparent_1px,transparent_7px)]"
                            >
                                <div className="mb-3 flex items-center justify-between gap-4">
                                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#34E5FF]">
                                        {activeProject.eyebrow}
                                    </span>
                                    <ActiveIcon className="h-5 w-5 text-[#CBD2D9]" />
                                </div>

                                <h3 className="text-2xl font-bold text-white">
                                    {activeProject.title}
                                </h3>
                                <p className="mt-3 text-sm leading-7 text-gray-400">
                                    {activeProject.description}
                                </p>

                                <div className="mt-5 flex flex-wrap gap-2">
                                    {activeProject.tags.slice(0, 4).map((tag) => (
                                        <span
                                            key={tag}
                                            className="border border-[#1C2A30] bg-white/[0.02] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#CBD2D9]"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <a
                                    href={activeProject.links.demo}
                                    target={activeProject.external ? "_blank" : undefined}
                                    rel={activeProject.external ? "noopener noreferrer" : undefined}
                                    className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#34E5FF] transition-colors hover:text-[#7AF0FF]"
                                >
                                    Open project
                                    <ArrowUpRight className="h-4 w-4" />
                                </a>
                            </motion.div>

                            <div
                                className="mt-5 grid gap-2"
                                style={{ gridTemplateColumns: `repeat(${projectCount}, minmax(0, 1fr))` }}
                                aria-hidden="true"
                            >
                                {featuredProjects.map((project, index) => (
                                    <div
                                        key={project.title}
                                        className={`h-1.5 transition-colors ${
                                            index <= activeIndex ? "bg-[#34E5FF]" : "bg-white/10"
                                        }`}
                                    />
                                ))}
                            </div>
                        </motion.div>

                        <div className="order-1 hidden min-h-[18rem] lg:order-2 lg:block lg:min-h-[25rem]" aria-hidden="true" />
                    </div>
                </div>
            </section>
        </>
    );
}
