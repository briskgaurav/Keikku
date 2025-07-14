'use client';
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);


const vertexShader = `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform float uWaveStrength;

void main () {
  vUv = uv;
  vec3 pos = position;

  float delay = pow(1.0 - vUv.y, 2.0);
  float wave = sin(pos.x * 10.0 + uTime * 2.0 + delay * 5.0) * 0.1;
  pos.z += wave * uWaveStrength;
  pos.x += wave *0.1 * delay;

  vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * viewMatrix * modelPosition;
}



`;

const fragmentShader = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTexture;

float roundedRect(vec2 uv, vec2 size, float radius) {
  uv = uv * 2.0 - 1.0;
  vec2 halfSize = size - vec2(radius);
  vec2 d = abs(uv) - halfSize;
  float outside = length(max(d, 0.0)) - radius;
  return 1.0 - smoothstep(0.0, 0.01, outside);
}

void main() {
  vec4 tex = texture2D(uTexture, vUv);
  float mask = roundedRect(vUv, vec2(1.0), 0.15);
  tex.a *= mask;

  if (tex.a < 0.01) discard;
  gl_FragColor = tex;
}


`;

const Cube = ({ triggerRef }) => {
  const meshRef = useRef();
  const videoRef = useRef(document.createElement('video'));

  useEffect(() => {
    const video = videoRef.current;
    video.src = '/front-page.mp4'; 
    video.crossOrigin = 'anonymous';
    video.loop = true;
    video.muted = true;
    video.play();
  }, []);



  const texture = new THREE.VideoTexture(videoRef.current);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.format = THREE.RGBFormat;

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value += 0.01;
    }
  });

useEffect(() => {
  const ctx = gsap.context(() => {
    if (meshRef.current && triggerRef.current) {
      const mat = meshRef.current.material;

      // Animate uWaveStrength from 0 to 5
      gsap.to(mat.uniforms.uWaveStrength, {
        value: 5,
        duration: 2,
        ease: "power2.out"
      });
     
      gsap.to(meshRef.current.position, {
        x: 2,
        y: -0.6,

        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: '20% top',
          end: 'bottom top',
        //   scrub: true,
          // markers: true,
          onUpdate: (self) => {
            const progress = self.progress;
            mat.uniforms.uWaveStrength.value = Math.sin(progress * Math.PI) * 3; 
          },
        },
      });
    }
  });

  return () => ctx.revert();
}, [triggerRef]);


  return (
    <mesh ref={meshRef} position={[-2, 0.5, 0]}>
      <planeGeometry args={[3, 2, 300, 300]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uTexture: { value: texture },
          uWaveStrength: { value: 0 },
        }}
        side={THREE.DoubleSide}
        transparent={true}
      />
    </mesh>
  );
};


const Exp = () => {
  const triggerRef = useRef();

  return (
    <div className="w-full h-screen" ref={triggerRef}>
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 3, 5]} />
        <Cube triggerRef={triggerRef} />
      </Canvas>
    </div>
  );
};


export default Exp;