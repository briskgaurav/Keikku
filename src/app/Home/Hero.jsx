"use client";
import React, { useEffect, useRef } from "react";
import Header from "./Header";
import Features from "./Features";
import gsap from "gsap";

export default function Hero() {
  const beatBlur = useRef(null);
  const beatText = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const beatTimeline = gsap.timeline({
        repeat: -1,
        defaults: {
          duration: 1,
          ease:"expo.out",
        },
      });

      beatTimeline.fromTo(
        beatText.current,
        {
          letterSpacing: "-2px",
        },
        {
          letterSpacing: "0px",
        }
      );
      beatTimeline.to(
        beatBlur.current,
        {
          scaleY: 1.5,
          opacity: 0.3,
          delay:-.5,
        },
        "<"
      );

      beatTimeline.to(beatBlur.current, {
        opacity: 0,
        scale: 1,
      });

      beatTimeline.fromTo(
        beatText.current,
        {
          letterSpacing: "0px",
        },
        {
          letterSpacing: "-2px",
        }
      );

      gsap.fromTo(
        ".hero-text",
        {
          opacity: 0,
          y: "-20%",
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "linear",
          stagger: 0.1,
          onUpdate:()=>{
            gsap.to("#canvas1", {
              scale: 1,
              y: 0,
              duration: 1,
              ease: "none",
            });
          }
        }
      );
      // gsap.to("#hero", {
      //   y: "-110%",
      //   duration: 4,
      //   opacity: 0,
      //   ease: "linear",
      //   scrollTrigger: {
      //     trigger: "#hero",
      //     start: "top top",
      //     end: "bottom top",
      //     pin: true,
      //     scrub: true,
      //   },
        
      // });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="h-fit  relative w-full">
      <div id="hero" className="-mt-[100vh]">
        <Header />
        <div className="h-screen  w-full flex flex-col items-center justify-between">
          <div className="w-full h-fit ">
            <h1 className="text-[5.5vw] hero-text pt-[2vw] font-bold text-center bg-gradient-to-b from-[#14bcff] tracking-tight leading-[1.2] via-[#14bcff] to-[#224aff] text-transparent bg-clip-text">
            Don’t miss a{" "}
              <span className="w-full h-full relative">
                <div
                  ref={beatBlur}
                  className="bg-gradient-to-b scale-0 from-purple-400 via-blue-600 to-[#224aff] opacity-0 z-[-1] absolute top-0 left-0 w-[15vw] translate-x-[-15%] blur-md h-full"
                ></div>
                <span
                  ref={beatText}
                  className="bg-gradient-to-b from-[#14bcff] via-[#14bcff] to-[#224aff] text-transparent bg-clip-text"
                >
                  beat
                </span>
              </span>
            </h1>

            <p className="paragraph hero-text ">
              Keikku, our next generation digital stethoscope
            </p>
          </div>
          <div className="w-[55%] h-fit flex flex-col items-center gap-[1vw] ">
            <p className="text-[.8vw] text-[#808699]/30 font-bold font-DMM">
              AS SEEN IN
            </p>
            <div className="flex items-center justify-between w-full">
              {[
                {
                  url: "https://keikku.health/_ipx/f_webp&s_1700x527/imgs/header-logo-dark-1.png",
                  width: "9vw",
                },
                {
                  url: "https://keikku.health/_ipx/f_webp&s_1700x730/imgs/header-logo-dark-2.png",
                  width: "8vw",
                },
                {
                  url: "https://keikku.health/_ipx/f_webp&s_1700x877/imgs/header-logo-dark-3.png",
                  width: "7vw",
                },
                {
                  url: "https://keikku.health/_ipx/f_webp&s_1700x1390/imgs/header-logo-dark-4.png",
                  width: "5vw",
                },
                {
                  url: "https://keikku.health/_ipx/f_webp&s_1700x966/imgs/header-logo-dark-5.png",
                  width: "6vw",
                },
              ].map((item, index) => (
                <div
                  style={{ width: item.width }}
                  key={index}
                  className={` opacity-80 h-[6vw]`}
                >
                  <img
                    src={item.url}
                    alt=""
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* <Features /> */}
      </div>
    </section>
  );
}
