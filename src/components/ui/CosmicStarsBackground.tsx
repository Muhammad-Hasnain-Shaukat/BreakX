'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';

export const CosmicStarsBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isHomePage = pathname === '/';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    // Support High-DPI / Retina Displays (2x, 3x pixel ratios)
    const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    let width = (canvas.width = window.innerWidth * dpr);
    let height = (canvas.height = window.innerHeight * dpr);

    // 1. Create sparkling cosmic / crystal stardust particles
    const stars: {
      x: number;
      y: number;
      radius: number;
      opacity: number;
      twinkleSpeed: number;
      color: string;
      pulsePhase: number;
    }[] = [];

    const darkStarColors = ['#FFFFFF', '#93C5FD', '#38BDF8', '#C084FC', '#E0E7FF'];
    const lightStarColors = ['#3B82F6', '#6366F1', '#06B6D4', '#8B5CF6', '#F59E0B'];
    const activeColors = isDark ? darkStarColors : lightStarColors;

    for (let i = 0; i < 280; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: (Math.random() * 1.6 + 0.4) * dpr,
        opacity: isDark ? Math.random() * 0.8 + 0.2 : Math.random() * 0.5 + 0.2,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        color: activeColors[Math.floor(Math.random() * activeColors.length)],
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    // 2. Active Falling / Shooting Stars
    const shootingStars: {
      x: number;
      y: number;
      length: number;
      speed: number;
      opacity: number;
      angle: number;
      active: boolean;
      delay: number;
      color: string;
    }[] = [];

    for (let i = 0; i < 4; i++) {
      shootingStars.push({
        x: Math.random() * width,
        y: Math.random() * (height * 0.5),
        length: (Math.random() * 60 + 30) * dpr,
        speed: (Math.random() * 7 + 4) * dpr,
        opacity: 0,
        angle: (Math.PI / 4) + (Math.random() * 0.2 - 0.1),
        active: false,
        delay: Math.random() * 200 + 50,
        color: isDark ? (i % 2 === 0 ? '#00F0FF' : '#C084FC') : (i % 2 === 0 ? '#2563EB' : '#9333EA'),
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth * dpr;
      height = canvas.height = window.innerHeight * dpr;
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Render Twinkling Stars
      for (const s of stars) {
        s.pulsePhase += s.twinkleSpeed;
        const currentOpacity = isDark
          ? Math.max(0.15, Math.min(1.0, s.opacity + Math.sin(s.pulsePhase) * 0.4))
          : Math.max(0.1, Math.min(0.65, s.opacity + Math.sin(s.pulsePhase) * 0.25));

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = currentOpacity;

        if (isDark && s.radius > 1.4 * dpr) {
          ctx.shadowBlur = 6 * dpr;
          ctx.shadowColor = s.color;
        } else if (!isDark && s.radius > 1.4 * dpr) {
          ctx.shadowBlur = 4 * dpr;
          ctx.shadowColor = s.color;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fill();
      }

      // Render Falling / Shooting Stars
      for (const ss of shootingStars) {
        if (!ss.active) {
          ss.delay--;
          if (ss.delay <= 0) {
            ss.active = true;
            ss.x = Math.random() * (width * 0.8);
            ss.y = Math.random() * (height * 0.3);
            ss.opacity = 1.0;
            ss.speed = (Math.random() * 8 + 5) * dpr;
            ss.delay = Math.random() * 300 + 100;
          }
        } else {
          ctx.beginPath();
          const tailX = ss.x - Math.cos(ss.angle) * ss.length;
          const tailY = ss.y - Math.sin(ss.angle) * ss.length;

          const grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
          if (isDark) {
            grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
            grad.addColorStop(0.7, `${ss.color}99`);
            grad.addColorStop(1, `rgba(255, 255, 255, ${ss.opacity})`);
          } else {
            grad.addColorStop(0, 'rgba(37, 99, 235, 0)');
            grad.addColorStop(0.7, `${ss.color}99`);
            grad.addColorStop(1, `rgba(37, 99, 235, ${ss.opacity})`);
          }

          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5 * dpr;
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(ss.x, ss.y);
          ctx.stroke();

          // Bright star head
          ctx.beginPath();
          ctx.arc(ss.x, ss.y, 1.2 * dpr, 0, Math.PI * 2);
          ctx.fillStyle = isDark ? '#FFFFFF' : '#2563EB';
          ctx.fill();

          ss.x += Math.cos(ss.angle) * ss.speed;
          ss.y += Math.sin(ss.angle) * ss.speed;
          ss.opacity -= 0.016;

          if (ss.opacity <= 0 || ss.x > width || ss.y > height) {
            ss.active = false;
          }
        }
      }

      ctx.globalAlpha = 1.0;
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <div className="fixed inset-0 pointer-events-none -z-30 w-full h-full overflow-hidden transition-colors duration-300">
      {/* 1. On PC (lg:), show the 3D X background for the widescreen hero */}
      {isHomePage && (
        <div
          className="hidden lg:block absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] transform scale-[1.03] transition-all duration-500"
          style={{
            backgroundColor: isDark ? '#02040B' : '#F8FAFC',
            backgroundImage: isDark ? "url('/hero-full-bg.jpg')" : "url('/hero-full-bg-light.jpg')",
            backgroundPosition: 'right 15% center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            imageRendering: 'crisp-edges',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
          }}
        />
      )}

      {/* 2. On mobile and all other pages, show clean background */}
      <div
        className={`absolute inset-0 w-full h-full transition-colors duration-300 ${
          isDark ? 'bg-[#030712]' : 'bg-[#F8FAFC]'
        } ${isHomePage ? 'lg:hidden' : 'block'}`}
      />

      {/* Ambient soft mesh gradient for light theme */}
      {!isDark && (
        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(59,130,246,0.12),transparent_70%)] pointer-events-none" />
      )}

      {/* Retina/High-DPI Star Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
