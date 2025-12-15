"use client";

import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { Suspense } from "react";

interface SceneProps {
    children: React.ReactNode;
    className?: string;
}

export default function Scene({ children, className = "" }: SceneProps) {
    return (
        <div className={`absolute inset-0 w-full h-full z-0 ${className}`}>
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]} // Handle high DPI screens
            >
                <Suspense fallback={null}>
                    {children}
                    <Preload all />
                </Suspense>
            </Canvas>
        </div>
    );
}
