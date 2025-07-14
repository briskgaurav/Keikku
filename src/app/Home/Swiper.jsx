"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { TextAnimation } from "../Components/Animation";

export default function Swiper() {

  useEffect(() => {
    TextAnimation("unlock-swiper")
  }, [])
  


  const swiperRef = useRef(null);

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };
  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const [hover, setHover] = useState(null);

  const videos = [
    "1011325759",
    "1011351038",
    "1011345846",
    "1011338622",
    "1014352509",
  ];


  return (
    <div className="h-fit w-full py-[5vw] max-sm:py-[15vw] bg-[#1E1328] flex items-center justify-center">
      <div className="h-full w-full">
        {/* Header Text */}
        <div className="w-full h-full">
          <p className="text-[2.5vw] unlock-swiper px-[15vw] max-sm:px-[5vw] max-sm:text-[6vw] max-sm:w-[100%] leading-[1.3] w-[65%] font-bold font-left bg-clip-text text-transparent max-sm:leading-[1.1] bg-gradient-to-b from-[#ffdada] to-[#5f20e4]">
            Unlock powerful insights with the most advanced stethoscope.
          </p>
        </div>

        {/* Swiper Container */}
        <div className="mt-[4vw] w-full relative">
          {/* Left Arrow */}
          {activeIndex > 0 && (
            <div
              onClick={handlePrev}
              className="custom-prev absolute left-[10vw] top-1/2 z-10 -translate-y-1/2 cursor-pointer text-zinc-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-[3vw] h-[3vw]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </div>
          )}

          {/* Right Arrow */}
          {activeIndex < videos.length - 1 && (
            <div
              onClick={handleNext}
              className="custom-next absolute right-[10vw] top-1/2 z-10 -translate-y-1/2 cursor-pointer text-zinc-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-[3vw] h-[3vw]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
          )}

          {/* Swiper Carousel */}
          <SwiperComponent
            spaceBetween={100}
            slidesPerView={1.4}
            centeredSlides={true}
            speed={700}
            modules={[Navigation]}
            allowTouchMove={false}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.realIndex);
            }}
            
            className="w-full"
          >
            {videos.map((id, index) => (
              <SwiperSlide className="cursor-pointer" key={index}>
                <div className="rounded-[1.5vw] max-sm:h-fit max py-[10vw] h-[90vh] w-full overflow-hidden">
                  <iframe
                    src={`https://player.vimeo.com/video/${id}?controls=1&autoplay=0&muted=0&loop=0`}
                    frameBorder="0"
                    
                    allow="fullscreen; picture-in-picture"
                    allowFullScreen
                    style={{
                      borderRadius: "1.5vw",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </SwiperComponent>
        </div>

        {/* Custom Pagination Dots */}
        <div className="w-full h-[10vh] max-sm:h-[0vh] flex items-center mb-[4vw] justify-center">
          <div className="flex items-start justify-center max-sm:gap-[1.5vw]  gap-[0.5vw] h-fit">
            {videos.map((_, i) => {
              const isActive = i === activeIndex;
              const isHovered = i === hover;

              const widthClass = isActive
                ? "w-[2vw] max-sm:w-[6vw]"
                : isHovered
                ? "w-[1.5vw] max-sm:w-[5vw]"
                : "w-[1vw] max-sm:w-[4vw]";

              const colorClass = isActive
                ? "bg-white"
                : "bg-zinc-700";

              return (
                <div
                  key={i}
                  onClick={() => swiperRef.current?.slideTo(i)}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                  className={`transition-all duration-300 cursor-pointer rounded-full h-[0.5vw] max-sm:h-[2vw] ${widthClass} ${colorClass}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
