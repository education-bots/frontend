"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Stars } from "@react-three/drei";

export default function Background3D() {
  return (
    <Canvas className="absolute inset-0 -z-10 opacity-40">
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 3, 3]} intensity={0.8} />
      <Stars radius={80} depth={40} count={4000} factor={3} fade />
      <Float speed={2.5} rotationIntensity={1} floatIntensity={1}>
        <mesh>
          <icosahedronGeometry args={[1.8, 1]} />
          <meshStandardMaterial color="#6366f1" wireframe />
        </mesh>
      </Float>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
}
