import { useEffect, useRef } from 'react';

export default function MatrixBackground(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const fontSize = 14;
    let columns = Math.floor(width / fontSize);
    let drops: number[] = [];
    let speeds: number[] = [];

    const chars =
      'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF{}[]<>/\\|!@#$%^&*';

    function initDrops() {
      drops = Array.from({ length: columns }, () =>
        Math.random() * (height / fontSize)
      );
      speeds = Array.from({ length: columns }, () =>
        0.4 + Math.random() * 0.8
      );
    }

    initDrops();

    function resize() {
      if (!canvas || !ctx) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.floor(width / fontSize);
      initDrops();
    }

    function draw() {
      if (!ctx) return;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);
      ctx.font = `${fontSize}px "Courier New", monospace`;
      ctx.textBaseline = 'top';

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Gradient from red (#EF4444) to orange (#FB923C)
        const progress = (y / height);
        const r = Math.round(239 + (251 - 239) * progress);
        const g = Math.round(68 + (146 - 68) * progress);
        const b = Math.round(68 + (60 - 68) * progress);

        // Head character is brighter
        const isHead = Math.random() > 0.92;
        if (isHead) {
          ctx.fillStyle = `rgba(255, 200, 150, 0.95)`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#FB923C';
        } else {
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.5 + Math.random() * 0.4})`;
          ctx.shadowBlur = 0;
          ctx.shadowColor = 'transparent';
        }

        ctx.fillText(text, x, y);
        ctx.shadowBlur = 0;

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += speeds[i];
      }
      raf = requestAnimationFrame(draw);
    }

    let raf = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="matrix-canvas" aria-hidden="true" />;
}
