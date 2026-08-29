'use client';

import { useEffect, useRef } from 'react';

type Props = {
  progressRef: React.MutableRefObject<number>;
};

type Star = { x: number; y: number; z: number; size: number; warm: boolean };

export default function JourneyStarfield({ progressRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let raf = 0;
    let stars: Star[] = [];
    let last = performance.now();

    const buildStars = () => {
      const count = reduced ? 70 : width < 700 ? 115 : 210;
      stars = Array.from({ length: count }, (_, index) => ({
        x: ((index * 73) % 997) / 997 - 0.5,
        y: ((index * 193) % 991) / 991 - 0.5,
        z: ((index * 47) % 101) / 101,
        size: 0.45 + ((index * 29) % 13) / 12,
        warm: index % 9 === 0,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildStars();
    };

    const draw = (now: number) => {
      const dt = Math.min(32, now - last);
      last = now;
      context.clearRect(0, 0, width, height);

      const progress = progressRef.current;
      const centerX = width * (0.5 + Math.sin(progress * Math.PI * 2) * 0.035);
      const centerY = height * (0.48 - progress * 0.04);
      const travel = reduced ? 0 : dt * (0.000012 + progress * 0.000012);

      for (const star of stars) {
        star.z -= travel;
        if (star.z < 0.02) star.z = 1;
        const depth = 0.18 + star.z;
        const spread = Math.max(width, height) * (0.7 + (1 - star.z) * 0.9);
        const x = centerX + (star.x * spread) / depth;
        const y = centerY + (star.y * spread) / depth;
        if (x < -20 || x > width + 20 || y < -20 || y > height + 20) continue;
        const alpha = Math.min(0.9, 0.14 + (1 - star.z) * 0.72);
        const radius = star.size * (0.55 + (1 - star.z) * 1.8);
        context.beginPath();
        context.fillStyle = star.warm
          ? `rgba(225,184,105,${alpha})`
          : `rgba(218,232,245,${alpha})`;
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();
      }

      const glow = context.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        Math.min(width, height) * 0.34,
      );
      glow.addColorStop(0, `rgba(213,166,79,${0.11 + progress * 0.04})`);
      glow.addColorStop(0.35, 'rgba(47,92,137,.07)');
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      raf = requestAnimationFrame(draw);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else {
        last = performance.now();
        raf = requestAnimationFrame(draw);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);
    raf = requestAnimationFrame(draw);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      cancelAnimationFrame(raf);
    };
  }, [progressRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  );
}
