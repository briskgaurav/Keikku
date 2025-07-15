"use client";
import React, { useEffect, useRef } from "react";
import { Rive } from "@rive-app/canvas";

export default function InnovationTablet() {
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
    <div className="h-fit w-full bg-[#1E1328] flex items-center pb-[15vw] px-[5vw] justify-center">
      <div className="h-full w-full flex flex-col items-center gap-[3vw] justify-center">
        {/* Left Block with Rive */}

        <div className="h-[35vh] relative w-full rounded-[3vw] overflow-hidden">
          <div className="w-full h-full">
            <img
              src="https://keikku.health/_ipx/w_1800&f_webp/imgs/snippets-sharing.png"
              className="w-full h-full object-cover"
              alt="img"
            />
          </div>
          <div className="w-full h-full absolute flex flex-col gap-[3vw] items-start justify-start bg-gradient-to-r from-black to-transparent p-[5vw] py-[6vw] inset-0 z-10">
            <p className="text-[5vw] w-[60%] leading-[1.1] text-[#D2C2E6] font-bold">
              Sharing, Recording & Streaming
            </p>
            <p className="text-[3vw] w-[30%] leading-[1.1] text-[#D2C2E6] font-bold">
              Embedded telemedicine at your fingertips
            </p>
          </div>
        </div>

        {/* Right Side Content */}
        <div className="h-fit flex w-full gap-[3vw]  flex-row  ">
          <div className="h-[40vh] flex flex-col items-center  bg-gradient-to-b p-[2.5vw] from-[#EFC7DB] to-[#692CE4] w-[100%] rounded-[4vw]">
            <div className="h-[30%] w-full flex items-center justify-center">
              <p className="text-white font-bold text-[4vw] leading-[1.2]  w-[80%] text-center">
                Wireless Superior Audio
              </p>
            </div>
            <div className="h-[40%] w-full  flex items-center justify-center">
              <canvas
                ref={canvasRef}
                width={300}
                height={300}
                className="w-full z-[10] object-contain h-full"
              ></canvas>
            </div>
            <div className="h-[30%] pb-[2vw] w-full flex flex-col gap-[3vw] items-center justify-center">
              <div className="w-[15vw] h-[15vw] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="42"
                  height="42"
                  viewBox="0 0 42 42"
                  fill="none"
                  className="max-md:w-[5vw] max-md:h-[5vw]"
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
              <p className="text-white font-bold text-[3vw] leading-[1.2] w-full text-center">
                Bluetooth enabled headphone, earphone or speaker
              </p>
            </div>
          </div>

          {/* Bottom Pocket Clip Block */}
          <div className="h-[40vh] flex flex-col w-full items-center justify-center rounded-[3vw] p-[4vw] overflow-hidden bg-[#180E22]">
            <div className="w-full h-full flex flex-col gap-[3vw] ">
              <p className="font-DMM text-transparent bg-gradient-to-b from-[#ffdada] to-[#5f20e4] bg-clip-text uppercase text-[2.5vw]">
                Pocket Clip
              </p>
              <p className="text-transparent bg-gradient-to-b from-[#ffdada] to-[#5f20e4] bg-clip-text text-[4vw] leading-[1.1] font-bold w-full">
                Store your Keikku in your pocket or on your clip
              </p>
            </div>
            <div className="w-[60%] py-[5vw] h-full flex items-center p-[2vw] justify-end ">
              <img
                src="https://keikku.health/_ipx/_/imgs/snippets-pocket-clip.png"
                className="w-full h-full object-contain"
                alt="img"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
