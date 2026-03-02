"use client";

import { useRef, useMemo, useEffect, useState, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

const COUNT = 5;
const COLORS = ["#00f0ff", "#7000ff", "#ff003c", "#00ff88", "#ff00ff", "#ffaa00"];

const PHRASES = [
    "if(true)",
    "while(1)",
    "git push -f",
    "sudo !!",
    "rm -rf /",
    "ctrl+c",
    "404",
    "Hello World",
    "!important",
    "// TODO",
    "undefined",
    "NaN",
    "segmentation fault",
    "npm install",
    "console.log",
    "break;"
];

interface CubeData {
    position: THREE.Vector3;
    baseVelocity: number;
    rotationSpeed: THREE.Vector3;
    scale: number;
    color: string;
    text: string;
}

// Global mouse state for tilt tracking
const globalMouse = {
    x: 0,
    y: 0,
    prevX: 0,
    prevY: 0,
};

function CodeBlock({
    data,
    index,
    clickedIndex,
    onColorChange,
    validatePosition
}: {
    data: CubeData;
    index: number;
    clickedIndex: number | null;
    onColorChange: (index: number, color: string) => void;
    validatePosition: (newPos: THREE.Vector3, currentY: number) => THREE.Vector3;
}) {
    const groupRef = useRef<THREE.Group>(null);
    const { viewport } = useThree();
    const [color, setColor] = useState(data.color);

    // Handle click on this specific cube
    useEffect(() => {
        if (clickedIndex === index) {
            const newColor = COLORS[Math.floor(Math.random() * COLORS.length)];
            // eslint-disable-next-line react-hooks/rules-of-hooks
            setColor(newColor);
            onColorChange(index, newColor);
        }
    }, [clickedIndex, index, onColorChange]);

    useFrame((state, delta) => {
        if (!groupRef.current) return;
        const group = groupRef.current;

        // Normal floating down animation
        group.position.y -= data.baseVelocity * delta * 20;

        // Reset position when cube goes off screen
        if (group.position.y < -viewport.height / 2 - 3) {
            // Ask parent for a valid position
            const resetPos = validatePosition(group.position, viewport.height / 2 + 3);
            group.position.copy(resetPos);
        }

        // Mouse position tracking
        const mouseWorldX = globalMouse.x * viewport.width / 2;
        const mouseWorldY = globalMouse.y * viewport.height / 2;

        const dx = mouseWorldX - group.position.x;
        const dy = mouseWorldY - group.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const maxTilt = 0.3;
        const influence = Math.max(0, 1 - distance / 10) * maxTilt;

        const mouseVelX = globalMouse.x - globalMouse.prevX;
        const mouseVelY = globalMouse.y - globalMouse.prevY;

        // Random continuous rotation on ALL axes
        group.rotation.x += data.rotationSpeed.x * delta + mouseVelY * influence;
        group.rotation.y += data.rotationSpeed.y * delta + mouseVelX * influence;
        group.rotation.z += data.rotationSpeed.z * delta;
    });

    return (
        <group ref={groupRef} position={data.position} scale={data.scale} name={`cube-${index}`}>
            {/* Main dark cube body */}
            <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial
                    color="#0a0a0a"
                    transparent
                    opacity={0.9}
                    roughness={0.3}
                    metalness={0.7}
                />
            </mesh>

            {/* Glowing wireframe edges */}
            <lineSegments>
                <edgesGeometry args={[new THREE.BoxGeometry(1.01, 1.01, 1.01)]} />
                <lineBasicMaterial color={color} transparent opacity={1} />
            </lineSegments>

            {/* Inner glow effect */}
            <mesh scale={0.95}>
                <boxGeometry args={[1, 1, 1]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.2}
                />
            </mesh>

            {/* Text Label on front */}
            <Text
                position={[0, 0, 0.51]}
                fontSize={0.15}
                maxWidth={0.8}
                textAlign="center"
                color={color}
                anchorX="center"
                anchorY="middle"
                font="https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8L6tjPQ.ttf"
            >
                {data.text}
            </Text>

            {/* Text Label on back (mirrored) */}
            <Text
                position={[0, 0, -0.51]}
                fontSize={0.15}
                maxWidth={0.8}
                textAlign="center"
                color={color}
                anchorX="center"
                anchorY="middle"
                rotation={[0, Math.PI, 0]}
                font="https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8L6tjPQ.ttf"
            >
                {data.text}
            </Text>
        </group>
    );
}

export default function CodeCubes() {
    const { viewport, camera } = useThree();
    const groupRef = useRef<THREE.Group>(null);
    const cubeRefs = useRef<THREE.Group[]>([]);
    const [clickedIndex, setClickedIndex] = useState<number | null>(null);
    const raycaster = useMemo(() => new THREE.Raycaster(), []);
    const [cubeCount, setCubeCount] = useState(COUNT); // Default to full count

    useEffect(() => {
        const handleResize = () => {
            setCubeCount(window.innerWidth < 768 ? 2 : COUNT);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Centralized position validator to prevent overlaps
    const validatePosition = useCallback((newPos: THREE.Vector3, resetY: number) => {
        const minDistance = 6; // Increased safe distance
        let attempts = 0;
        const safePos = newPos.clone();
        safePos.y = resetY;

        do {
            const side = Math.random() > 0.5 ? 1 : -1;
            // Generate cubes primarily on the left or right 20% to avoid overlapping central text
            safePos.x = side * (viewport.width * 0.25 + Math.random() * viewport.width * 0.2);
            // Stagger Y slightly so they don't all appear exactly at the same line
            safePos.y = resetY + Math.random() * 5;

            // Check collision with other ACTIVE cubes
            // We look at the live positions of other cubes in the scene
            const valid = cubeRefs.current.every(cube => {
                if (!cube || cube.position.distanceTo(safePos) < 0.1) return true; // Ignore self
                // Check 2D distance (X/Y) primarily
                const dx = cube.position.x - safePos.x;
                const dy = cube.position.y - safePos.y;
                return Math.sqrt(dx * dx + dy * dy) > minDistance;
            });

            if (valid) return safePos;
            attempts++;
        } while (attempts < 10);

        return safePos; // Return best attempt if max attempts reached
    }, [viewport.width]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            globalMouse.prevX = globalMouse.x;
            globalMouse.prevY = globalMouse.y;
            globalMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            globalMouse.y = -((e.clientY / window.innerHeight) * 2 - 1);
        };

        const handleClick = (e: MouseEvent) => {
            if (!groupRef.current) return;

            const mouse = new THREE.Vector2(
                (e.clientX / window.innerWidth) * 2 - 1,
                -((e.clientY / window.innerHeight) * 2 - 1)
            );

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(groupRef.current.children, true);

            for (const intersect of intersects) {
                let obj = intersect.object;
                while (obj && !obj.name.startsWith("cube-")) {
                    obj = obj.parent as THREE.Object3D;
                }
                if (obj && obj.name.startsWith("cube-")) {
                    const index = parseInt(obj.name.split("-")[1], 10);
                    setClickedIndex(index);
                    setTimeout(() => setClickedIndex(null), 100);
                    break;
                }
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("click", handleClick);
        };
    }, [camera, raycaster]);

    const [cubes, setCubes] = useState<CubeData[]>([]);

    useEffect(() => {
        const positions: THREE.Vector3[] = [];
        const minDistance = 7; // Much stricter initial separation
        const newCubes: CubeData[] = [];

        for (let i = 0; i < cubeCount; i++) {
            let attempts = 0;
            let newPos: THREE.Vector3;
            do {
                const side = Math.random() > 0.5 ? 1 : -1;
                newPos = new THREE.Vector3(
                    side * (6 + Math.random() * 5), // Keep away from center X=0, between 6 and 11
                    (Math.random() - 0.5) * 18,
                    -2 - i * 2 // Force distinct Z layers
                );
                attempts++;
            } while (
                attempts < 50 &&
                positions.some((p) => p.distanceTo(newPos) < minDistance)
            );
            positions.push(newPos);

            newCubes.push({
                position: newPos,
                baseVelocity: 0.005 + Math.random() * 0.005, // More uniform velocity to prevent catching up
                rotationSpeed: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.8,
                    (Math.random() - 0.5) * 0.8,
                    (Math.random() - 0.5) * 0.4
                ),
                scale: 0.8 + Math.random() * 0.5,
                color: COLORS[i % COLORS.length],
                text: PHRASES[i % PHRASES.length],
            });
        }

        setCubes(newCubes);
    }, [cubeCount]);

    const handleColorChange = useCallback((index: number, color: string) => {
        // Color change handled via state
    }, []);

    return (
        <group ref={groupRef}>
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={0.8} color="#ffffff" />
            <pointLight position={[-10, -10, -5]} intensity={0.5} color="#7000ff" />
            <pointLight position={[5, 5, 5]} intensity={0.3} color="#00f0ff" />

            {cubes.map((data, i) => (
                <group key={i} ref={el => { if (el) cubeRefs.current[i] = el; }}>
                    <CodeBlock
                        data={data}
                        index={i}
                        clickedIndex={clickedIndex}
                        onColorChange={handleColorChange}
                        validatePosition={validatePosition}
                    />
                </group>
            ))}
        </group>
    );
}
