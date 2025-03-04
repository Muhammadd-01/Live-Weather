"use client";

import { useRef, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";

const WindBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas to fill the screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class WindSwirl {
      x: number;
      y: number;
      radius: number;
      speedX: number;
      speedY: number;
      angle: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 15 + 5;
        this.speedX = Math.random() * 1.5 + 0.5;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.angle = Math.random() * Math.PI * 2;
        this.opacity = Math.random() * 0.5 + 0.3;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY + Math.sin(this.angle) * 1.5;
        this.angle += 0.1;

        if (this.x > canvas.width) {
          this.x = 0;
          this.y = Math.random() * canvas.height;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const angleOffset = (Math.PI / 2) * i;
          const swirlX = this.x + Math.cos(this.angle + angleOffset) * this.radius;
          const swirlY = this.y + Math.sin(this.angle + angleOffset) * this.radius;
          ctx.lineTo(swirlX, swirlY);
        }
        ctx.stroke();
      }
    }

    const windSwirls: WindSwirl[] = Array.from({ length: 50 }, () => new WindSwirl());

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      windSwirls.forEach((swirl) => {
        swirl.update();
        swirl.draw(ctx);
      });
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    resizeCanvas();
    animate();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default WindBackground;
