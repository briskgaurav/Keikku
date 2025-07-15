"use client";
import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import UseMobile from "../Hooks/IsMobile";
gsap.registerPlugin(ScrollTrigger);

const data = [
  {
    video:
      "https://burospaces1.fra1.cdn.digitaloceanspaces.com/keikku/card-smart.mp4#t=0.01",
    title: "Smart Diagnosis",
  },
  {
    video:
      "https://burospaces1.fra1.cdn.digitaloceanspaces.com/keikku/card-volume.mp4#t=0.01",
    title: "Touch and Gestures Control",
  },
];

export default function Features() {
  const isMobile = UseMobile();
  useEffect(() => {
    const ctx = gsap.context(() => {
      const features = document.getElementById("features");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#features",
          start: "top top",
          end: isMobile ? "+4000 top" :  "+7000 top",
          // markers: true,
          pin: true,
          scrub: true,
          onLeave: () => {
            gsap.set("#Sequence", {
              opacity: 0,
            });
            gsap.set("#Sequence2", {
              opacity: 1,
            });
          },
          onEnterBack: () => {
            gsap.set("#Sequence", {
              opacity: 1,
            });
            gsap.set("#Sequence2", {
              opacity: 0,
            });
          },
        },
      });
      tl.to(".blurBg", {
        opacity: 0,
      });
      tl.to(".feature-video", {
        opacity: 1,
        duration: 2,
        ease: "linear",
      });
      tl.to(".feature-card", {
        opacity: 1,
        scale: 1,
        stagger: 0.1,
        duration: 2,
      });
      tl.to(
        ".feature-card",
        {
          y: isMobile ? "-200%" : "-350%",
          stagger: isMobile ? 0.1 : 0.4,
          duration: 3,
          opacity: isMobile ? 0 : 1,
        },
        "<+.2"
      );
      tl.to(
        ".feature-card2",
        {
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          duration: 2,
        },
        "<+1"
      );
      tl.to(
        ".feature-card2",
        {
          y: "-200%",
          stagger: isMobile ? 0.1 : 0.4,
          duration: 3,
          onComplete: () => {
            gsap.to("#pulse", {
              display: "hidden",
              duration: 1,
              ease: "linear",
            });
          },
        },
        "<+.2"
      );
    });
    return () => {
      ctx.revert();
    };
  }, []);
  return (
    <div id="features" className="h-screen overflow-hidden w-full relative">
      <div className="z-[100] flex items-center justify-between p-[8vw] max-md:p-[5vw] max-sm:p-[2.5vw] h-full w-full">
        {data.map((item, index) => (
          <div
            key={index}
            className={`p-[1vw] max-md:p-[2vw] max-sm:p-[3vw] scale-[.9] feature-card opacity-0 max-md:opacity-100 py-[1.5vw] bg-white w-[12.5%] max-md:w-[30%] max-sm:w-[30%] rounded-full translate-y-[200%] max-md:translate-y-[200%] flex items-center justify-center ${
              index === 1 ? "translate-y-[100%]" : ""
            } gap-[1vw] h-[44vh] max-md:h-[30vh] max-sm:h-[25vh] flex-col`}
          >
            <div className="h-full overflow-hidden rounded-full w-full">
              <video
                playsInline
                src={item.video}
                autoPlay
                muted
                loop
                className="h-full rounded-full w-full object-cover"
              />
            </div>
            <p className="text-[.9vw]  max-md:py-[2vw]  max-md:text-[2.2vw] max-sm:py-[2vw] max-sm:text-[3vw] leading-[1.1] font-bold w-[95%] text-center text-background">
              {item.title}
            </p>
          </div>
        ))}
      </div>
      <div className="z-[100] feature-card2 translate-y-[100%] opacity-0 absolute top-0 left-0 flex items-center justify-between p-[8vw] max-md:p-[5vw] max-sm:p-[2.5vw] h-full w-full">
        {data.map((item, index) => (
          <div
            key={index}
            className={`p-[1vw] max-md:p-[2vw] max-sm:p-[3vw] scale-[.9] py-[1.5vw] bg-white w-[12.5%] max-md:w-[30%] max-sm:w-[30%] rounded-full flex items-center justify-center gap-[1vw] h-[44vh] max-md:h-[30vh] max-sm:h-[25vh] flex-col ${
              index === 1 ? "translate-y-[100%]" : ""
            }`}
          >
            <div className="h-full overflow-hidden rounded-full w-full">
              <video
                src={item.video}
                autoPlay
                muted
                loop
                preload="auto"
                loading="lazy"
                playsInline
                className="h-full rounded-full w-full object-cover"
              />
            </div>
            <p className="text-[.9vw] max-md:text-[2.2vw] max-md:py-[2vw] max-sm:py-[2vw] max-sm:text-[3vw] leading-[1.1] font-bold w-[95%] text-center text-background">
              {item.title}
            </p>
          </div>
        ))}
      </div>
      <div className="h-full feature-video opacity-0 absolute z-[-1] top-0 left-0 w-full">
        <video
          src="https://burospaces1.fra1.cdn.digitaloceanspaces.com/keikku/circles-start.mp4#t=0.5"
          autoPlay
          muted
          preload="auto"
          loading="lazy"
          loop
          playsInline
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
