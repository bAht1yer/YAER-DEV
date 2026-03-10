"use client";

import { useEffect, useState } from "react";

export default function InteractiveGrid() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Base Static Grid REMOVED - completely dark until hovered */}


            {/* Interactive Mouse Glow Spotlight */}
            <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 240, 255, 0.08), transparent 40%)`
                }}
            />
            {/* Harder Grid Reveal under mouse */}
            <div
                className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.15)_1px,transparent_1px)] bg-[size:50px_50px]"
                style={{
                    maskImage: `radial-gradient(200px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent 100%)`,
                    WebkitMaskImage: `radial-gradient(200px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent 100%)`
                }}
            />
        </div>
    );
}
