"use client";
import React, { useEffect, useRef } from "react";
import { Rive } from "@rive-app/canvas";
import gsap from "gsap";
import { TextAnimation } from "../Components/Animation";
import Sequence2 from "./Sequence2";
import Info from "./Info";
export default function MeetKeikku() {
  
  const riveRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      TextAnimation("Meet-Kikku2");
      const rivFiles = [
        "/Riv/picto1.riv",
        "/Riv/picto2.riv",
        "/Riv/picto3.riv",
        "/Riv/picto4.riv",
      ];
      // Load all 4 Rive instances
      riveRefs.current.forEach((ref, index) => {
        if (ref) {
          new Rive({
            src: rivFiles[index],
            canvas: ref,
            autoplay: true,
            stateMachines: ["State Machine 1"], // optional: your SM name
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="Meet-Kikku" className="h-fit relative w-[70%] max-sm:py-[15vw] max-sm:w-[90%] mx-auto py-[5vw]">
      <h2
        id="Meet-Kikku"
        className="text-[3.8vw] max-sm:text-[8vw] max-sm:w-[90%] bg-amber-600-red w-[60%] text-left  leading-[1.1] font-bold"
      >
        Meet Keikku — your new medical superpower.
      </h2>

      <div id="Meet-Kikku2" className="flex flex-wrap max-sm:mt-[10vw] h-full mt-[4.5vw] gap-[2vw] w-full">
        {[1, 2, 3, 4].map((item, index) => (
          <div key={index} className="h-full flex flex-col w-[45%]">
            <div className="w-full h-full">
              <div className="h-[8vh] w-full  flex gap-[1vw] items-center">
                <div className="w-[2vw] max-sm:w-[10vw] max-sm:h-[10vw] h-[3.2vw] rounded-full overflow-hidden">
                  <canvas
                    ref={(el) => (riveRefs.current[index] = el)}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="uppercase text-[.7vw] text-left w-[5%] leading-none font-DMM max-sm:text-[3vw] tracking-wider">
                  Auscultation Mode
                </p>
              </div>
              <div className="w-full max-sm:w-[100%] h-1 mt-[1vw] bg-zinc-600 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
      {/* <Info /> */}
    </section>
  );
}
