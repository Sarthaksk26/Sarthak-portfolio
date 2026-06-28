import React, { useEffect, useRef } from 'react';

class Particle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  opacity: number;
  canvasWidth: number;
  canvasHeight: number;

  constructor(width: number, height: number) {
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * 2 + 1;
    this.vx = Math.random() * 0.4 - 0.2;
    this.vy = Math.random() * 0.4 - 0.2;
    this.opacity = Math.random() * 0.3 + 0.1;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  update(mouseX: number, mouseY: number, radius: number) {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0) this.x = this.canvasWidth;
    if (this.x > this.canvasWidth) this.x = 0;
    if (this.y < 0) this.y = this.canvasHeight;
    if (this.y > this.canvasHeight) this.y = 0;

    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < radius) {
      const forceDirectionX = dx / distance;
      const forceDirectionY = dy / distance;
      const force = (radius - distance) / radius;
      const directionX = forceDirectionX * force * 5;
      const directionY = forceDirectionY * force * 5;

      this.x -= directionX;
      this.y -= directionY;
    }
  }
}

const ParticleField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0, radius: 120 });
  const initTimeoutRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // debounce particle re-init to avoid GC thrash on fast resize
      clearTimeout(initTimeoutRef.current);
      initTimeoutRef.current = window.setTimeout(init, 150);
    };

    const init = () => {
      particles = [];
      for (let i = 0; i < 80; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update(mouse.current.x, mouse.current.y, mouse.current.radius);
        p.draw(ctx);
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(initTimeoutRef.current);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />
  );
};

export default ParticleField;
