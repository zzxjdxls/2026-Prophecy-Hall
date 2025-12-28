import React, { useRef, useEffect } from 'react';

const StarryBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    class Star {
      x: number;
      y: number;
      size: number;
      opacity: number;
      speed: number;
      delta: number;

      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random();
        this.speed = Math.random() * 0.05 + 0.01;
        this.delta = Math.random() * 0.02; // Twinkle speed
      }

      update() {
        this.y -= this.speed;
        if (this.y < 0) this.y = h;
        
        this.opacity += this.delta;
        if (this.opacity > 1 || this.opacity < 0.2) {
          this.delta = -this.delta;
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        c.fill();
      }
    }

    const stars: Star[] = Array.from({ length: 150 }, () => new Star());

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Gradient background drawn on canvas to blend nicely
      const gradient = ctx.createLinearGradient(0, 0, 0, h);
      gradient.addColorStop(0, '#0f172a'); // slate-900
      gradient.addColorStop(1, '#312e81'); // indigo-900
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      stars.forEach(star => {
        star.update();
        star.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
};

export default StarryBackground;
