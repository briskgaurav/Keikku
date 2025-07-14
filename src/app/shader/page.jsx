'use client'
import React, { useState } from "react";
import MovingBandsScene from "../Shaders/Lines";
import GradientPlasma from "../Shaders/GradientPlasma";
import BlobWaves from "../Shaders/BlobWaves";
import Histogram from "../Shaders/Histogram";

export default function page() {
  const [selectedShader, setSelectedShader] = useState('bands');

  const renderShader = () => {
    switch(selectedShader) {
      case 'plasma':
        return <GradientPlasma />;
      case 'blobs':
        return <BlobWaves />;
      case 'histogram':
        return <Histogram />;
      default:
        return <MovingBandsScene />;
    }
  };

  return (
    <div className="h-screen w-screen relative">
      <div className="flex absolute z-[999] top-0 left-0 gap-4 p-4">
        <button 
          onClick={() => setSelectedShader('bands')}
          className="px-4 py-2 cursor-pointer bg-amber-500 text-white rounded hover:bg-amber-600"
        >
          Moving Bands
        </button>
        <button 
          onClick={() => setSelectedShader('plasma')}
          className="px-4 py-2 cursor-pointer bg-amber-500 text-white rounded hover:bg-amber-600"
        >
          Gradient Plasma
        </button>
        <button 
          onClick={() => setSelectedShader('blobs')}
          className="px-4 py-2 cursor-pointer bg-amber-500 text-white rounded hover:bg-amber-600"
        >
          Blob Waves
        </button>
        <button 
          onClick={() => setSelectedShader('histogram')}
          className="px-4 py-2 cursor-pointer bg-amber-500 text-white rounded hover:bg-amber-600"
        >
          Histogram
        </button>
      </div>
      {renderShader()}
    </div>
  );
}
