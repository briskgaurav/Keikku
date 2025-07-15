"use client";
import React, { useEffect } from "react";
import WavyBackgroundSection from "./Water";
import WavyShader from "./Water";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".footer",
          start: "30% bottom",
          end: "bottom bottom",
          // markers:true,
          scrub: 1,
        },
      });

      tl.fromTo(
        "#footer-anim",
        {
          scale: 1.05,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 2,
          delay: 1,
          ease: "linear",
        }
      );

      tl.fromTo(
        "#footer-img",
        {
          y: "100%",
          opacity: 0,
        },
        {
          y: "0%",
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
        },
        "-=0.5"
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="footer h-screen overflow-hidden flex-col w-full bg-[#F4FBFF] pb-[2vw] pt-[5vw] gap-[5vw] flex items-center justify-start relative">
      <div className="h-screen w-full absolute inset-0">
        <WavyShader />
      </div>
      <div className="h-full w-full">
        <div className=" flex items-end translate-y-[2%] z-[0] absolute inset-0 justify-center h-full w-full">
          <div
            id="footer-img"
            className="w-[40vw] max-md:w-[60vw] max-sm:w-[80vw] h-fit "
          >
            <img
              src="https://keikku.health/_ipx/f_webp&s_1700x749/imgs/footer-device.png"
              alt="footer-bg"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="w-full z-[5] h-full flex flex-col items-center gap-[5vw]">
          <div className="w-[10vw] max-md:w-[15vw] max-sm:w-[20vw] max-sm:h-[10%] max-md:h-fit max-md:py-[2vw] h-[20%] z-[50] flex items-center justify-center">
            <svg
              width="67"
              height="35"
              viewBox="0 0 67 35"
              fill="none"
              className="w-full h-full object-contain"
            >
              <path
                d="M22.3477 23.0911C22.3477 10.604 32.3355 0.481934 44.657 0.481934C56.9785 0.481934 66.9663 10.604 66.9663 23.0911H22.3477Z"
                fill="#2F3247"
              ></path>
              <path
                d="M0 23.0916C0 29.3481 5.00326 34.4188 11.1764 34.4188C17.3496 34.4188 22.3529 29.3481 22.3529 23.0916H0Z"
                fill="#2F3247"
              ></path>
            </svg>
          </div>
          <p
            id="footer-anim"
            className="text-[#2F3247] max-md:text-[4vw] max-sm:text-[6vw] text-[2.5vw] leading-[1.15] w-[50%] max-md:w-[55%] max-sm:w-[60%] text-center font-semibold"
          >
            Sign up to receive news, promotions, guides and tips!
          </p>
          <div
            placeholder="Enter your e-mail address"
            className="bg-zinc-200/50 max-md:bg-blue-500/10 max-sm:bg-blue-500/10 placeholder:text-zinc-500 placeholder:text-[1vw] backdrop-blur-[5px] w-[25%] max-md:w-[60%] max-sm:w-[90%] max-sm:h-[7vh] max-md:h-[6vh] h-[9vh] rounded-full flex p-[1vw] max-md:p-[2vw] max-sm:p-[3vw] items-center justify-between"
          >
            <p className="text-[#2F3247]/50 max-md:text-[2vw] max-sm:text-[3vw] max-sm:px-[6vw] max-md:px-[3vw] px-[1vw] text-[.9vw] ">
              Enter your e-mail address
            </p>
            <div className="w-[2.5vw] max-md:w-[6vw] max-sm:w-[10vw] relative overflow-hidden cursor-pointer group max-md:h-[6vw] max-sm:h-[10vw] h-[2.5vw] bg-white rounded-full flex items-center justify-center">
              <p className="text-blue-500 group-hover:translate-x-[250%] group-hover:opacity-0 opacity-100 transition-all duration-300 translate-x-0 text-[.8vw] max-md:text-[2vw] max-sm:text-[3vw] ">
                →
              </p>
              <p className="text-blue-500 opacity-0 group-hover:opacity-100 absolute group-hover:translate-x-0 transition-all duration-300 translate-x-[-250%] text-[.8vw] max-md:text-[2vw] max-sm:text-[3vw] ">
                →
              </p>
            </div>
          </div>
          <div className="h-fit  w-full  mt-[3vw] text-[#2F3247] text-[.8vw] px-[2.5vw] max-md:px-[5vw] max-sm:px-[10vw] max-md:mt-[6vw] max-sm:mt-[10vw] flex items-center max-md:items-start justify-between">
            {[
              {
                title: "Our Story",
                links: ["Our Story", "Careers", "Linkedin", "Instagram"],
              },
              {
                title: "Legal",
                links: [
                  "Privacy Policy",
                  "Terms of Service",
                  " ",
                  "Made by Gaurav",
                ],
              },
            ].map((section, index) => (
              <div key={index}>
                <p className="opacity-50 uppercase font-DMM max-md:text-[2vw] max-sm:text-[3vw] text-[.8vw] mb-[.5vw] max-md:mb-[2vw] max-sm:mb-[3vw]">
                  {section.title}
                </p>
                {section.links.map((link, i) => (
                  <div
                    className="flex group w-fit relative cursor-pointer items-center gap-[.5vw]"
                    key={i}
                  >
                    <p className="text-[#2F3247] max-md:text-black max-sm:text-black max-md:text-[2vw] max-sm:text-[3vw] text-[.8vw]">{link}</p>
                    <div
                      className="h-[1px] absolute bottom-0 left-0 bg-[#2F3247] rounded-full 
                              w-full scale-x-0 group-hover:scale-x-100
                              origin-right group-hover:origin-left 
                              transition-transform duration-300 ease-in-out"
                    ></div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
