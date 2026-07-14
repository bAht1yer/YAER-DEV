"use client";

import { RoundedBox } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const CYAN = "#34E5FF";
const VIOLET = "#9B7BFF";

/**
 * HeroCube -- holographic glass flagship.
 *
 * Look: translucent glass body, view-dependent Fresnel rim (cyan at grazing
 * angles bleeding into violet), a violet light core breathing inside, and a
 * soft cyan wireframe. Same bloodline as the background CodeCubes -- those
 * are the satellites, this is the mothership.
 *
 * Timeline (once per mount):
 *   A  0.0-1.0s  a flat 2D wireframe square fades in deep in the background,
 *                slowly tumbling like the ambient grid squares
 *   B  1.0-2.6s  it glides toward the camera while extruding into a full 3D
 *                cube: glass and core fade in, Fresnel glow ramps to peak,
 *                spin accelerates, scale grows with a slight overshoot
 *   C  2.6-3.15s x/z rotation settles flat mid-air, then the cube drops onto
 *                an invisible floor with a soft squash-and-rebound on impact
 *   D  after     seated idle: slow Y spin, breathing glow, pointer tilt,
 *                hover brightens
 *
 * Once seated, the cube earns its role: dim "visit" particles drift in from
 * the edges and are absorbed, while a thin stream of bright "lead" particles
 * exits toward the headline -- the cube literally runs the site's promise,
 * turning visits into leads.
 *
 * The floor renders nothing -- weight is conveyed purely by the landing.
 * Reduced motion skips straight to the seated end state (no particles).
 */

// --- timeline constants -----------------------------------------------------
const T_FORM = 1.0; // A -> B
const T_FALL = 2.6; // B -> C (fall starts)
const T_IMPACT = 3.15; // C -> D (touchdown)

const CUBE_SIZE = 2.42;
const HALF = CUBE_SIZE / 2;
const BASE_SCALE = 0.9;
const GROUND_Y = -1.55;
const SEAT_Y = GROUND_Y + HALF * BASE_SCALE;
const HOVER_Y = 0.5; // float height before the drop
const START_Y = 1.35; // background square position
const START_Z = -6.5;

const PEAK_SPIN = 2.4; // rad/s at the height of phase B
const IDLE_SPIN = 0.15; // rad/s once seated

// --- particle streams ---------------------------------------------------------
const N_IN = 90; // dim "visits" drifting toward the cube
const N_OUT = 14; // bright "leads" streaming out
const ABSORB_R = 1.45; // absorption radius around the seated cube
const FLOW_Y = -0.35; // stream focal point ~ seated cube center
const LEAD_LEN = 8; // travel distance before a lead fades out

/** Respawn a visit particle on a wide shell around the scene. */
function spawnVisit(positions: Float32Array, i: number) {
    const a = Math.random() * Math.PI * 2;
    const r = 6.5 + Math.random() * 3.5;
    positions[i * 3] = Math.cos(a) * r;
    positions[i * 3 + 1] = -1.6 + Math.random() * 4.8;
    positions[i * 3 + 2] = Math.sin(a) * r * 0.5 - 1.2;
}

