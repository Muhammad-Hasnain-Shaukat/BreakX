'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  maxLife: number;
  life: number;
  color: string;
  rotation: number;
  vRot: number;
  isShard: boolean;
}

export const BreakingStarCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isRunning = true;

    // Viewport scaling with Retina support
    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const particles: Particle[] = [];
    const darkColors = [
      '#00F0FF', // Electric Cyan
      '#38BDF8', // Sky Blue
      '#818CF8', // Indigo Flare
      '#C084FC', // Neon Purple
      '#FFFFFF', // Starlight White
    ];

    const lightColors = [
      '#2563EB', // Sapphire Blue
      '#0284C7', // Ocean Blue
      '#4F46E5', // Indigo
      '#7C3AED', // Vivid Violet
      '#0891B2', // Cyan Teal
    ];

    const activeColors = isDark ? darkColors : lightColors;

    let mouse = { x: -100, y: -100 };
    let lastMouse = { x: -100, y: -100 };
    let starHead = { x: -100, y: -100, angle: 0, speed: 0 };
    let isMoving = false;
    let lastMoveTime = 0;

    const spawnBreakingStarDust = (x: number, y: number, angle: number, speed: number) => {
      const count = Math.min(Math.floor(speed * 0.8) + 2, 8);
      for (let i = 0; i < count; i++) {
        const spread = (Math.random() - 0.5) * 1.8;
        const particleAngle = angle + Math.PI + spread;
        const particleSpeed = Math.random() * (speed * 0.4 + 2) + 0.5;

        particles.push({
          x: x + (Math.random() - 0.5) * 6,
          y: y + (Math.random() - 0.5) * 6,
          vx: Math.cos(particleAngle) * particleSpeed,
          vy: Math.sin(particleAngle) * particleSpeed,
          size: Math.random() * 3 + 1.5,
          maxLife: Math.random() * 25 + 20,
          life: 0,
          color: activeColors[Math.floor(Math.random() * activeColors.length)],
          rotation: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.25,
          isShard: Math.random() > 0.4,
        });
      }

      if (speed > 4 && Math.random() > 0.6) {
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 5,
          vy: (Math.random() - 0.5) * 5,
          size: Math.random() * 4 + 2,
          maxLife: 35,
          life: 0,
          color: isDark ? '#00F0FF' : '#2563EB',
          rotation: 0,
          vRot: 0.3,
          isShard: true,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const curX = e.clientX;
      const curY = e.clientY;

      if (lastMouse.x !== -100) {
        const dx = curX - lastMouse.x;
        const dy = curY - lastMouse.y;
        const dist = Math.hypot(dx, dy);

        if (dist > 1) {
          const moveAngle = Math.atan2(dy, dx);
          starHead.angle = moveAngle;
          starHead.speed = dist;
          isMoving = true;
          lastMoveTime = performance.now();

          spawnBreakingStarDust(curX, curY, moveAngle, dist);
        }
      }

      lastMouse.x = curX;
      lastMouse.y = curY;
      mouse.x = curX;
      mouse.y = curY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const draw4PointStar = (
      context: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      spikes: number,
      outerRadius: number,
      innerRadius: number,
      rotation: number
    ) => {
      let rot = (Math.PI / 2) * 3 + rotation;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      context.beginPath();
      context.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        context.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        context.lineTo(x, y);
        rot += step;
      }
      context.lineTo(cx, cy - outerRadius);
      context.closePath();
    };

    const render = () => {
      if (!isRunning) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      starHead.x += (mouse.x - starHead.x) * 0.35;
      starHead.y += (mouse.y - starHead.y) * 0.35;

      const now = performance.now();
      const timeSinceMove = now - lastMoveTime;
      const headAlpha = Math.max(0, 1 - timeSinceMove / 400);

      // 1. Draw Breaking Star Head
      if (headAlpha > 0.05 && mouse.x > 0) {
        ctx.save();
        ctx.translate(starHead.x, starHead.y);
        ctx.rotate(starHead.angle + Math.PI / 4);

        const glowRadius = Math.min(starHead.speed * 0.8 + 8, 22);
        const grad = ctx.createRadialGradient(0, 0, 1, 0, 0, glowRadius);
        if (isDark) {
          grad.addColorStop(0, `rgba(255, 255, 255, ${headAlpha * 0.95})`);
          grad.addColorStop(0.3, `rgba(0, 240, 255, ${headAlpha * 0.8})`);
          grad.addColorStop(0.7, `rgba(139, 92, 246, ${headAlpha * 0.4})`);
          grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        } else {
          grad.addColorStop(0, `rgba(37, 99, 235, ${headAlpha * 0.9})`);
          grad.addColorStop(0.4, `rgba(59, 130, 246, ${headAlpha * 0.6})`);
          grad.addColorStop(0.8, `rgba(147, 197, 253, ${headAlpha * 0.3})`);
          grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        }

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // 4-Point Crystal Breaking Star
        ctx.fillStyle = isDark ? `rgba(255, 255, 255, ${headAlpha})` : `rgba(37, 99, 235, ${headAlpha})`;
        draw4PointStar(ctx, 0, 0, 4, 10, 3, (now * 0.005));
        ctx.fill();

        // Star Light Gleam
        ctx.fillStyle = isDark ? `rgba(0, 240, 255, ${headAlpha * 0.8})` : `rgba(14, 165, 233, ${headAlpha * 0.85})`;
        draw4PointStar(ctx, 0, 0, 4, 14, 1.5, -(now * 0.003));
        ctx.fill();

        ctx.restore();
      }

      // 2. Update & Draw Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.rotation += p.vRot;

        const progress = p.life / p.maxLife;
        const alpha = Math.max(0, 1 - progress);

        if (progress >= 1) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = alpha;

        if (p.isShard) {
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.moveTo(0, -p.size * 1.6);
          ctx.lineTo(p.size * 0.8, 0);
          ctx.lineTo(0, p.size * 1.6);
          ctx.lineTo(-p.size * 0.8, 0);
          ctx.closePath();
          ctx.fill();

          ctx.shadowColor = p.color;
          ctx.shadowBlur = isDark ? 6 : 3;
        } else {
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * (1 - progress * 0.4), 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50 w-full h-full"
      style={{ mixBlendMode: isDark ? 'screen' : 'normal' }}
    />
  );
};
