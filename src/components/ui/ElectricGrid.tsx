"use client";

import { useEffect, useRef } from "react";

export default function ElectricGrid() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        const particles: Particle[] = [];
        const GRID_SIZE = 40;
        const PARTICLE_COUNT = 3;

        // Define exact colors for intense neon look
        const PRIMARY_COLOR = { r: 0, g: 240, b: 255 }; // Cyan #00f0ff
        const SECONDARY_COLOR = { r: 138, g: 43, b: 226 }; // BlueViolet/Neon purple

        interface Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            speed: number;
            color: typeof PRIMARY_COLOR;
            life: number;
            maxLife: number;
            delay: number; // Delay before starting/respawning
            trail: { x: number; y: number }[];
        }

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createParticle = (isRespawn = false): Particle => {
            const startOnHorizontal = Math.random() > 0.5;
            const x = Math.floor(Math.random() * (canvas.width / GRID_SIZE)) * GRID_SIZE;
            const y = Math.floor(Math.random() * (canvas.height / GRID_SIZE)) * GRID_SIZE;

            // Variable speed: some slow (2-3), some fast (6-9)
            const isFast = Math.random() > 0.6;
            const speed = isFast ? 6 + Math.random() * 3 : 2 + Math.random() * 1.5;

            return {
                x,
                y,
                vx: startOnHorizontal ? (Math.random() > 0.5 ? 1 : -1) * speed : 0,
                vy: startOnHorizontal ? 0 : (Math.random() > 0.5 ? 1 : -1) * speed,
                speed,
                color: Math.random() > 0.5 ? PRIMARY_COLOR : SECONDARY_COLOR,
                life: 0,
                maxLife: 200 + Math.random() * 300,
                // Add random delay on respawn to make it feel less crowded/frequent
                delay: isRespawn ? Math.random() * 200 : Math.random() * 100,
                trail: [],
            };
        };

        const initParticles = () => {
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push(createParticle());
            }
        };

        const updateParticle = (p: Particle) => {
            // Handle delay wait time
            if (p.delay > 0) {
                p.delay--;
                return;
            }

            p.life++;

            // Store trail points
            p.trail.push({ x: p.x, y: p.y });
            if (p.trail.length > 25) p.trail.shift();

            // Move
            p.x += p.vx;
            p.y += p.vy;

            // Snap to grid intersections for turn decisions
            // Use higher tolerance for faster particles
            const tolerance = p.speed * 0.6;
            const onGridX = Math.abs(p.x % GRID_SIZE) < tolerance;
            const onGridY = Math.abs(p.y % GRID_SIZE) < tolerance;

            if (onGridX && onGridY && Math.random() < 0.2) {
                // Snap to exact grid
                p.x = Math.round(p.x / GRID_SIZE) * GRID_SIZE;
                p.y = Math.round(p.y / GRID_SIZE) * GRID_SIZE;

                // Change direction
                if (p.vx !== 0) {
                    p.vx = 0;
                    p.vy = (Math.random() > 0.5 ? 1 : -1) * p.speed;
                } else {
                    p.vy = 0;
                    p.vx = (Math.random() > 0.5 ? 1 : -1) * p.speed;
                }
            }

            // Reset if out of bounds or life expired
            if (
                p.x < -50 ||
                p.x > canvas.width + 50 ||
                p.y < -50 ||
                p.y > canvas.height + 50 ||
                p.life > p.maxLife
            ) {
                Object.assign(p, createParticle(true));
            }
        };

        const drawTrailSegment = (start: { x: number, y: number }, end: { x: number, y: number }, color: typeof PRIMARY_COLOR, alpha: number) => {
            const { r, g, b } = color;

            ctx.beginPath();
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(end.x, end.y);

            // Intense core 
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
            ctx.lineWidth = 2;
            ctx.stroke();

            // Outer glow
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.4})`;
            ctx.lineWidth = 6;
            ctx.stroke();

            // Wide haze
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.1})`;
            ctx.lineWidth = 12;
            ctx.stroke();
        };

        const drawParticle = (p: Particle) => {
            // Don't draw if in waiting state
            if (p.delay > 0) return;

            const alpha = Math.min(1, p.life / 20) * (1 - p.life / p.maxLife);

            if (p.trail.length > 1) {
                for (let i = 0; i < p.trail.length - 1; i++) {
                    const segmentAlpha = (i / p.trail.length) * alpha;
                    drawTrailSegment(p.trail[i], p.trail[i + 1], p.color, segmentAlpha);
                }
                drawTrailSegment(p.trail[p.trail.length - 1], { x: p.x, y: p.y }, p.color, alpha);
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                updateParticle(p);
                drawParticle(p);
            });

            animationId = requestAnimationFrame(animate);
        };

        resize();
        initParticles();
        animate();

        window.addEventListener("resize", resize);

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-10 pointer-events-none"
            style={{ background: "transparent" }}
        />
    );
}
