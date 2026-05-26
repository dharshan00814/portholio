import React, { useEffect, useRef } from 'react';

export default function MatrixBackground(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const fontSizeBase = Math.max(12, Math.floor(Math.min(width / 60, 18)));
    let columns = Math.floor(width / fontSizeBase);
    const drops: number[] = Array(columns).fill(1);

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      const newFont = Math.max(10, Math.floor(Math.min(width / 60, 18)));
      ctx.font = `${newFont}px monospace`;
      const newCols = Math.floor(width / newFont) || 1;
      columns = newCols;
      drops.length = columns;
      for (let i = 0; i < columns; i++) drops[i] = drops[i] || 1;
    }

    function draw() {
      if (!ctx) return;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
      ctx.fillRect(0, 0, width, height);

      const fontSize = Math.max(12, Math.floor(Math.min(width / 60, 18)));
      // themed red matrix
      ctx.fillStyle = '#ff3b3b';
      ctx.textBaseline = 'top';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
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

  return <canvas ref={canvasRef} className="matrix-canvas" />;
}
