"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  OrthographicCamera,
} from "@react-three/drei";
import {
  Color,
  ExtrudeGeometry,
  Float32BufferAttribute,
  Shape,
  type Group,
} from "three";
import BrandMarkRelief from "../ui/BrandMarkRelief";

type Props = { pointer: [number, number]; reducedMotion: boolean };
const contours = [
  [
    [0, 0],
    [19, 0],
    [37, 25],
    [22, 42],
    [0, 6],
  ],
  [
    [44, 0],
    [64, 0],
    [25, 47],
    [8, 57],
  ],
  [
    [25, 51],
    [45, 28],
    [37, 63],
    [17, 72],
  ],
];

function Mark({ pointer, reducedMotion }: Props) {
  const group = useRef<Group>(null);
  const { size, invalidate } = useThree();
  const geometry = useMemo(() => {
    const shapes = contours.map((points) => {
      const shape = new Shape();
      points.forEach(([x, y], index) => {
        const point: [number, number] = [(x - 32) / 20, (36 - y) / 20];
        if (index === 0) shape.moveTo(...point);
        else shape.lineTo(...point);
      });
      shape.closePath();
      return shape;
    });
    const mesh = new ExtrudeGeometry(shapes, {
      depth: 0.42,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.055,
      bevelThickness: 0.075,
      curveSegments: 1,
    });
    mesh.translate(0, 0, -0.21);
    // Anodized finish shifts from deep citron to pale gold across the face.
    const positions = mesh.getAttribute("position");
    const colors = [];
    const dark = new Color("#879a00");
    const light = new Color("#e6ff19");
    const color = new Color();
    for (let index = 0; index < positions.count; index++) {
      const blend = Math.max(
        0,
        Math.min(1, (positions.getY(index) + 1.9) / 3.8),
      );
      color.copy(dark).lerp(light, blend);
      colors.push(color.r, color.g, color.b);
    }
    mesh.setAttribute("color", new Float32BufferAttribute(colors, 3));
    return mesh;
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);
  useEffect(() => invalidate(), [pointer, reducedMotion, invalidate]);

  useFrame((_, delta) => {
    if (!group.current) return;
    const targetX = 0.2 + (reducedMotion ? 0 : pointer[1] * 0.35);
    const targetY = -0.5 + (reducedMotion ? 0 : pointer[0] * 0.65);
    const ease = reducedMotion ? 1 : 1 - Math.exp(-9 * Math.min(delta, 0.1));
    group.current.rotation.x += (targetX - group.current.rotation.x) * ease;
    group.current.rotation.y += (targetY - group.current.rotation.y) * ease;
    if (
      Math.abs(targetX - group.current.rotation.x) +
        Math.abs(targetY - group.current.rotation.y) >
      0.001
    )
      invalidate();
  });

  return (
    <>
      <OrthographicCamera
        makeDefault
        position={[0, 0, 8]}
        zoom={size.width / 4.35}
        near={0.1}
        far={50}
      />
      <group ref={group} rotation={[0.2, -0.5, -0.08]}>
        <mesh geometry={geometry}>
          <meshPhysicalMaterial
            attach="material-0"
            vertexColors
            toneMapped={false}
            color="#ffffff"
            metalness={0.55}
            roughness={0.23}
            clearcoat={0.7}
            clearcoatRoughness={0.18}
          />
          <meshStandardMaterial
            attach="material-1"
            color="#c2c8b5"
            metalness={0.6}
            roughness={0.22}
          />
        </mesh>
      </group>
    </>
  );
}

export default function BrandMarkScene(props: Props) {
  return (
    <Canvas
      orthographic
      camera={{ position: [0, 0, 8], zoom: 45, near: 0.1, far: 50 }}
      dpr={[1, 1.5]}
      frameloop="demand"
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      fallback={<BrandMarkRelief />}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[-3, 5, 6]} intensity={3} color="#f5ffd5" />
      <directionalLight position={[4, -1, 2]} intensity={1.4} color="#b5bed1" />
      <pointLight
        position={[-1, 2, 3]}
        intensity={18}
        distance={8}
        color="#f4ffce"
      />
      <Environment resolution={64} frames={1}>
        <Lightformer
          intensity={3}
          position={[-3, 4, 3]}
          rotation={[0, Math.PI / 4, 0]}
          scale={[3, 6, 1]}
          color="#ffffff"
        />
        <Lightformer
          intensity={2}
          position={[3, 1, 4]}
          rotation={[0, -Math.PI / 4, 0]}
          scale={[1, 5, 1]}
          color="#efffb5"
        />
        <Lightformer
          intensity={1.5}
          position={[0, -3, 2]}
          scale={[5, 1, 1]}
          color="#bac7dd"
        />
      </Environment>
      <Mark {...props} />
    </Canvas>
  );
}