interface ParticleSystems {
    inGeo: THREE.BufferGeometry;
    inPos: Float32Array;
    inCol: Float32Array;
    inSpeed: Float32Array;
    inPhase: Float32Array;
    outGeo: THREE.BufferGeometry;
    outPos: Float32Array;
    outCol: Float32Array;
    outDir: Float32Array;
    outDist: Float32Array;
    outSpeed: Float32Array;
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInQuad = (t: number) => t * t;
const easeInOut = (t: number) => t * t * (3 - 2 * t);

// --- Fresnel rim shader -------------------------------------------------------
// Additive shell: bright where the surface grazes the view direction, cyan at
// the rim core shifting violet as it wraps away. uIntensity is timeline-driven.
const FRESNEL_VERT = /* glsl */ `
    varying vec3 vNormal;
    varying vec3 vView;
    void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vView = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
    }
`;

const FRESNEL_FRAG = /* glsl */ `
    uniform vec3 uCyan;
    uniform vec3 uViolet;
    uniform float uIntensity;
    varying vec3 vNormal;
    varying vec3 vView;
    void main() {
        float f = pow(1.0 - abs(dot(normalize(vNormal), normalize(vView))), 2.2);
        vec3 col = mix(uCyan, uViolet, smoothstep(0.35, 1.0, f));
        gl_FragColor = vec4(col, f * uIntensity);
    }
`;

function SolidCubeScene({ reducedMotion }: { reducedMotion: boolean }) {
    const cubeRef = useRef<THREE.Group | null>(null);
    const bodyMat = useRef<THREE.MeshPhysicalMaterial | null>(null);
    const edgeMat = useRef<THREE.LineBasicMaterial | null>(null);
    const coreMat = useRef<THREE.MeshBasicMaterial | null>(null);
    const fresnelMat = useRef<THREE.ShaderMaterial | null>(null);
    const cyanLight = useRef<THREE.PointLight | null>(null);
    const hoverRef = useRef(false);
    const glowSmooth = useRef(0); // damped hover glow bump
    const startTime = useRef<number | null>(null);

    const edgeGeometry = useMemo(() => {
        const box = new THREE.BoxGeometry(CUBE_SIZE + 0.02, CUBE_SIZE + 0.02, CUBE_SIZE + 0.02);
        const edges = new THREE.EdgesGeometry(box);
        box.dispose();
        return edges;
    }, []);

    const fresnelUniforms = useMemo(
        () => ({
            uCyan: { value: new THREE.Color(CYAN) },
            uViolet: { value: new THREE.Color(VIOLET) },
            uIntensity: { value: 0 },
        }),
        []
    );

    const inMat = useRef<THREE.PointsMaterial | null>(null);
    const outMat = useRef<THREE.PointsMaterial | null>(null);
    const inPoints = useRef<THREE.Points | null>(null);
    const outPoints = useRef<THREE.Points | null>(null);
    const particles = useRef<ParticleSystems | null>(null);

    useEffect(() => () => edgeGeometry.dispose(), [edgeGeometry]);

    // Particle buffers are built in an effect (Math.random is impure during
    // render) and mutated only through this ref from useFrame.
    useEffect(() => {
        const inPos = new Float32Array(N_IN * 3);
        const inCol = new Float32Array(N_IN * 3);
        const inSpeed = new Float32Array(N_IN);
        const inPhase = new Float32Array(N_IN);
        for (let i = 0; i < N_IN; i++) {
            spawnVisit(inPos, i);
            inSpeed[i] = 1.1 + Math.random() * 1.1;
            inPhase[i] = Math.random() * Math.PI * 2;
        }
        const inGeo = new THREE.BufferGeometry();
        inGeo.setAttribute("position", new THREE.BufferAttribute(inPos, 3));
        inGeo.setAttribute("color", new THREE.BufferAttribute(inCol, 3));

        const outPos = new Float32Array(N_OUT * 3);
        const outCol = new Float32Array(N_OUT * 3);
        const outDir = new Float32Array(N_OUT * 3);
        const outDist = new Float32Array(N_OUT);
        const outSpeed = new Float32Array(N_OUT);
        for (let i = 0; i < N_OUT; i++) {
            // Leads leave toward the headline: left, slightly down, toward camera.
            const v = new THREE.Vector3(
                -0.85 + (Math.random() - 0.5) * 0.18,
                -0.1 + (Math.random() - 0.5) * 0.16,
                0.5 + (Math.random() - 0.5) * 0.2
            ).normalize();
            outDir[i * 3] = v.x;
            outDir[i * 3 + 1] = v.y;
            outDir[i * 3 + 2] = v.z;
            outDist[i] = (i / N_OUT) * LEAD_LEN; // staggered along the stream
            outSpeed[i] = 2.0 + Math.random() * 0.7;
        }
        const outGeo = new THREE.BufferGeometry();
        outGeo.setAttribute("position", new THREE.BufferAttribute(outPos, 3));
        outGeo.setAttribute("color", new THREE.BufferAttribute(outCol, 3));

        particles.current = { inGeo, inPos, inCol, inSpeed, inPhase, outGeo, outPos, outCol, outDir, outDist, outSpeed };
        if (inPoints.current) inPoints.current.geometry = inGeo;
        if (outPoints.current) outPoints.current.geometry = outGeo;

        return () => {
            particles.current = null;
            inGeo.dispose();
            outGeo.dispose();
        };
    }, []);

    useFrame((state, frameDelta) => {
        const cube = cubeRef.current;
        if (!cube) return;
        const d = Math.min(frameDelta, 0.045);

        if (startTime.current === null) startTime.current = state.clock.elapsedTime;
        const t = reducedMotion ? T_IMPACT + 10 : state.clock.elapsedTime - startTime.current;

        // Hover glow bump eases in/out.
        glowSmooth.current = THREE.MathUtils.damp(glowSmooth.current, hoverRef.current ? 1 : 0, 6, d);
        const hoverGlow = glowSmooth.current;

        // --- phase progress values ------------------------------------------
        const emerge = easeInOut(clamp01(t / T_FORM)); // A: fade in
        const form = easeOutCubic(clamp01((t - T_FORM) / (T_FALL - T_FORM))); // B: extrude + approach
        const fall = easeInQuad(clamp01((t - T_FALL) / (T_IMPACT - T_FALL))); // C: gravity drop
        const sinceImpact = Math.max(0, t - T_IMPACT);

        // --- scale: flat square -> overshooting cube -> settled --------------
        // Extrusion happens along Z; overall size grows with a slight overshoot.
        const flatZ = Math.max(0.002, form);
        const overshoot = 1 + 0.18 * Math.sin(Math.PI * form) * (1 - fall); // swells mid-B, gone by landing
        // Grows 0.5 -> 0.9 through formation; at form=1 overshoot=1 so this
        // meets BASE_SCALE exactly when the drop begins -- no correction needed.
        const scaleBase = t < T_IMPACT ? (0.5 + (BASE_SCALE - 0.5) * form) * overshoot : BASE_SCALE;

        // Impact squash: decaying cosine, ~10% flatten, xz compensates.
        const squashEnv = sinceImpact > 0 ? Math.exp(-6.5 * sinceImpact) * Math.cos(11 * sinceImpact) : 0;
        const squashY = 1 - 0.1 * Math.max(0, squashEnv);
        const squashXZ = 1 + 0.055 * Math.max(0, squashEnv);

        cube.scale.set(scaleBase * squashXZ, scaleBase * squashY, scaleBase * flatZ * squashXZ);

        // --- rotation ---------------------------------------------------------
        if (t < T_FALL) {
            // A: lazy background tumble. B: spin accelerates with formation.
            const spin = 0.25 + PEAK_SPIN * form;
            cube.rotation.y += spin * d;
            cube.rotation.x += (0.18 + 0.5 * form) * d;
            cube.rotation.z = THREE.MathUtils.damp(cube.rotation.z, 0.18 * (1 - form), 3, d);
        } else {
            // C/D: x and z level out fast so it lands flat; y decays to idle spin.
            const spinY = reducedMotion ? 0 : IDLE_SPIN + (PEAK_SPIN - IDLE_SPIN) * Math.exp(-3.2 * (t - T_FALL));
            cube.rotation.y += spinY * d;
            const tiltX = reducedMotion ? 0 : THREE.MathUtils.clamp(-state.pointer.y * 0.09, -0.1, 0.1);
            const tiltZ = reducedMotion ? 0 : THREE.MathUtils.clamp(state.pointer.x * 0.05, -0.06, 0.06);
            // Wrap x into [-PI, PI] once so damping takes the short way home.
            if (Math.abs(cube.rotation.x) > Math.PI) {
                cube.rotation.x = THREE.MathUtils.euclideanModulo(cube.rotation.x + Math.PI, Math.PI * 2) - Math.PI;
            }
            const level = sinceImpact > 0 ? 9 : 7;
            cube.rotation.x = THREE.MathUtils.damp(cube.rotation.x, tiltX, level, d);
            cube.rotation.z = THREE.MathUtils.damp(cube.rotation.z, tiltZ, level, d);
        }

        // --- position ---------------------------------------------------------
        if (t < T_FALL) {
            // Drift from the deep background up to the hover point.
            cube.position.z = START_Z * (1 - form);
            cube.position.y = START_Y + (HOVER_Y - START_Y) * form + Math.sin(t * 1.4) * 0.05 * (1 - form);
            cube.position.x = THREE.MathUtils.damp(cube.position.x, state.pointer.x * 0.1 * form, 4, d);
        } else if (t < T_IMPACT) {
            cube.position.z = 0;
            cube.position.y = HOVER_Y + (SEAT_Y - HOVER_Y) * fall;
        } else {
            // Seated: bottom face glued to the invisible floor, so the squash
            // visibly compresses downward instead of around the center.
            cube.position.z = 0;
            cube.position.y = GROUND_Y + HALF * cube.scale.y;
            cube.position.x = THREE.MathUtils.damp(cube.position.x, state.pointer.x * 0.08, 4, d);
        }

        // --- glow -------------------------------------------------------------
        const idlePulse = t > T_IMPACT ? Math.sin((t - T_IMPACT) * 1.1) * 0.5 + 0.5 : 0;
        const impactFlash = sinceImpact > 0 ? Math.exp(-5 * sinceImpact) : 0;
        const peak = Math.sin(Math.PI * form); // brightest mid-formation

        if (edgeMat.current) {
            // Phase base: fades to 0.65 while 2D, peaks toward 1 mid-formation,
            // then cross-fades into the seated breathing level. Softer overall
            // now that the Fresnel rim carries most of the glow.
            const preFall = emerge * 0.65 + peak * 0.3;
            const seated = 0.42 + idlePulse * 0.12;
            const mix = clamp01((t - T_FALL) * 2);
            edgeMat.current.opacity = Math.min(
                1,
                preFall * (1 - mix) + seated * mix + impactFlash * 0.3 + hoverGlow * 0.12
            );
        }
        if (bodyMat.current) {
            // Glass: never opaque -- settles around 0.3 like the CodeCubes.
            bodyMat.current.opacity = form * 0.3;
            bodyMat.current.emissiveIntensity =
                0.2 + peak * 0.6 + idlePulse * 0.12 + impactFlash * 0.4 + hoverGlow * 0.2;
        }
        if (coreMat.current) {
            // Violet heart breathing inside the glass.
            coreMat.current.opacity =
                form * (0.1 + peak * 0.15 + idlePulse * 0.08 + impactFlash * 0.25 + hoverGlow * 0.12);
        }
        if (fresnelMat.current) {
            fresnelMat.current.uniforms.uIntensity.value =
                form * (0.55 + peak * 0.5 + idlePulse * 0.18 + impactFlash * 0.6 + hoverGlow * 0.3);
        }
        if (cyanLight.current) {
            cyanLight.current.intensity = 0.6 + peak * 1.6 + impactFlash * 1.2 + idlePulse * 0.25 + hoverGlow * 0.5;
        }

        // --- particle streams: visits absorbed, leads emitted -----------------
        const flow = reducedMotion ? 0 : clamp01((t - T_IMPACT - 0.3) / 1.2);
        if (inMat.current) inMat.current.opacity = flow * 0.9;
        if (outMat.current) outMat.current.opacity = flow;
        const ps = particles.current;
        if (ps && flow > 0) {
            const now = state.clock.elapsedTime;

            // Visits: drift toward the cube, brighten near the intake, respawn on absorb.
            for (let i = 0; i < N_IN; i++) {
                const ix = i * 3;
                const dx = -ps.inPos[ix];
                const dy = FLOW_Y - ps.inPos[ix + 1];
                const dz = -ps.inPos[ix + 2];
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
                if (dist < ABSORB_R) {
                    spawnVisit(ps.inPos, i);
                } else {
                    const s = (ps.inSpeed[i] * d) / dist;
                    ps.inPos[ix] += dx * s;
                    ps.inPos[ix + 1] += dy * s + Math.sin(now * 1.6 + ps.inPhase[i]) * 0.25 * d;
                    ps.inPos[ix + 2] += dz * s;
                }
                const b = 0.18 + 0.45 * clamp01(1.8 / Math.max(dist, 0.2));
                ps.inCol[ix] = 0.55 * b;
                ps.inCol[ix + 1] = 0.8 * b;
                ps.inCol[ix + 2] = 0.9 * b;
            }
            ps.inGeo.attributes.position.needsUpdate = true;
            ps.inGeo.attributes.color.needsUpdate = true;

            // Leads: bright coherent stream out of the cube toward the headline.
            for (let i = 0; i < N_OUT; i++) {
                const ix = i * 3;
                ps.outDist[i] += ps.outSpeed[i] * d;
                if (ps.outDist[i] > LEAD_LEN) ps.outDist[i] -= LEAD_LEN;
                const along = 1.25 + ps.outDist[i];
                ps.outPos[ix] = ps.outDir[ix] * along;
                ps.outPos[ix + 1] = FLOW_Y + ps.outDir[ix + 1] * along;
                ps.outPos[ix + 2] = ps.outDir[ix + 2] * along;
                const b = Math.sin(Math.PI * (ps.outDist[i] / LEAD_LEN));
                ps.outCol[ix] = 0.25 * b;
                ps.outCol[ix + 1] = 0.95 * b;
                ps.outCol[ix + 2] = 1.0 * b;
            }
            ps.outGeo.attributes.position.needsUpdate = true;
            ps.outGeo.attributes.color.needsUpdate = true;
        }
    });

    return (
        <>
            <ambientLight intensity={0.38} />
            <hemisphereLight args={["#dffbff", "#02070a", 0.55]} />
            <directionalLight position={[4, 5.5, 4]} intensity={1.4} color="#ffffff" />
            <pointLight ref={cyanLight} position={[-3.8, 1.8, 3.5]} intensity={1.2} color={CYAN} />
            <pointLight position={[3, -2.4, 2]} intensity={0.75} color={VIOLET} />

            {/* Visits -- dim particles drifting in to be absorbed */}
            <points ref={inPoints} frustumCulled={false}>
                <pointsMaterial
                    ref={inMat}
                    size={0.055}
                    sizeAttenuation
                    vertexColors
                    transparent
                    opacity={0}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>

            {/* Leads -- bright stream leaving the cube toward the headline */}
            <points ref={outPoints} frustumCulled={false}>
                <pointsMaterial
                    ref={outMat}
                    size={0.16}
                    sizeAttenuation
                    vertexColors
                    transparent
                    opacity={0}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>

            <group
                ref={cubeRef}
                position={[0, START_Y, START_Z]}
                rotation={[0.15, 0.3, 0.18]}
                scale={[0.5, 0.5, 0.001]}
                onPointerEnter={() => {
                    hoverRef.current = true;
                }}
                onPointerLeave={() => {
                    hoverRef.current = false;
                }}
            >
                {/* Glass body */}
                <RoundedBox args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} radius={0.065} smoothness={8} bevelSegments={5}>
                    <meshPhysicalMaterial
                        ref={bodyMat}
                        color="#0B1B22"
                        emissive="#0A3D4A"
                        emissiveIntensity={0.2}
                        metalness={0.15}
                        roughness={0.12}
                        clearcoat={1}
                        clearcoatRoughness={0.15}
                        transparent
                        opacity={0}
                    />
                </RoundedBox>

                {/* Fresnel rim -- cyan grazing glow shifting violet */}
                <mesh scale={1.03}>
                    <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} />
                    <shaderMaterial
                        ref={fresnelMat}
                        uniforms={fresnelUniforms}
                        vertexShader={FRESNEL_VERT}
                        fragmentShader={FRESNEL_FRAG}
                        transparent
                        depthWrite={false}
                        blending={THREE.AdditiveBlending}
                    />
                </mesh>

