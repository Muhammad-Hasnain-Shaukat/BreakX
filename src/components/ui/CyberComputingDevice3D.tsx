'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Activity, Terminal } from 'lucide-react';

interface CyberComputingDevice3DProps {
  className?: string;
}

export const CyberComputingDevice3D: React.FC<CyberComputingDevice3DProps> = ({ className = '' }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // 3D Tilt State
  const [rotX, setRotX] = useState<number>(3);
  const [rotY, setRotY] = useState<number>(-10);
  const [activeTab, setActiveTab] = useState<'TELEMETRY' | 'AI_CORE' | 'QUANTUM'>('AI_CORE');

  // Real-time live data counters
  const [macroVal, setMacroVal] = useState<string>('00.37634560345');
  const [subspaceVal, setSubspaceVal] = useState<string>('0.5934');
  const [latencyVal, setLatencyVal] = useState<number>(1.2);
  const [fpsVal, setFpsVal] = useState<number>(60);

  // 3D Mouse Movement Tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const targetRotY = (x / (rect.width / 2)) * 12 - 8;
    const targetRotX = -(y / (rect.height / 2)) * 8 + 2;

    setRotX(targetRotX);
    setRotY(targetRotY);
  };

  const handleMouseLeave = () => {
    setRotX(3);
    setRotY(-10);
  };

  // Live Canvas Rendering (Rotating Rings, Oscillating Waveforms, Moving Graphs)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const width = (canvas.width = 720);
    const height = (canvas.height = 460);

    const waveHistory: number[] = new Array(80).fill(0);
    const spectrumBars: number[] = new Array(24).fill(0);

    const render = () => {
      time += 0.025;
      ctx.clearRect(0, 0, width, height);

      // Background Grid Texture inside monitor
      ctx.strokeStyle = isDark ? 'rgba(0, 240, 255, 0.06)' : 'rgba(37, 99, 235, 0.06)';
      ctx.lineWidth = 1;
      const gridSize = 20;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // =========================================================================
      // 1. ROTATING HOLOGRAPHIC CONCENTRIC ASTRO-CORE (Center-Left)
      // =========================================================================
      const cx = 220;
      const cy = 220;

      // Outer Glow Halo
      const coreGlow = ctx.createRadialGradient(cx, cy, 20, cx, cy, 140);
      coreGlow.addColorStop(0, isDark ? 'rgba(0, 240, 255, 0.22)' : 'rgba(37, 99, 235, 0.16)');
      coreGlow.addColorStop(0.7, isDark ? 'rgba(96, 165, 250, 0.05)' : 'rgba(99, 102, 241, 0.05)');
      coreGlow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = coreGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, 140, 0, Math.PI * 2);
      ctx.fill();

      // Ring 1: Outer Rotating Tech Dial with Chevrons
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(time * 0.4);
      ctx.strokeStyle = isDark ? '#00F0FF' : '#2563EB';
      ctx.lineWidth = 2.5;
      ctx.shadowBlur = isDark ? 10 : 4;
      ctx.shadowColor = isDark ? '#00F0FF' : '#2563EB';

      // 8 Outer Tech Chevrons
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI * 2) / 8;
        ctx.save();
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(95, -8);
        ctx.lineTo(110, 0);
        ctx.lineTo(95, 8);
        ctx.stroke();
        ctx.restore();
      }

      ctx.beginPath();
      ctx.arc(0, 0, 95, 0, Math.PI * 1.5);
      ctx.stroke();
      ctx.restore();

      // Ring 2: Counter-Rotating Glyphs / Rune Segments Ring
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-time * 0.6);
      ctx.strokeStyle = isDark ? '#60A5FA' : '#4F46E5';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, 75, 0, Math.PI * 2);
      ctx.stroke();

      for (let i = 0; i < 36; i++) {
        const angle = (i * Math.PI * 2) / 36;
        const r1 = i % 3 === 0 ? 68 : 72;
        ctx.beginPath();
        ctx.moveTo(Math.cos(angle) * r1, Math.sin(angle) * r1);
        ctx.lineTo(Math.cos(angle) * 75, Math.sin(angle) * 75);
        ctx.stroke();
      }
      ctx.restore();

      // Ring 3: Inner Fast Pulsing Target Core
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(time * 1.2);
      ctx.strokeStyle = isDark ? '#C084FC' : '#9333EA';
      ctx.lineWidth = 2;
      ctx.setLineDash([12, 8]);
      ctx.beginPath();
      ctx.arc(0, 0, 52, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // Central Pulsing Iris
      const pulseSize = 26 + Math.sin(time * 3) * 4;
      ctx.fillStyle = isDark ? 'rgba(0, 240, 255, 0.4)' : 'rgba(37, 99, 235, 0.3)';
      ctx.beginPath();
      ctx.arc(cx, cy, pulseSize, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = isDark ? '#FFFFFF' : '#1E40AF';
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fill();

      // =========================================================================
      // 2. LIVE SCROLLING WAVEFORM GRAPH (Bottom Center-Right)
      // =========================================================================
      const newWaveVal =
        Math.sin(time * 3.5) * 22 +
        Math.cos(time * 1.8) * 14 +
        Math.sin(time * 7) * 6;
      waveHistory.push(newWaveVal);
      waveHistory.shift();

      const waveX = 390;
      const waveY = 320;
      const waveW = 290;
      const waveH = 75;

      ctx.fillStyle = isDark ? 'rgba(3, 7, 18, 0.7)' : 'rgba(255, 255, 255, 0.7)';
      ctx.fillRect(waveX, waveY, waveW, waveH);
      ctx.strokeStyle = isDark ? 'rgba(0, 240, 255, 0.3)' : 'rgba(37, 99, 235, 0.3)';
      ctx.lineWidth = 1;
      ctx.strokeRect(waveX, waveY, waveW, waveH);

      ctx.beginPath();
      ctx.moveTo(waveX, waveY + waveH / 2);
      ctx.lineTo(waveX + waveW, waveY + waveH / 2);
      ctx.strokeStyle = isDark ? 'rgba(0, 240, 255, 0.15)' : 'rgba(37, 99, 235, 0.15)';
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = isDark ? '#00F0FF' : '#2563EB';
      ctx.lineWidth = 2;
      ctx.shadowBlur = isDark ? 8 : 2;
      ctx.shadowColor = isDark ? '#00F0FF' : '#2563EB';

      const step = waveW / (waveHistory.length - 1);
      for (let i = 0; i < waveHistory.length; i++) {
        const px = waveX + i * step;
        const py = waveY + waveH / 2 - waveHistory[i];
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      ctx.lineTo(waveX + waveW, waveY + waveH);
      ctx.lineTo(waveX, waveY + waveH);
      ctx.closePath();
      const waveFill = ctx.createLinearGradient(0, waveY, 0, waveY + waveH);
      waveFill.addColorStop(0, isDark ? 'rgba(0, 240, 255, 0.25)' : 'rgba(37, 99, 235, 0.2)');
      waveFill.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = waveFill;
      ctx.fill();

      // =========================================================================
      // 3. JUMPING FREQUENCY SPECTRUM BARS (Top Right)
      // =========================================================================
      const specX = 405;
      const specY = 90;
      const barW = 8;
      const gap = 3.5;

      for (let i = 0; i < spectrumBars.length; i++) {
        const targetH = Math.max(
          6,
          Math.sin(time * 4 + i * 0.45) * 35 +
            Math.cos(time * 2.2 + i * 0.3) * 20 +
            30
        );
        spectrumBars[i] += (targetH - spectrumBars[i]) * 0.2;

        const bx = specX + i * (barW + gap);
        const bh = spectrumBars[i];

        const barGrad = ctx.createLinearGradient(0, specY, 0, specY - bh);
        if (isDark) {
          barGrad.addColorStop(0, '#00F0FF');
          barGrad.addColorStop(0.7, '#60A5FA');
          barGrad.addColorStop(1, '#C084FC');
        } else {
          barGrad.addColorStop(0, '#2563EB');
          barGrad.addColorStop(0.7, '#4F46E5');
          barGrad.addColorStop(1, '#9333EA');
        }

        ctx.fillStyle = barGrad;
        ctx.fillRect(bx, specY - bh, barW, bh);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const interval = setInterval(() => {
      setMacroVal(`00.${(Math.random() * 9000000000 + 1000000000).toFixed(0)}`);
      setSubspaceVal((Math.random() * 0.4 + 0.45).toFixed(4));
      setLatencyVal(Number((Math.random() * 0.6 + 0.8).toFixed(2)));
      setFpsVal(Math.floor(Math.random() * 3) + 59);
    }, 800);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(interval);
    };
  }, [isDark]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[460px] lg:max-w-[560px] mx-auto perspective-[1400px] select-none group ${className}`}
    >
      {/* 3D Floating Monitor Chassis */}
      <div
        className="relative transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform: `rotateY(${rotY}deg) rotateX(${rotX}deg) translateZ(0)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Ambient Back Glow */}
        <div
          className={`absolute -inset-4 sm:-inset-6 rounded-[2rem] filter blur-2xl pointer-events-none transition-colors duration-500 ${
            isDark ? 'bg-cyan-500/20' : 'bg-blue-500/15'
          }`}
        />

        {/* Outer Bezel Enclosure */}
        <div
          className={`relative rounded-[1.5rem] sm:rounded-[2rem] p-2.5 sm:p-4 border-2 shadow-2xl backdrop-blur-2xl transition-all duration-300 ${
            isDark
              ? 'bg-[#050B18]/95 border-cyan-400/50 shadow-[0_20px_60px_rgba(0,0,0,0.9),_0_0_35px_rgba(0,240,255,0.3)]'
              : 'bg-white/95 border-blue-400/60 shadow-[0_25px_60px_rgba(37,99,235,0.22),_0_0_25px_rgba(59,130,246,0.18)]'
          }`}
        >
          {/* Top Status LED Header */}
          <div className="flex items-center justify-between px-2 sm:px-3 py-1 sm:py-1.5 mb-1.5 border-b border-white/10 text-[9px] sm:text-[10px] font-mono tracking-widest">
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34D399]" />
              <span className={isDark ? 'text-cyan-300 font-bold truncate' : 'text-blue-700 font-bold truncate'}>
                BREAKX COMPUTE ENGINE
              </span>
            </div>
            <div className="flex items-center space-x-2 text-slate-400 text-[8px] sm:text-[9px]">
              <span className="hidden sm:inline">FPS: {fpsVal}</span>
              <span className="text-emerald-400 font-semibold">{latencyVal}ms</span>
            </div>
          </div>

          {/* Screen Display Area */}
          <div
            className={`relative rounded-xl sm:rounded-2xl overflow-hidden border shadow-inner ${
              isDark
                ? 'bg-[#02050E] border-cyan-500/30'
                : 'bg-slate-900 border-blue-500/30'
            }`}
          >
            {/* Tactical HUD Header */}
            <div className="absolute top-0 inset-x-0 z-20 px-2.5 sm:px-4 py-1.5 sm:py-2 flex items-center justify-between bg-black/40 backdrop-blur-md border-b border-cyan-400/20 text-[8px] sm:text-[10px] font-mono text-cyan-400">
              <div className="flex items-center space-x-1.5">
                <Terminal className="w-3 h-3 text-cyan-400" />
                <span className="font-bold tracking-wider truncate max-w-[130px] sm:max-w-none">
                  MACRO {macroVal}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-[8px] sm:text-[9px] font-bold text-cyan-300 border border-cyan-500/40">
                  ONLINE
                </span>
              </div>
            </div>

            {/* Canvas */}
            <canvas
              ref={canvasRef}
              className="w-full h-[155px] xs:h-[175px] sm:h-[220px] lg:h-[310px] block relative z-10"
            />

            {/* Right Matrix Overlay */}
            <div className="absolute top-8 sm:top-12 right-2 sm:right-3 z-20 w-24 sm:w-36 space-y-1 sm:space-y-2 pointer-events-none font-mono text-[8px] sm:text-[9px] text-left">
              <div className="p-1 sm:p-2 rounded-lg bg-black/60 border border-cyan-400/20 backdrop-blur-sm text-cyan-300 space-y-0.5 sm:space-y-1">
                <div className="flex justify-between border-b border-cyan-400/20 pb-0.5">
                  <span className="text-[7px] sm:text-[8px]">SUBSPACE</span>
                  <span className="text-white font-bold">{subspaceVal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[7px] sm:text-[8px]">ROT</span>
                  <span className="text-emerald-400">1204.39</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[7px] sm:text-[8px]">ACC</span>
                  <span className="text-cyan-400 font-bold">99.9%</span>
                </div>
              </div>
            </div>

            {/* Bottom Stream */}
            <div className="absolute bottom-0 inset-x-0 z-20 px-2 sm:px-4 py-1 sm:py-1.5 flex items-center justify-between bg-black/70 backdrop-blur-md border-t border-cyan-400/20 text-[8px] sm:text-[9px] font-mono text-cyan-400/90">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Activity className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-cyan-400 animate-pulse" />
                <span className="truncate max-w-[170px] sm:max-w-[240px]">SYS: REAL-TIME TELEMETRY</span>
              </div>
              <span className="text-purple-300 font-bold hidden xs:inline text-[8px] sm:text-[9px]">GPU ACTIVE</span>
            </div>

            {/* Scanlines */}
            <div className="absolute inset-0 z-30 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-40" />
          </div>

          {/* Bottom Tabs */}
          <div className="mt-1.5 sm:mt-2.5 pt-1.5 flex items-center justify-between px-1 sm:px-2 text-[8px] sm:text-[10px] font-mono text-slate-400">
            <div className="flex items-center space-x-1 sm:space-x-1.5">
              <button
                type="button"
                onClick={() => setActiveTab('AI_CORE')}
                className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded text-[8px] sm:text-[9px] transition-all font-bold ${
                  activeTab === 'AI_CORE'
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/50'
                    : 'hover:text-white'
                }`}
              >
                AI_CORE
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('TELEMETRY')}
                className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded text-[8px] sm:text-[9px] transition-all font-bold ${
                  activeTab === 'TELEMETRY'
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/50'
                    : 'hover:text-white'
                }`}
              >
                GRAPHS
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('QUANTUM')}
                className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded text-[8px] sm:text-[9px] transition-all font-bold ${
                  activeTab === 'QUANTUM'
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/50'
                    : 'hover:text-white'
                }`}
              >
                QUANTUM
              </button>
            </div>

            <div className="flex items-center space-x-1.5 text-[8px] sm:text-[9px]">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00F0FF]" />
              <span className={isDark ? 'text-slate-300 font-semibold' : 'text-slate-700 font-semibold'}>
                3D ACTIVE
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
