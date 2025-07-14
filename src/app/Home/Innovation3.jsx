"use client";
import React, { useEffect, useRef } from "react";
import { Rive } from "@rive-app/canvas";

export default function Innovation3() {
  const canvasRef = useRef(null);
  const riveInstance = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      riveInstance.current = new Rive({
        src: "/Riv/sound-wave.riv", // ✅ replace with your actual Rive file path
        canvas: canvasRef.current,
        autoplay: false,
        onLoad: () => {
          riveInstance.current.play({ loop: "loop" });
        },
      });
    }

    return () => {
      riveInstance.current?.cleanup();
    };
  }, []);

  return (
    <div className="h-screen w-full bg-[#1E1328] flex items-center py-[2vw] max-sm:px-[4vw] px-[20vw] justify-center">
      <div className="h-full w-full flex max-sm:flex-col-reverse items-center gap-[1vw] justify-center">
        {/* Left Block with Rive */}
        <div className="h-full flex flex-col items-center justify-between bg-gradient-to-b p-[2.5vw] from-[#EFC7DB] to-[#692CE4] w-[40%] rounded-[1vw]">
          <div className="h-[20%] w-full flex items-center justify-center">
            <p className="text-white font-bold text-[2.5vw] leading-[1.2]  w-[50%] text-center">
              Wireless Superior Audio
            </p>
          </div>
          <div className="h-[60%] w-full flex items-center justify-center">
            <canvas
              ref={canvasRef}
              width={300}
              height={300}
              className="w-[80%] object-contain h-[80%]"
            ></canvas>
          </div>
          <div className="h-[20%] w-full flex flex-col gap-[1vw] items-center justify-center">
            <div className="w-[10vw] h-[10vw] flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="42"
                height="42"
                viewBox="0 0 42 42"
                fill="none"
              >
                <circle cx="21" cy="21" r="21" fill="white"></circle>
                <path
                  d="M16 16.7L26 24.775L20.7619 30V11L26 16.225L16 24.3"
                  stroke="#976FE5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
            <p className="text-white font-bold text-[1.5vw] leading-[1.2] w-full text-center">
              Bluetooth enabled headphone, earphone or speaker
            </p>
          </div>
        </div>

        {/* Right Side Content */}
        <div className="h-full flex max-sm:w-full gap-[1vw] flex-col w-[60%]">
          {/* Top Image Block */}
          <div className="h-[50%] relative w-full rounded-[1vw] overflow-hidden">
            <div className="w-full h-full">
              <img
                src="https://keikku.health/_ipx/w_1800&f_webp/imgs/snippets-sharing.png"
                className="w-full h-full object-cover"
                alt="img"
              />
            </div>
            <div className="w-full h-full absolute flex flex-col gap-[1vw] items-start justify-center bg-gradient-to-r from-black to-transparent p-[2vw] inset-0 z-10">
              <p className="text-[2.5vw] w-[40%] leading-[1.1] text-[#D2C2E6] font-bold">
                Sharing, Recording & Streaming
              </p>
              <p className="text-[1.5vw] w-[40%] leading-[1.1] text-[#D2C2E6] font-bold">
                Embedded telemedicine at your fingertips
              </p>
            </div>
          </div>

          {/* Bottom Pocket Clip Block */}
          <div className="h-[50%] flex w-full rounded-[1vw] overflow-hidden bg-[#180E22]">
            <div className="w-[60%] h-full flex flex-col gap-[1vw] p-[2vw]">
              <p className="font-DMM text-transparent bg-gradient-to-b from-[#ffdada] to-[#5f20e4] bg-clip-text uppercase text-[.7vw]">
                Pocket Clip
              </p>
              <p className="text-transparent bg-gradient-to-b from-[#ffdada] to-[#5f20e4] bg-clip-text text-[2.5vw] leading-[1.1] font-bold w-full">
                Store your Keikku in your pocket or on your clip
              </p>
            </div>
            <div className="w-[40%] h-full flex items-center p-[2vw] justify-end bg-gradient-to-l from-[#2E1B36] to-transparent">
              <img
                src="https://keikku.health/_ipx/_/imgs/snippets-pocket-clip.png"
                className="w-full h-auto object-cover"
                alt="img"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
