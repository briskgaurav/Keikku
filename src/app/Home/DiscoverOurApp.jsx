"use client";
import React, { useEffect } from "react";
import gsap from "gsap";
import { TextAnimation } from "../Components/Animation";

const productSpecs = [
  {
    category: "Weight",
    value: "4.2 ounces (100 grams)",
  },
  {
    category: "Lights",
    value: "LED",
  },
  {
    category: "Splash, Water, Dust Resistance",
    value: "IP44 (Splash resistant)",
  },
  {
    category: "Microphone",
    value: "MEMS IM69D130",
  },
  {
    category: "Bluetooth",
    value: "LE 5.2",
  },
  {
    category: "Power and Battery",
    value:
      "Built-in Rechargeable Lithium-ion Battery, Qi wireless charging 7.5W, Duration 72h",
  },
  {
    category: "Sensors",
    value:
      "High dynamic range gyroscope, Accelerometer, Proximity sensor, Ambient microphone",
  },
  {
    category: "Audio Playback",
    value: "Active Noise Cancellation",
  },
  {
    category: "System Requirements",
    value: "iOS version 16 and above, Android version 12 and above",
  },
];

const cards = [
  {
    src: "https://keikku.health/_ipx/f_webp&s_900x1786/imgs/discover-app-5.png",
    zIndex: 1,
    rotate: -10,
    translateX: "-115%",
    translateY: "-3%",
  },
  {
    src: "https://keikku.health/_ipx/f_webp&s_900x1786/imgs/discover-app-4.png",
    zIndex: 2,
    rotate: -5,
    translateX: "-50%",
    translateY: "0%",
  },
  {
    src: "https://keikku.health/_ipx/f_webp&s_900x1786/imgs/discover-app-3.png",
    zIndex: 3,
    rotate: 0,
    translateX: "45%",
    translateY: "-3%",
  },
  {
    src: "https://keikku.health/_ipx/f_webp&s_900x1786/imgs/discover-app-2.png",
    zIndex: 4,
    rotate: 5,
    translateX: "100%",
    translateY: "-9%",
  },
];

export default function DiscoverOurApp() {
  useEffect(() => {
    const ctx = gsap.context(() => {

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".discover-app-card",
          start: "-50% top",
          end: "bottom top",
          // scrub: true,
          markers: true,
        },
      })
      tl.to("#header-keikku", {
        opacity: 1,
        duration: 1,
        ease: "linear",
      })

      tl.from('.cards-container', {
        opacity: 0,
        duration: 1,
        ease: "linear",
        stagger: 0.2,
      })
      tl.to("#header-keikku", {
        opacity: 0,
        duration: 1,
        ease: "linear",
      })
      tl.to(".discover-app-card", {
        transform: (i) => `rotate(${cards[i].rotate}deg) translateX(${cards[i].translateX}) translateY(${cards[i].translateY})`,
        duration: 1,
        ease: "power2.out",
        stagger: 0.1
      });
    });
    return () => {
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    TextAnimation("discoverApp");
  }, []);
  return (
    <div className="h-fit w-full relative overflow-hidden bg-[#12131D] text-[#D2C2E6] py-[5vw] px-[15vw] max-md:px-[5vw] max-sm:px-[5vw] max-sm:py-[15vw]">
      <h2 id="discoverApp" className="text-[5vw] max-md:text-[10vw] max-sm:text-center max-sm:text-[10vw]  font-bold">
        Discover our app
      </h2>
      <div className=" w-full flex items-center max-sm:mt-[2vw] max-sm:mb-[5vw] max-sm:justify-center max-md:justify-start justify-end">
        <p
          id="discoverApp"
          className="text-[1.3vw] max-md:text-[2.5vw] max-md:w-[80%] max-sm:text-[4vw] max-sm:text-center max-sm:w-[80%] font-bold leading-[1.2] w-[42%]"
        >
          Step into the future of auscultation with our cutting-edge app. Join
          us and explore the realm of enhanced diagnostics, seamless data
          management, and collaboration like never before.
        </p>
      </div>
      <div
          id="header-keikku"
          className="absolute max-sm:hidden  inset-1/2 -translate-x-1/2 opacity-0 -translate-y-[73%] max-sm:w-[50vw] max-sm:h-[50vw] w-[32vw] h-[32vw] z-[999]"
        >
          <img
            src="https://keikku.health/_ipx/f_webp&s_900x1786/imgs/discover-app-1.png"
            alt="header-keikku"
            className="w-full h-full max-md:hidden object-contain"
          />
        </div>
      <div className="h-[100vh] max-md:h-[80vh] max-sm:h-[60vh] cards-container w-full flex items-center relative justify-center py-[5vw]">
      
        {cards.map((image, index) => (
          <div
            key={index}
            className="w-[16vw] max-sm:w-[40vw] max-md:w-[40vw] h-auto absolute z-[100] discover-app-card"
            style={{
              zIndex: image.zIndex,
              transform: `translateX(0) translateY(0)`,
            }}
          >
            <img
              className="w-full h-full object-cover"
              src={image.src}
              alt=""
            />
          </div>
        ))}
      </div>
      <div className="w-full h-fit py-[3vw] max-md:py-[5vw]   flex items-start justify-center flex-col">
        <p className="text-[2.7vw] max-sm:px-[5vw] max-md:text-[7vw] max-md:mb-[5vw] max-md:w-[50%] max-sm:text-[6vw] mb-[2vw] w-[20%] leading-[1.1] font-bold">
          Product Specifications
        </p>
        <div className="h-[35vh] max-md:h-fit max-md:py-[5vw] max-sm:h-fit  max-sm:mt-[8vw]  w-full flex flex-col flex-wrap max-sm:gap-[2.5vw] max-md:gap-[2.5vw] max-sm:px-[5vw] gap-[.5vw]">
          {productSpecs.map((spec, index) => (
            <div
              key={index}
              className="w-[50%] max-md:w-[100%] max-md:px-[5vw]  max-sm:w-[100%] h-fit flex items-center gap-4vw max-md:gap-[10vw] max-sm:gap-[10vw]"
            >
              <p className="text-[.85vw] max-md:text-[3vw] max-sm:text-[3.5vw] opacity-50 w-[30%] font-semibold">
                {spec.category}
              </p>
              <p className="text-[.9vw] max-md:text-[3vw] max-sm:text-[3.5vw] w-[52%] text-white">{spec.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
