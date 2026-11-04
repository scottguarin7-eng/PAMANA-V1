import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  pulseSpeed: number;
  pulseOffset: number;
  hue: 'gold' | 'terracotta' | 'teal';
}

export const AmbientGoldCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = { x: width * 0.5, y: height * 0.35, active: false };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const count = Math.min(55, Math.floor((width * height) / 28000));
    const particles: Particle[] = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.22,
      vy: -0.12 - Math.random() * 0.25,
      size: 1 + Math.random() * 2.2,
      alpha: 0.15 + Math.random() * 0.55,
      pulseSpeed: 0.01 + Math.random() * 0.02,
      pulseOffset: i * 0.7,
      hue: i % 6 === 0 ? 'terracotta' : i % 8 === 0 ? 'teal' : 'gold',
    }));

    let tick = 0;

    const render = () => {
      tick += 1;
      ctx.clearRect(0, 0, width, height);

      // Soft cursor spotlight
      if (mouse.active) {
        const grad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          10,
          mouse.x,
          mouse.y,
          360
        );
        grad.addColorStop(0, 'rgba(229, 184, 92, 0.065)');
        grad.addColorStop(0.5, 'rgba(200, 109, 81, 0.025)');
        grad.addColorStop(1, 'rgba(5, 7, 14, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Gentle cursor repulsion/swirl
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 22000 && distSq > 1) {
            const dist = Math.sqrt(distSq);
            p.x += (dx / dist) * 0.45;
            p.y += (dy / dist) * 0.45;
          }
        }

        const currentAlpha =
          p.alpha * (0.65 + 0.35 * Math.sin(tick * p.pulseSpeed + p.pulseOffset));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        if (p.hue === 'gold') {
          ctx.fillStyle = `rgba(229, 184, 92, ${currentAlpha})`;
        } else if (p.hue === 'terracotta') {
          ctx.fillStyle = `rgba(200, 109, 81, ${currentAlpha})`;
        } else {
          ctx.fillStyle = `rgba(42, 157, 143, ${currentAlpha})`;
        }
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-85"
      aria-hidden="true"
    />
  );
};
