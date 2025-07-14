"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const startFrame = 0;
const endFrame = 150;
const step = 3;

const getFrameIndices = (start, end) =>
  Array.from(
    { length: Math.floor((end - start) / step) + 1 },
    (_, i) => start + i * step
  );

const getImagePath = (frameNumber) =>
  `/sequence/keikku-${String(frameNumber)}.webp`;

export default function Sequence() {
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const frame = useRef({ current: 0 });

  // 🖼️ Preload images
  useEffect(() => {
    const frames = getFrameIndices(startFrame, endFrame);
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      setImages(frames.map(() => null)); // Placeholder array
    } else {
      const loadedImages = [];
      let loadedCount = 0;

      frames.forEach((frameNum, index) => {
        const img = new Image();
        img.src = getImagePath(frameNum);

        img.onload = () => {
          loadedCount++;
          loadedImages[index] = img;

          if (loadedCount === frames.length) {
            setImages(loadedImages);
          }
        };
      });
    }
  }, []);

  // 🎞️ Scroll-controlled canvas animation
  useEffect(() => {
    if (!canvasRef.current || images.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const aspectRatio = images[0]?.naturalWidth / images[0]?.naturalHeight || 1;
    const isMobile = window.innerWidth <= 768;
    canvas.width = isMobile ? window.innerWidth * 0.8 : window.innerWidth * 0.5;
    canvas.height = canvas.width / aspectRatio;

    const handleResize = () => {
      const newIsMobile = window.innerWidth <= 768;
      canvas.width = newIsMobile ? window.innerWidth * 1.0 : window.innerWidth * 0.5;
      canvas.height = canvas.width / aspectRatio;
      render();
    };

    window.addEventListener('resize', handleResize);

    frame.current.current = 0;

    const render = () => {
      const index = Math.floor(frame.current.current);
      let img = images[index];
      
      if (!img && window.innerWidth <= 768) {
        // Lazy load only when needed (mobile)
        const frames = getFrameIndices(startFrame, endFrame);
        img = new Image();
        img.src = getImagePath(frames[index]);
        img.onload = () => {
          images[index] = img;
          render();
        };
        return;
      }
      
      if (img) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const drawWidth = canvas.width;
        const drawHeight = drawWidth / aspectRatio;
        ctx.drawImage(img, 0, 0, drawWidth, drawHeight);
      }
    };

    render();

    const gsapCtx = gsap.context(() => {
      gsap.to(frame.current, {
        current: images.length - 1,
        ease: "none",
        onUpdate: render,
        scrollTrigger: {
          trigger: "body",
          start: "top top", 
          end: "+=140%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      gsap.to("#pulse", {
        scale: 1,
        opacity: 0,
        duration: 1,
        ease: "linear",
        repeat: -1,
      });

      gsap.to("#pulse", {
        display: "flex",
        duration: 1,
        ease: "linear",
        delay: 1,
        scrollTrigger: {
          trigger: "#features",
          start: "50% center",
          end: "bottom center", 
          scrub: true,
          markers: true,
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
    <div
      id="Sequence"
      className="sticky opacity-100 top-0 h-screen w-full flex z-[50] items-end justify-center translate-x-[2%] max-sm:translate-x-0 translate-y-[-12vw] max-sm:translate-y-[-70vw] pointer-events-none"
    >
      <canvas
        id="canvas1"
        ref={canvasRef}
        className="w-[22vw] max-sm:w-[70vw] translate-y-[10%] max-sm:translate-y-[5%] scale-95 h-auto object-contain"
      />
      <div className="absolute max-sm:hidden top-1/2 blurBg translate-y-[70%] left-1/2 -translate-x-1/2 max-sm:translate-y-[150%] w-[50%] max-sm:w-[80%] h-[20%] blur-[5vw] max-sm:blur-[20vw] z-[-1] bg-blue-500/50"></div>

      <div
        id="pulse"
        className="w-[14.5vw] max-sm:w-[40vw] hidden scale-0 h-[14.5vw] max-sm:h-[40vw] bg-blue-700/20 rounded-full absolute top-[76%] max-sm:top-[83%] left-1/2 items-center justify-center -translate-x-[50%] -translate-y-1/2 z-[999]"
      >
        <div className="w-[50%] h-[50%] bg-blue-700/20 rounded-full"></div>
      </div>
    </div>
  );
}
