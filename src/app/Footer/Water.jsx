"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { degToRad } from "three/src/math/MathUtils";
import { useEffect, useState } from "react";

function WaveMaterial() {
  const materialRef = useRef();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uFrequency: { value: new THREE.Vector2(3, 1.5) },
      uColor2: { value: new THREE.Color("#0000ff") },
      uColor1: { value: new THREE.Color("#F4FBFF") },
    }),
    []
  );

  useFrame((state) => {
    const { clock } = state;
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <shaderMaterial
      side={THREE.DoubleSide}
      ref={materialRef}
      uniforms={uniforms}
      vertexShader={`
        uniform float uTime;
        uniform vec2 uFrequency;
        
        varying vec2 vUv;
        varying float vElevation;
        
        void main() {
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          float elevation = sin(modelPosition.x * uFrequency.x + uTime * 0.8) * 
                          sin(modelPosition.z * uFrequency.y + uTime * 0.8) * 1.0;
          
          modelPosition.y += elevation;
          
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectedPosition = projectionMatrix * viewPosition;
          
          gl_Position = projectedPosition;
          
          vUv = uv;
          vElevation = elevation;
        }
      `}
      fragmentShader={`
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      varying vec2 vUv;
      varying float vElevation;

      void main() {
        // radial distance from center
        float dist = distance(vUv, vec2(0.1));
        
        // blend based on elevation and distance
        float mixStrength = smoothstep(0.4, 0.9, 1.0 - dist) + (vElevation + 1.0) * 0.15;
        mixStrength = clamp(mixStrength, 0.0, 1.0);

        vec3 baseColor = mix(uColor1, uColor2, mixStrength);

        // add subtle glow by raising brightness near the center
        float glow = smoothstep(0.3, 0.0, dist);
        vec3 glowColor = vec3(1.0, 1.0, 1.0) * glow * 0.3;

        gl_FragColor = vec4(baseColor + glowColor, 1.0);
      }
      `}
    />
  );
}

function Scene() {
  const [scale, setScale] = useState(2.5);
  const [yPos, setYPos] = useState(-1.3);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width < 640) { // mobile
        setScale(2);
        setYPos(-5);
      } else if (width < 1024) { // tablet
        setScale(3);
        setYPos(-5);
      } else { // desktop
        setScale(2.5);
        setYPos(-3);
      }
    }

    handleResize(); // Initial call
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <mesh rotation={[degToRad(110), 0, degToRad(-45)]} position={[0, yPos, 0]}>
      <icosahedronGeometry args={[scale, 32]} />
      <WaveMaterial />
    </mesh>
  );
}

export default function WavyShader() {
  return (
    <Canvas className="h-full w-full">
      <Scene />
    </Canvas>
  );
}
