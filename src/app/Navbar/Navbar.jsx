"use client";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";

export default function Navbar() {
  const [active, setActive] = useState("Keikku");
  const [hoveredItem, setHoveredItem] = useState(null);
  const sliderRef = useRef(null);

  // Handle slider animations
  useEffect(() => {
    const targetElement = hoveredItem
      ? document.querySelector(`[data-nav="${hoveredItem}"]`)
      : document.querySelector(`[data-nav="${active}"]`);

    if (targetElement && sliderRef.current) {
      gsap.to(sliderRef.current, {
        x: targetElement.offsetLeft,
        width: targetElement.offsetWidth,
        duration: 0.1,
        ease: "power2.out", // Changed to smoother easing
      });
    }
  }, [active, hoveredItem]);

  // Initial animation
  useEffect(() => {
    gsap.fromTo("#nav-bar",
      {
        y: "150%",
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <div
      id="nav-bar"
      className="fixed overflow-hidden opacity-0 translate-y-[150%] bottom-[5%] max-sm:bottom-[2%] z-[999] left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-[.3vw]"
    >
      <div className="w-fit max-sm:hidden flex items-center gap-2 sm:gap-[.8vw] px-3 sm:pl-[.8vw] sm:pr-[.3vw] py-2 sm:py-[0.3vw] bg-white rounded-full">
        <div className="w-[32px] sm:w-[3vw] h-auto">
          <svg
            width="67"
            height="35"
            viewBox="0 0 67 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
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
        <div className="flex items-center relative rounded-full">
          <div
            ref={sliderRef}
            className="absolute bg-[#2f32471a] h-full rounded-full transition-all"
          />
          {["Keikku", "Discover", "App"].map((item, index) => (
            <div
              key={index}
              data-nav={item}
              onClick={() => setActive(item)}
              onMouseEnter={() => setHoveredItem(item)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`text-sm sm:text-[0.85vw] relative text-center py-2 sm:py-[0.6vw] px-3 sm:px-[1.2vw] font-medium text-[#808699] tracking-wide hover:text-[#2F3247] transition-colors ${
                active === item ? "text-[#2F3247]" : ""
              }`}
            >
              <Link href="#">{item}</Link>
            </div>
          ))}
        </div>
      </div>
      <div className="backdrop-blur-[4px] hover:bg-[#2f3247] hover:text-white transition-all duration-300 bg-background/20 flex items-center justify-center border-zinc-700/50 border px-4 sm:px-[1.5vw] max-sm:px-[6vw] py-2 sm:py-[.9vw] max-sm:py-[3.5vw] rounded-full cursor-pointer">
        <p className="text-sm sm:text-[.8vw] tracking-wide whitespace-nowrap">Contact us</p>
      </div>
    </div>
  );
}
