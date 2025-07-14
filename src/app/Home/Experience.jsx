"use client";

import React, { useEffect, useRef } from "react";
import { Rive } from "@rive-app/canvas";
import { TextAnimation } from "../Components/Animation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
export default function Experience() {
  const canvasRefs = useRef([]);
  const riveInstances = useRef([]);

  const riveFiles = [
    "/Riv/waves2.riv",
    "/Riv/waves1.riv",
    "/Riv/waves3.riv",
    "/Riv/waves4.riv",
    "/Riv/waves5.riv",
    "/Riv/waves6.riv",
  ];

  const captions = [
    "Crop and annotate",
    "Listen to Cardiovascular, Lung and gastrointestinal Sound",
    "Record, stream and share sounds",
    "Gesture control",
    "Activate noise cancellation",
    "Cloud security, HIPAA, compliant and cyber secure",
  ];

  useEffect(() => {
    // Initialize each Rive instance
    riveFiles.forEach((src, i) => {
      if (canvasRefs.current[i]) {
        const rive = new Rive({
          src,
          canvas: canvasRefs.current[i],
          autoplay: false,
          loop: true,
        });
        riveInstances.current.push(rive);
      }
    });
    const ctx = gsap.context(() => {
      TextAnimation("experience1");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#experience",
          start: "-20% top",
          end: "bottom top",
        
        },
      });
      
      // Label for timing control
      tl.add("start")
      
      // Scale animation for boxes
      tl.fromTo(
        ".experience-boxes",
        {
          scaleY: 0.5,
          transformOrigin: "top",
        },
        {
          scaleY: 1,
          duration: 1,
          ease: "power4.out",
          stagger: 0.15,
        },
        "start"
      );
      
      // Fade-in for overlay boxes
      tl.to(
        ".box-op",
        {
          opacity: 1,
          duration: 1,
          ease: "linear",
          stagger: 0.15,
        },
        "start+=0.4"
      );
      
      // Fade-in for box text
      tl.to(
        ".box-txt",
        {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          stagger: 0.15,
        },
        "<"
      );
      
    });

    return () => {
      ctx.revert();
      riveInstances.current.forEach((rive) => rive?.cleanup());
    };
  }, []);

  const handleMouseEnter = (index) => {
    if (riveInstances.current[index]) {
      riveInstances.current[index].play();
    }
  };

  const handleMouseLeave = (index) => {
    if (riveInstances.current[index]) {
      riveInstances.current[index].pause();
    }
  };

  return (
    <div
      id="experience"
      className="h-screen max-sm:h-fit max-sm:py-[15vw] w-full flex-col flex items-center justify-center gap-[3vw] max-sm:gap-[8vw]"
    >
      <div className="w-full flex items-center justify-center h-fit">
        <h2
          id="experience1"
          className="text-[2.5vw] max-sm:text-[6vw] max-sm:w-[70%] text-center leading-[1.1] font-bold"
        >
          Your experience with Keikku
        </h2>
      </div>
      <div className="flex max-sm:flex-wrap h-fit w-[80%] items-center justify-between max-sm:w-[90%] gap-[1vw]">
        {riveFiles.map((_, index) => (
          <div
            key={index}
            className="h-[50vh] max-sm:h-[30vh] max-sm:w-[31%] experience-boxes w-[48%] p-[1.2vw] max-sm:p-[2.5vw] flex flex-col items-center justify-evenly bg-[#1c1e31] rounded-full"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <div className="w-full box-op rounded-full overflow-hidden  opacity-0 h-[60%]">
              <canvas
                ref={(el) => (canvasRefs.current[index] = el)}
                width="240"
                height="382"
                className="w-full object-fill h-full"
              ></canvas>
            </div>
            <div className="w-full h-[30%] py-[1vw] flex items-center justify-center box-txt opacity-0 p-[1vw] ">
              <p className="text-[.85vw] max-sm:text-[3vw] text-white leading-[1.1] text-center max-sm:font-normal font-semibold">
                {captions[index]}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