                {/* Violet light core */}
                <mesh scale={0.58}>
                    <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} />
                    <meshBasicMaterial
                        ref={coreMat}
                        color={VIOLET}
                        transparent
                        opacity={0}
                        depthWrite={false}
                        blending={THREE.AdditiveBlending}
                        toneMapped={false}
                    />
                </mesh>

                {/* Soft wireframe */}
                <lineSegments geometry={edgeGeometry}>
                    <lineBasicMaterial ref={edgeMat} color={CYAN} transparent opacity={0} toneMapped={false} />
                </lineSegments>
            </group>
        </>
    );
}

function WebGLFallback() {
    return (
        <div className="relative h-full min-h-[320px] w-full">
            <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rotate-12 border border-[#34E5FF]/65 bg-[#06161B]/60 shadow-[0_0_80px_rgba(52,229,255,0.24)]" />
        </div>
    );
}

export default function HeroCube({ className = "" }: { className?: string }) {
    const [isWebGLAvailable, setIsWebGLAvailable] = useState<boolean | null>(null);
    const [reducedMotion, setReducedMotion] = useState(false);

    useEffect(() => {
        let supported = false;
        try {
            const canvas = document.createElement("canvas");
            supported = !!(
                window.WebGLRenderingContext &&
                (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
            );
        } catch {
            supported = false;
        }
        requestAnimationFrame(() => setIsWebGLAvailable(supported));
        const q = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => setReducedMotion(q.matches);
        update();
        q.addEventListener("change", update);
        return () => q.removeEventListener("change", update);
    }, []);

    return (
        <div
            className={`relative h-full min-h-[320px] w-full ${className}`}
            aria-label="Holographic glass cube materializing from the background and landing"
        >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_52%_50%,rgba(52,229,255,0.14),transparent_56%)]" />

            {isWebGLAvailable === false ? (
                <WebGLFallback />
            ) : (
                <Canvas
                    camera={{ position: [0, 1.0, 6.4], fov: 42 }}
                    gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
                    dpr={[1, 1.75]}
                    performance={{ min: 0.7 }}
                    style={{ width: "100%", height: "100%" }}
                >
                    <SolidCubeScene reducedMotion={reducedMotion} />
                </Canvas>
            )}
        </div>
    );
}
