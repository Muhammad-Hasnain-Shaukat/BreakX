'use client';

import React, { useState } from 'react';

export const HeroImageDisplay: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePos({ x, y });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
      className="relative w-full max-w-[620px] aspect-square mx-auto flex items-center justify-center pointer-events-auto"
    >
      {/* 1. Large Ambient Radiating Core Glow that bleeds across to the left */}
      <div className="absolute -left-[40%] top-1/2 -translate-y-1/2 w-[140%] h-[120%] bg-gradient-radial from-primary-500/35 via-accent-blue/20 to-transparent rounded-full filter blur-[80px] pointer-events-none -z-10 animate-pulse-glow" />

      {/* 2. Seamless Borderless 3D X with Feathered Edge Mask (No box borders, 100% unified with background) */}
      <div
        className="relative w-full h-full flex items-center justify-center transition-transform duration-500 ease-out"
        style={{
          transform: `perspective(1000px) rotateY(${mousePos.x * 0.3}deg) rotateX(${-mousePos.y * 0.3}deg)`,
        }}
      >
        <img
          src="/hero-x.jpg"
          alt="BreakX 3D Lit Crystal X"
          className="w-full h-full object-contain filter brightness-110 contrast-110 mix-blend-screen"
          style={{
            maskImage:
              'radial-gradient(ellipse 90% 90% at 50% 50%, rgba(0,0,0,1) 55%, rgba(0,0,0,0.8) 75%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 90% 90% at 50% 50%, rgba(0,0,0,1) 55%, rgba(0,0,0,0.8) 75%, rgba(0,0,0,0) 100%)',
          }}
        />

        {/* Dynamic Specular Shimmer that tracks mouse */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-screen opacity-50 transition-opacity duration-300 group-hover:opacity-80"
          style={{
            background: `radial-gradient(circle at ${50 + mousePos.x}% ${50 + mousePos.y}%, rgba(255,255,255,0.7) 0%, rgba(59,130,246,0.3) 30%, transparent 65%)`,
          }}
        />
      </div>
    </div>
  );
};
