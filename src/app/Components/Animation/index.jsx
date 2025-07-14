import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export const TextAnimation = (id) => {
  gsap.fromTo(
    `#${id}`,
    {
      scale: 1.05,
      opacity: 0,
    },
    {
      scale: 1,
      opacity: 1,
      duration: .5,
      stagger:.1,
      ease: "linear",
      scrollTrigger: {
        trigger: `#${id}`,
        start: "top center",
        end: "bottom center",
        // markers:true,
      },
    }
  );
};
