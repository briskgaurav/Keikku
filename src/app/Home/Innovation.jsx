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
    <div className="bg-[#1E1328] relative max-sm:px-[5vw] px-[20vw] w-full h-fit py-[5vw]">
      <h2
        id="Text-Animation"
        className="text-[3.7vw] text-transparent bg-gradient-to-b from-[#ffdada] to-[#5f20e4] max-sm:hidden w-[85%] max-sm:w-[95%] bg-clip-text font-bold leading-[1.1]"
      >
        Keikku, developed at the intersection of innovation and precision
      </h2>
      <div className="h-screen max-sm:h-[50vh] gap-[1vw] max-sm:flex-col  max-sm:gap-[2vw] items-center justify-center flex w-full">
        {/* Left Panel with Video */}
        <div className="h-[90%] max-sm:h-[35%] relative overflow-hidden max-sm:rounded-[4vw] rounded-[1vw] max-sm:w-[100%] w-[60%]">
          <video
            src="https://burospaces1.fra1.cdn.digitaloceanspaces.com/keikku/card-video.mp4#t=0.01"
            autoPlay
            muted
            loop
            preload="auto"
            loading="lazy"
            playsInline
            className="w-full h-full object-cover"
          />
          <p className="absolute top-[10%] left-1/2 -translate-x-1/2  max-sm:w-full text-center text-[2.5vw] leading-[1.1] max-sm:text-[6vw] text-[#D2C2E6] font-bold">
            Active noise cancellation
          </p>
        </div>

        {/* Right Panel with Rive and Image */}
        <div className="h-[90%] max-sm:h-fit flex flex-col max-sm:flex-row gap-[1vw] max-sm:w-full w-[40%] max-sm:gap-[2vw]">
          {/* Rive Animation Block */}
          <div className="h-[50%] max-sm:h-full max-sm:bg-[#180e22] max-sm:rounded-[4vw] p-[1.5vw] max-sm:p-[4vw] w-full rounded-[1vw]">
            <div className="h-[10%]">
              <p className="text-[#D2C2E6] max-sm:text-[3vw] font-DMM uppercase text-[.8vw]">
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
              <p className="text-[2.5vw] text-transparent bg-gradient-to-b from-[#ffdada] to-[#5f20e4] bg-clip-text font-semibold text-left max-sm:text-[6vw]">
                all heartbeats,
              </p>
              <p className="text-[2.5vw] max-sm:text-[6vw]  text-transparent bg-gradient-to-b from-[#ffdada] to-[#5f20e4] bg-clip-text font-semibold text-right">all week.</p>
            </div>
          </div>

          {/* Location Image Block */}
          <div className="h-[50%] max-sm:h-[100%] overflow-hidden relative w-full max-sm:rounded-[4vw] rounded-[1vw]">
            <div className="w-full h-full">
              <img
                className="w-full h-full object-cover"
                src="https://keikku.health/_ipx/f_webp&s_1200x956/imgs/snippets-map.png"
                alt="battery"
                width={1000}
                height={1000}
              />
            </div>

            <div className="w-full h-full p-[1.5vw] max-sm:p-[4vw] absolute top-0 left-0 justify-between flex flex-col">
              <p className="text-[#D2C2E6] max-sm:text-[3vw] font-DMM uppercase text-[.8vw]">
                Last location
              </p>
              <p className="text-[#D2C2E6] max-sm:text-[3vw] max-sm:w-[100%] max-sm:pb-[3vw] font-semibold leading-[1.1] text-[1.2vw] w-[70%]">
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
