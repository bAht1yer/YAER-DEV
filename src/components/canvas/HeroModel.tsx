"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float, Stars } from "@react-three/drei";
import * as THREE from "three";

export default function HeroModel() {
    const sphereRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (sphereRef.current) {
            // Rotate the sphere slowly
            sphereRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
            sphereRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
        }
    });

    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} color="#00f0ff" />
            <directionalLight position={[-10, -10, -5]} intensity={1} color="#7000ff" />

            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            <Float speed={2} rotationIntensity={1} floatIntensity={2}>
                <Sphere ref={sphereRef} args={[1.5, 64, 64]} position={[2, 0, 0]}>
                    <MeshDistortMaterial
                        color="#1a1a1a"
                        attach="material"
                        distort={0.4}
                        speed={2}
                        roughness={0.2}
                        metalness={0.8}
                        emissive="#00f0ff"
                        emissiveIntensity={0.1}
                        wireframe={true}
                    />
                </Sphere>
            </Float>

            <Float speed={1.5} rotationIntensity={2} floatIntensity={1}>
                <Sphere args={[0.5, 32, 32]} position={[-2, 1, -2]}>
                    <MeshDistortMaterial
                        color="#7000ff"
                        attach="material"
                        distort={0.6}
                        speed={3}
                        roughness={0.2}
                        metalness={0.8}
                    />
                </Sphere>
            </Float>
        </>
    );
}
