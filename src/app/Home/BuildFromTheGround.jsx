"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  Environment,
  useTexture,
} from "@react-three/drei";
import React, {
  Suspense,
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import * as THREE from "three";
import { degToRad } from "three/src/math/MathUtils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { TextAnimation } from "../Components/Animation";

gsap.registerPlugin(ScrollTrigger);

// Part data
const parts = [
  { name: "1_RetopoCircle", x: -0.048 },
  { name: "2_PlasticTop", x: -0.04 },
  { name: "3_BodyLightguide", x: -0.032 },
  { name: "5_Lightguide", x: -0.024 },
  { name: "6_ProximityAntenna", x: -0.016 },
  { name: "7_Midring", x: -0.008 },
  { name: "8_Battery", x: -0.001 },
  { name: "9_PCB", x: 0.004 },
  { name: "10_FerriteAdhesive", x: 0.008 },
  { name: "11_IrCoil", x: 0.016 },
  { name: "12_EchoRing", x: 0.024 },
  { name: "13_AudioChamber", x: 0.032 },
  { name: "14_Plane", x: 0.04 },
  { name: "15_Cylinder", x: 0.048 },
];

// Animated Part Component
function AnimatedMesh({ geometry, material, baseX, index, hoveredIndex, opened }) {
  const ref = useRef();

  // Base and hover X positions
  const openedX = useRef(0);         // Where GSAP animates to (base open position)
  const finalX = useRef(0);          // Where we actually move the mesh
  const hoverOffset = useRef(0);     // Dynamic hover gap

  const rotationTarget = useRef(0);
  const rotationCurrent = useRef(0);

  // GSAP opens the model
  useEffect(() => {
    gsap.to(openedX, {
      current: opened ? baseX : 0,
      duration: 1.5,
      ease: "power4.inOut",
    });
  }, [opened, baseX]);

  // Handle hover spacing logic
  useEffect(() => {
    const gap = 0.01;

    if (hoveredIndex === null) {
      rotationTarget.current = 0;
      hoverOffset.current = 0;
    } else if (hoveredIndex === index) {
      rotationTarget.current = degToRad(90);
      hoverOffset.current = 0;
    } else {
      const distance = index - hoveredIndex;
      hoverOffset.current = Math.sign(distance) * gap;
      rotationTarget.current = 0;
    }
  }, [hoveredIndex]);

  useFrame(() => {
    if (!ref.current) return;

    // Interpolate rotation
    rotationCurrent.current = THREE.MathUtils.lerp(
      rotationCurrent.current,
      rotationTarget.current,
      0.1
    );
    ref.current.rotation.y = rotationCurrent.current;

    // Interpolate final position (base open pos + hover offset)
    finalX.current = THREE.MathUtils.lerp(
      finalX.current,
      openedX.current + hoverOffset.current,
      0.1
    );
    ref.current.position.x = finalX.current;
  });

  return (
    <group ref={ref} rotation={[0, degToRad(5), 0]} position={[0, 0, 0]}>
      <mesh geometry={geometry} material={material} castShadow receiveShadow />
    </group>
  );
}


// Model Group Component
function Model() {
  const { nodes } = useGLTF("/Model/device_v9.glb");
  const textures = useTexture({
    plasticClear: "https://keikku.health/webgl/plastic-clear-matcap3.1.jpg",
    copperMesh: "https://keikku.health/webgl/coper-mesh0.1.jpg",
    pcbBack: "https://keikku.health/webgl/pcb-backe.2.1.jpg",
    plasticTex: "https://keikku.health/webgl/plastic-texture0.1.jpg",
  });

  const materialMap = useMemo(() => {
    const texToMat = (map) => new THREE.MeshStandardMaterial({ map });
    return {
      "1_RetopoCircle": texToMat(textures.plasticTex),
      "2_PlasticTop": texToMat(textures.plasticTex),
      "3_BodyLightguide": texToMat(textures.plasticClear),
      "5_Lightguide": texToMat(textures.plasticClear),
      "6_ProximityAntenna": texToMat(textures.copperMesh),
      "7_Midring": texToMat(textures.plasticTex),
      "8_Battery": texToMat(textures.pcbBack),
      "9_PCB": texToMat(textures.pcbBack),
      "10_FerriteAdhesive": texToMat(textures.pcbBack),
      "11_IrCoil": texToMat(textures.copperMesh),
      "12_EchoRing": texToMat(textures.plasticTex),
      "13_AudioChamber": texToMat(textures.plasticTex),
      "14_Plane": texToMat(textures.plasticTex),
      "15_Cylinder": texToMat(textures.plasticTex),
    };
  }, [textures]);

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [opened, setOpened] = useState(false);

  // Scroll-triggered opening
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: "#Text-animation",
      start: "top center",
      onEnter: () => setOpened(true),
    });
    return () => trigger.kill();
  }, []);

  const handleHover = useCallback((i) => setHoveredIndex(i), []);
  const clearHover = useCallback(() => setHoveredIndex(null), []);

  return (
    <group scale={75} rotation={[0, degToRad(5), degToRad(-20)]} position={[0.5, 0, 0]}>
      {parts.map((part, index) => (
        <group
          key={part.name}
          onPointerEnter={() => handleHover(index)}
          onPointerLeave={clearHover}
        >
          <AnimatedMesh
            geometry={nodes[part.name].geometry}
            material={materialMap[part.name]}
            baseX={part.x}
            index={index}
            hoveredIndex={hoveredIndex}
            opened={opened}
          />
        </group>
      ))}
    </group>
  );
}

// Main Scene Export
export default function BuildFromTheGround() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      TextAnimation("Text-animation");
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#1E1328] w-full h-fit py-[5vw]">
      <h2
        id="Text-animation"
        className="text-[10vw] max-md:text-[12vw] max-md:pl-[15vw] max-md:px-[5vw] px-[15vw] max-sm:text-[19vw] max-sm:px-[10vw] text-transparent bg-gradient-to-b from-[#ffdada] to-[#5f20e4] bg-clip-text font-bold leading-[1.1]"
      >
        Built from the ground up
      </h2>
      <p className="hidden max-sm:flex text-[8vw]  w-[80%] mt-[5vw] px-[5vw] text-transparent bg-gradient-to-b from-[#ffdada] to-[#5f20e4] bg-clip-text font-bold leading-[1.1]">Keikku, developed at the intersection of innovation and precision</p>

      <div className="h-[80vh] max-md:hidden max-sm:hidden relative w-full">
        <Canvas
          shadows
          dpr={[1, 2]}
          gl={{ antialias: true }}
          camera={{ position: [0, 2, 5], fov: 50 }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={1} />
            <directionalLight position={[5, 5, 5]} castShadow />
            <Environment preset="city" />
            <Model />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
