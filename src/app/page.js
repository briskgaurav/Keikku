"use client"
import React, { lazy, Suspense, useEffect, useState } from "react";
import Navbar from "./Navbar/Navbar";
import Hero from "./Home/Hero";
import Sequence from "./Home/Sequence";
import Features from "./Home/Features";
import MeetKeikku from "./Home/MeetKeikku";
import Info from "./Home/Info";
import UseMobile from "./Hooks/IsMobile";
import UseTablet from "./Hooks/UseTablet";
import InnovationTablet from "./Home/InnovationTablet";
import imagesLoaded from "imagesloaded";

// Lazy load components that appear below the fold
const Experience = lazy(() => import("./Home/Experience"));
const Swiper = lazy(() => import("./Home/Swiper"));
const BuildFromTheGround = lazy(() => import("./Home/BuildFromTheGround"));
const Innovation = lazy(() => import("./Home/Innovation"));
const Innovation2 = lazy(() => import("./Home/Innovation2"));
const Innovation3 = lazy(() => import("./Home/Innovation3"));
const Innovation3Mobile = lazy(() => import("./Home/Innovation3Mobile"));
const DiscoverOurApp = lazy(() => import("./Home/DiscoverOurApp"));
const Footer = lazy(() => import("./Footer/Footer"));
const Sequence2 = lazy(() => import("./Home/Sequence2"));

export default function Page() {
  const isMobile = UseMobile();
  const isTablet = UseTablet();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const images = document.querySelectorAll("img");
    imagesLoaded(images, () => {
      setIsLoaded(true);
    });
  }, [])
  

  return (
    <>
      {isLoaded && (
        <div className="h-fit relative w-full">
          <div className="h-fit relative w-full">
            <Sequence />
            <Navbar />
            <Hero />
            <Features />
            <div className="relative h-fit w-full">
              <Suspense fallback={null}>
                <Sequence2 />
              </Suspense>
            </div>
          </div>

          <MeetKeikku />
          <Info />
          
          <Suspense fallback={null}>
            <Experience />
            <Swiper />
            <BuildFromTheGround />
            <Innovation />
            <Innovation2 />
            {isMobile ? <Innovation3Mobile /> : isTablet ? <InnovationTablet /> : <Innovation3 />}
            <DiscoverOurApp />
            <Footer />
          </Suspense>
        </div>
      )}
    </>
  );
}
