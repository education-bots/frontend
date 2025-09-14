"use client";

import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { useEffect, useRef } from "react";
import * as THREE from "three";

function RobotModel() {
  const fbx = useLoader(FBXLoader, "/source/Robot_Holo_5.fbx");
  const mixer = useRef<THREE.AnimationMixer>();

  // Load textures
  const textureLoader = new THREE.TextureLoader();
  const albedoMapBot = textureLoader.load("/textures/bot_sg_albedo.jpg");
  const emissiveMapBot = textureLoader.load("/textures/bot_sg_emissive.jpg");
  const metallicMapBot = textureLoader.load("/textures/bot_sg_metallic.jpg");
  const roughnessMapBot = textureLoader.load("/textures/bot_sg_roughness.jpg");

  const albedoMapHolo = textureLoader.load("/textures/holo_sg_albedo.jpg");
  const emissiveMapHolo = textureLoader.load("/textures/holo_sg_emissive.jpg");
  const opacityMapHolo = textureLoader.load("/textures/holo_sg_opacity.jpg");

  useEffect(() => {
    fbx.scale.set(0.12, 0.12, 0.12); // make bigger

    fbx.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (mesh.geometry.attributes.uv) {
          mesh.geometry.setAttribute("uv2", mesh.geometry.attributes.uv);
        }

        mesh.material = new THREE.MeshStandardMaterial({
         color: new THREE.Color("#6d28d9"),
  map: albedoMapBot,
  emissiveMap: emissiveMapBot,
  emissive: new THREE.Color("#00ffff"),
  emissiveIntensity: 2,
  metalnessMap: metallicMapBot,
  roughnessMap: roughnessMapBot,
  alphaMap: opacityMapHolo,
  transparent: true,
  aoMap: emissiveMapHolo,
        });
      }
    });

    // 🎬 Setup animation mixer if FBX has animations
    if (fbx.animations && fbx.animations.length > 0) {
      mixer.current = new THREE.AnimationMixer(fbx);
      const action = mixer.current.clipAction(fbx.animations[0]);
      action.play();
    }
  }, [fbx]);

  // Update animation on each frame
  useFrame((_, delta) => {
    if (mixer.current) mixer.current.update(delta);
  });

  // ⬇️ Move robot slightly down
  return <primitive object={fbx} position={[0, -1.5, 0]} />;
}

export default function Robot() {
  return (
    <div className="w-full h-[500px] lg:h-[500px]">
      <Canvas camera={{ position: [0, 3, 8], fov: 50 }} shadows>
        {/* Lights */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />

        {/* Robot */}
        <RobotModel />

        {/* Controls */}
        <OrbitControls enableDamping />
      </Canvas>
    </div>
  );
}
