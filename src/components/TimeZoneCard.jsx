import React from 'react';
import { Globe } from './Globe';

export default function TimeZoneCard() {
  // Minimalist monochrome Globe config for a neat, premium look
  const customGlobeConfig = {
    width: 600,
    height: 600,
    onRender: () => {},
    devicePixelRatio: 2,
    phi: 0,
    theta: 0.25,
    dark: 1,
    diffuse: 1.2,
    mapSamples: 16000,
    mapBrightness: 5,
    baseColor: [0.4, 0.4, 0.45], // Sleek gray
    markerColor: [1, 1, 1], // Crisp white marker
    glowColor: [0.05, 0.05, 0.05], // Very subtle outer glow
    markers: [
      { location: [12.9716, 77.5946], size: 0.1 }, // Bangalore
    ],
  };

  return (
    <div className="relative w-full h-full overflow-hidden rounded-[inherit] bg-[#09090b] flex flex-col p-8">
      
      {/* ── Globe Container ── */}
      <div className="absolute right-[-25%] top-[-10%] w-[120%] md:w-[85%] h-full z-0 pointer-events-auto opacity-40 mix-blend-screen">
        <Globe config={customGlobeConfig} />
      </div>

      {/* ── Text Content ── */}
      <div className="relative z-10 flex flex-col pointer-events-none mt-auto">
        <p className="text-[10px] text-neutral-500 uppercase tracking-[0.2em] mb-2 font-semibold">
          Time Zone
        </p>
        <p className="text-3xl sm:text-4xl font-black text-white uppercase tracking-wider mb-2">
          Bangalore
        </p>
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-aqua opacity-80"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-aqua"></span>
          </span>
          <p className="text-sm font-semibold text-neutral-400 uppercase tracking-widest">
            India
          </p>
        </div>
      </div>
      
    </div>
  );
}
