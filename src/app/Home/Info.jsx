import React from "react";

export default function Info() {
  return (
    <div className="h-[80vh] max-sm:h-fit max-sm:py-[15vw] w-full flex   text-[#B5B5B8] flex-col gap-[1vw] items-center justify-end">
      <p className="w-[35%] max-md:w-[70%] text-center text-[1.3vw] max-sm:text-[4vw] max-md:text-[3vw] max-sm:w-[70%] leading-[1.5] font-bold">
        From <span className="text-white">seamless wireless connectivity</span> to the precision of <span className="text-white">Active Noise
        Cancellation</span> and the intuitive implementation of <span className="text-white">AI</span>, every element is
        designed to enhance the act of <span className="text-white">listening to the sounds of health.
        </span>      </p>
      <p className="w-[35%] max-md:w-[70%] max-md:text-[3vw] text-center text-[1.3vw] max-sm:text-[4vw] max-sm:w-[70%] leading-[1.5] font-bold">
        Experience the <span className="text-white">true power of auscultation</span>, uncover health insights and
        elevate care to new heights with Keikku.
      </p>
      <p className="w-[35%] max-md:w-[70%] max-md:text-[3vw] text-white text-center text-[1.3vw] max-sm:text-[4vw] max-sm:w-[70%] leading-[1.5] font-bold">
        Welcome to the next generation of the digital stethoscope.
      </p>
    </div>
  );
}
