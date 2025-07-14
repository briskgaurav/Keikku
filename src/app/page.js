import React from "react";
import Navbar from "./Navbar/Navbar";
import Hero from "./Home/Hero";
import Sequence from "./Home/Sequence";
import Features from "./Home/Features";
import MeetKeikku from "./Home/MeetKeikku";
import Info from "./Home/Info";
import Experience from "./Home/Experience";
import Swiper from "./Home/Swiper";
import BuildFromTheGround from "./Home/BuildFromTheGround";
import Innovation from "./Home/Innovation";
import Innovation2 from "./Home/Innovation2";
import Innovation3 from "./Home/Innovation3";
import DiscoverOurApp from "./Home/DiscoverOurApp";
import Footer from "./Footer/Footer";
import Sequence2 from "./Home/Sequence2";


export default function page() {
  return (
    <>
      <div className="h-fit relative  w-full ">
        <Sequence />
        <Navbar />
        <Hero />
        <Features />
        <div className="relative h-fit w-full">
          <Sequence2 />
        </div>
      </div>
      <MeetKeikku />
      <Info />
      <Experience />
      <Swiper />
      <BuildFromTheGround />
      <Innovation />
      <Innovation2 />
      <Innovation3 />
      <DiscoverOurApp />
      <Footer />

    </>
  );
}
