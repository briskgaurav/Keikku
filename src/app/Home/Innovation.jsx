"use client";
import { Canvas } from "@react-three/fiber";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { Rive } from "@rive-app/canvas";
import { TextAnimation } from "../Components/Animation";
import gsap from "gsap";

export default function Innovation() {
  const canvasRef = useRef(null);
  const riveInstance = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      riveInstance.current = new Rive({
        src: "/Riv/battery_holds.riv",
        canvas: canvasRef.current,
        autoplay: false, // Let us control playback
        onLoad: () => {
          riveInstance.current.play({ loop: "loop" }); // Play in loop once loaded
        },
      });
    }

    const ctx = gsap.context(() => {
      TextAnimation("Text-Animation");
    });
    return () => {
      if (riveInstance.current) {
        riveInstance.current.cleanup();
      }
      ctx.revert();
    };
  }, []);

  return (
    <div className="bg-[#1E1328] relative px-[20vw] w-full h-fit py-[5vw]">
      <h2
        id="Text-Animation"
        className="text-[3.7vw] text-transparent bg-gradient-to-b from-[#ffdada] to-[#5f20e4] w-[85%] bg-clip-text font-bold leading-[1.1]"
      >
        Keikku, developed at the intersection of innovation and precision
      </h2>
      <div className="h-screen gap-[1vw] items-center justify-center flex w-full">
        {/* Left Panel with Video */}
        <div className="h-[90%] relative overflow-hidden rounded-[1vw] w-[60%]">
          <video
            src="https://burospaces1.fra1.cdn.digitaloceanspaces.com/keikku/card-video.mp4#t=0.01"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
          <p className="absolute top-[10%] left-1/2 -translate-x-1/2 text-center text-[2.5vw] leading-[1.1] text-[#D2C2E6] font-bold">
            Active noise cancellation
          </p>
        </div>

        {/* Right Panel with Rive and Image */}
        <div className="h-[90%] flex flex-col gap-[1vw] w-[40%]">
          {/* Rive Animation Block */}
          <div className="h-[50%] p-[1.5vw] w-full rounded-[1vw]">
            <div className="h-[10%]">
              <p className="text-[#D2C2E6] font-DMM uppercase text-[.8vw]">
                A Battery that holds
              </p>
            </div>
            <div className="w-full h-[50%] relative flex items-center justify-center">
              <canvas
                ref={canvasRef}
                width="240"
                height="382"
                className="w-1/2 h-full object-cover"
              ></canvas>
            </div>
            <div className="h-[40%]">
              <p className="text-[2.5vw] font-semibold text-left">
                all heartbeats,
              </p>
              <p className="text-[2.5vw] font-semibold text-right">all week.</p>
            </div>
          </div>

          {/* Location Image Block */}
          <div className="h-[50%] overflow-hidden relative w-full rounded-[1vw]">
            <div className="w-full h-full">
              <img
                className="w-full h-full object-cover"
                src="https://keikku.health/_ipx/f_webp&s_1200x956/imgs/snippets-map.png"
                alt="battery"
                width={1000}
                height={1000}
              />
            </div>

            <div className="w-full h-full p-[1.5vw] absolute top-0 left-0 justify-between flex flex-col">
              <p className="text-[#D2C2E6] font-DMM uppercase text-[.8vw]">
                Last location
              </p>
              <p className="text-[#D2C2E6] font-semibold leading-[1.1] text-[1.2vw] w-[70%]">
                Quickly locate your Keikku, ensuring it's always within reach
                when you need it most.
              </p>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
}
