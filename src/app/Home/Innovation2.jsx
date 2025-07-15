"use client";
import Image from "next/image";
import React from "react";

const data1 = [
  {
    imgSrc:
      "https://keikku.health/_ipx/f_webp&s_1700x1408/imgs/built-in-snippet-1.png",
    text: "On-off movement capabilities",
  },
  {
    imgSrc:
      "https://keikku.health/_ipx/f_webp&s_1700x1680/imgs/built-in-snippet-2.png",
    text: "sound control capabilities",
  },
];

export default function Innovation2() {
  return (
    <div className="h-screen flex w-full max-md:flex-col max-sm:flex-col max-md:justify-center max-sm:justify-center py-[5vw] max-md:h-fit max-sm:h-fit max-md:py-[10vw] max-sm:py-[10vw] bg-[#1E1328]">
      <div className="h-full max-md:h-fit max-sm:h-fit w-[30%] max-md:w-full max-sm:w-full flex items-end max-md:justify-center max-sm:justify-center">
        <div className="h-[45%] max-md:h-fit max-sm:h-fit max-md:px-[5vw] max-sm:px-[5vw] max-md:py-[15vw] max-sm:py-[15vw] w-[95%] bg-[#180E22] rounded-b-full flex items-center justify-center flex-col">
          <p className="text-transparent bg-gradient-to-b from-[#ffdada] to-[#5f20e4] bg-clip-text text-[2.5vw] max-md:text-[7vw] max-sm:text-[7vw] leading-[1.1] w-[90%] text-center font-bold ">
            Movement activation & control
          </p>
          <div className="flex w-[50%] mt-[1vw] max-md:mt-[5vw] max-sm:mt-[5vw] items-center justify-center gap-[1vw] max-md:gap-[2vw] max-sm:gap-[2vw]">
            {data1.map((item, index) => (
              <div key={index} className="flex items-center max-md:gap-[2vw] max-sm:gap-[2vw] gap-[1vw]">
                <div className="w-[2vw] max-md:w-[7vw] max-sm:w-[7vw] max-md:h-[7vw] max-sm:h-[7vw] h-[2vw]">
                  <img src={item.imgSrc} alt="innovation2" />
                </div>
                <p className="text-[.7vw] max-md:text-[2.5vw] max-sm:text-[2.5vw] leading-[1.1] w-[50%] font-DMM uppercase">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-full max-md:h-fit max-sm:h-fit w-[40%] max-md:w-full max-sm:w-full flex items-start">
        <div className="h-[55%] max-md:h-[90%] max-sm:h-[90%] w-full flex items-center gap-[1.5vw] p-[2vw] max-md:px-[10vw] max-sm:px-[10vw] max-md:pt-[10vw] max-sm:pt-[10vw] flex-col bg-[#180E22] rounded-t-full">
          <div className="flex items-center gap-[1.5vw] flex-col h-[40%]">
            <p className="text-[.8vw] max-md:text-[3vw] max-sm:text-[3vw] uppercase text-transparent bg-gradient-to-b from-[#ffdada] to-[#5f20e4] bg-clip-text font-DMM">
              LED Interactive Interface
            </p>
            <p className="text-[2.5vw] max-md:text-[6vw] max-sm:text-[6vw] text-transparent bg-gradient-to-b from-[#ffdada] to-[#5f20e4] bg-clip-text font-bold ">
              Real-time feedback
            </p>
          </div>
          <div className="h-[60%] max-md:mt-[5vw] max-sm:mt-[5vw] max-md:h-[100%] max-sm:h-[100%] flex items-end justify-center w-[65%] max-md:w-[55%] max-sm:w-[55%]">
            <video
              src="https://burospaces1.fra1.cdn.digitaloceanspaces.com/keikku/features-feedback.mp4#t=0.01"
              autoPlay
              preload="auto"
              loading="lazy"
              playsInline
              muted
              loop
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
      <div className="h-full max-md:h-fit max-sm:h-fit w-[30%] max-md:w-[100%] max-sm:w-[100%] max-md:px-[20vw] max-sm:px-[20vw] flex items-end max-md:items-start max-sm:items-start">
        <div className="h-[45%] max-md:h-fit max-sm:h-fit max-md:p-[5vw] max-sm:p-[5vw] w-full bg-[#180E22] flex items-center justify-center p-[1.5vw] max-md:gap-[5vw] max-sm:gap-[5vw] flex-col max-md:rounded-t-full max-sm:rounded-t-full max-md:rounded-b-none max-sm:rounded-b-none rounded-b-full">
          <video
            src="https://burospaces1.fra1.cdn.digitaloceanspaces.com/keikku/features-slider.mp4#t=0.01"
            autoPlay
            playsInline
            preload="auto"
            loading="lazy"
            muted
            loop
            className="w-[15vw] max-md:w-[30vw] max-sm:w-[30vw] h-[50%] object-contain"
          />
          <p className="text-[1.5vw] max-md:text-[4vw] max-sm:text-[4vw] text-transparent bg-gradient-to-b from-[#ffdada] to-[#5f20e4] bg-clip-text leading-[1.1] text-center font-bold w-[50%]">
            Customizable LED RGB
          </p>
        </div>
      </div>
    </div>
  );
}
