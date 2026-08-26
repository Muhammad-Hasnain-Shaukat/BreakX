'use client';

import React, { useEffect, useRef, useState } from 'react';
import { lightEmissionVertexShader, lightEmissionFragmentShader } from '@/lib/shaders';

interface LitImageEffectProps {
  src: string;
  emissionMap?: string;
  className?: string;
  glowColorPrimary?: string; // Hex e.g. "#3B82F6"
  glowColorSecondary?: string; // Hex e.g. "#8B5CF6"
  intensity?: number;
  interactive?: boolean;
  alt?: string;
}

// Convert Hex string "#3B82F6" to normalized RGB array [r, g, b]
function hexToRgb(hex: string): [number, number, number] {
  let cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map((char) => char + char).join('');
  }
  const num = parseInt(cleanHex, 16);
  return [(num >> 16 & 255) / 255, (num >> 8 & 255) / 255, (num & 255) / 255];
}

export const LitImageEffect: React.FC<LitImageEffectProps> = ({
  src,
  emissionMap,
  className = '',
  glowColorPrimary = '#3B82F6',
  glowColorSecondary = '#8B5CF6',
  intensity = 1.0,
  interactive = true,
  alt = 'Lit Image Effect',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const mousePosRef = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext;
    if (!gl) {
      setWebglSupported(false);
      return;
    }

    let animationFrameId: number;
    let baseTexture: WebGLTexture | null = null;
    let maskTexture: WebGLTexture | null = null;
    let isMounted = true;

    // Create shader helper
    const compileShader = (type: number, source: string): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = compileShader(gl.VERTEX_SHADER, lightEmissionVertexShader);
    const fragShader = compileShader(gl.FRAGMENT_SHADER, lightEmissionFragmentShader);

    if (!vertShader || !fragShader) {
      setWebglSupported(false);
      return;
    }

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      setWebglSupported(false);
      return;
    }

    gl.useProgram(program);

    // Full screen quad geometry
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
        -1.0,  1.0,
         1.0, -1.0,
         1.0,  1.0,
      ]),
      gl.STATIC_DRAW
    );

    // Properly aligned UV buffer with right-side-up orientation
    const uvBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        0.0, 0.0,
        1.0, 0.0,
        0.0, 1.0,
        0.0, 1.0,
        1.0, 0.0,
        1.0, 1.0,
      ]),
      gl.STATIC_DRAW
    );

    const posAttr = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(posAttr);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    const uvAttr = gl.getAttribLocation(program, 'uv');
    gl.enableVertexAttribArray(uvAttr);
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.vertexAttribPointer(uvAttr, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uTextureLoc = gl.getUniformLocation(program, 'u_texture');
    const uEmissionLoc = gl.getUniformLocation(program, 'u_emissionMap');
    const uHasEmissionLoc = gl.getUniformLocation(program, 'u_hasEmissionMap');
    const uTimeLoc = gl.getUniformLocation(program, 'u_time');
    const uResolutionLoc = gl.getUniformLocation(program, 'u_resolution');
    const uMouseLoc = gl.getUniformLocation(program, 'u_mouse');
    const uIntensityLoc = gl.getUniformLocation(program, 'u_intensity');
    const uColorPrimaryLoc = gl.getUniformLocation(program, 'u_glowColorPrimary');
    const uColorSecondaryLoc = gl.getUniformLocation(program, 'u_glowColorSecondary');

    // Create & load base image texture
    const baseImg = new Image();
    baseImg.crossOrigin = 'anonymous';
    baseImg.src = src;

    baseImg.onload = () => {
      if (!isMounted) return;
      baseTexture = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, baseTexture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, baseImg);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.uniform1i(uTextureLoc, 0);
      setIsLoaded(true);
    };

    // Load emission map texture if provided
    let hasEmissionMap = false;
    if (emissionMap) {
      const maskImg = new Image();
      maskImg.crossOrigin = 'anonymous';
      maskImg.src = emissionMap;
      maskImg.onload = () => {
        if (!isMounted) return;
        maskTexture = gl.createTexture();
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, maskTexture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, maskImg);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.uniform1i(uEmissionLoc, 1);
        hasEmissionMap = true;
      };
    }

    const rgbPrimary = hexToRgb(glowColorPrimary);
    const rgbSecondary = hexToRgb(glowColorSecondary);

    const handleResize = () => {
      if (!containerRef.current || !canvas) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight || width * 0.6;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) resizeObserver.observe(containerRef.current);

    let startTime = performance.now();

    const render = () => {
      if (!isMounted) return;
      const currentTime = (performance.now() - startTime) / 1000;

      gl.useProgram(program);
      gl.uniform1f(uTimeLoc, currentTime);
      gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
      gl.uniform2f(uMouseLoc, mousePosRef.current.x, mousePosRef.current.y);
      gl.uniform1f(uIntensityLoc, intensity);
      gl.uniform3f(uColorPrimaryLoc, rgbPrimary[0], rgbPrimary[1], rgbPrimary[2]);
      gl.uniform3f(uColorSecondaryLoc, rgbSecondary[0], rgbSecondary[1], rgbSecondary[2]);
      gl.uniform1i(uHasEmissionLoc, hasEmissionMap ? 1 : 0);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      isMounted = false;
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (baseTexture) gl.deleteTexture(baseTexture);
      if (maskTexture) gl.deleteTexture(maskTexture);
      if (positionBuffer) gl.deleteBuffer(positionBuffer);
      if (uvBuffer) gl.deleteBuffer(uvBuffer);
      if (program) gl.deleteProgram(program);
    };
  }, [src, emissionMap, intensity, glowColorPrimary, glowColorSecondary]);

  // Mouse interaction handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1.0 - (e.clientY - rect.top) / rect.height; // Inverted for WebGL Y
    mousePosRef.current = { x, y };
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    mousePosRef.current = { x: 0.5, y: 0.5 };
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-2xl ${className}`}
    >
      {webglSupported ? (
        <>
          <canvas
            ref={canvasRef}
            className={`w-full h-full object-cover transition-opacity duration-700 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
          {!isLoaded && (
            <div className="absolute inset-0 bg-surface animate-pulse flex items-center justify-center">
              <span className="text-xs text-primary-400 font-semibold tracking-wide">
                Loading Lit Visual...
              </span>
            </div>
          )}
        </>
      ) : (
        /* Fallback for devices without WebGL support */
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover rounded-2xl"
          loading="lazy"
        />
      )}
    </div>
  );
};
