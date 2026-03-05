"use client";

import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { Suspense, useState, useEffect } from "react";

interface SceneProps {
    children: React.ReactNode;
    className?: string;
}

export default function Scene({ children, className = "" }: SceneProps) {
    const [isWebGLAvailable, setIsWebGLAvailable] = useState<boolean | null>(null);

    useEffect(() => {
        const checkWebGL = () => {
            try {
                const canvas = document.createElement("canvas");
                return !!(
                    window.WebGLRenderingContext &&
                    (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
                );
            } catch {
                return false;
            }
        };
        const supported = checkWebGL();
        requestAnimationFrame(() => {
            setIsWebGLAvailable(supported);
        });
    }, []);

    // While checking, render nothing or a placeholder to avoid flash
    if (isWebGLAvailable === null) return <div className={`absolute inset-0 w-full h-full z-0 bg-[#0a0a0a] ${className}`} />;

    if (!isWebGLAvailable) {
        console.warn("WebGL not supported/available. Falling back to static background.");
        return (
            <div className={`absolute inset-0 w-full h-full z-0 bg-[#0a0a0a] ${className}`}>
                {/* Subtle static gradient fallback */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-primary/5 opacity-50" />
            </div>
        );
    }

    return (
        <div className={`absolute inset-0 w-full h-full z-0 ${className}`}>
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
                onError={(error) => {
                    console.error("Three.js/R3F Error:", error);
                    setIsWebGLAvailable(false);
                }}
            >
                <Suspense fallback={null}>
                    {children}
                    <Preload all />
                </Suspense>
            </Canvas>
        </div>
    );
}
