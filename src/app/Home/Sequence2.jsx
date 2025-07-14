"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const startFrame = 161;
const endFrame = 242;
const step = 3;

const getFrameIndices = (start, end) =>
  Array.from(
    { length: Math.floor((end - start) / step) + 1 },
    (_, i) => start + i * step
  );

const getImagePath = (frameNumber) =>
  `/sequence/keikku-${String(frameNumber)}.webp`;

export default function Sequence2() {
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const frame = useRef({ current: 0 });

  // 🖼️ Preload images
  useEffect(() => {
    const frames = getFrameIndices(startFrame, endFrame).map((frameNum) => {
      const img = new Image();
      img.src = getImagePath(frameNum);
      return img;
    });
    setImages(frames);
  }, []);

  // 🎞️ Scroll-controlled canvas animation
  useEffect(() => {
    if (!canvasRef.current || images.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas size based on first image aspect ratio and screen size
    const aspectRatio = images[0].naturalWidth / images[0].naturalHeight;
    const isMobile = window.innerWidth <= 768;
    
    // Adjust canvas width based on screen size
    canvas.width = isMobile ? window.innerWidth * 0.9 : window.innerWidth * 0.6;
    canvas.height = canvas.width / aspectRatio;

    // Handle resize
    const handleResize = () => {
      const newIsMobile = window.innerWidth <= 768;
      canvas.width = newIsMobile ? window.innerWidth * 1.0 : window.innerWidth * 0.7;
      canvas.height = canvas.width / aspectRatio;
      render();
    };

    window.addEventListener('resize', handleResize);

    // ✅ Draw first frame immediately
    frame.current.current = 0;
    const render = () => {
      const index = Math.floor(frame.current.current);
      const img = images[index];
      if (img) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    };

    render();

    const gsapCtx = gsap.context(() => {
      gsap.to(frame.current, {
        current: images.length - 1,
        ease: "none",
        onUpdate: render,
        scrollTrigger: {
          trigger: "#Sequence2",
          start: "top top",
          end: "+=130%",
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsapCtx.revert();
      window.removeEventListener('resize', handleResize);
    };
  }, [images]);

  return (
    <div id="Sequence2" className="h-screen -mt-[100vh] absolute z-[999] opacity-0 top-0  right-0 w-full ">
      <canvas 
        ref={canvasRef} 
        className="w-[68vw] h-auto   max-sm:w-[200vw] object-contain translate-y-[25%] max-sm:translate-y-[55%] translate-x-[43%] max-sm:translate-x-[-8%]" 
      />
    </div>
  );
}
