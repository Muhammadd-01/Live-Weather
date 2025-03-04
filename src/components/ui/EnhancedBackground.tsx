"use client";

import { useRef, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";

const WindBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const animationFrameRef = useRef<number | null>(null);
  let mouseX = 0;
  let mouseY = 0;

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

    class WindParticle {
      x: number;
      y: number;
      speed: number;
      size: number;
      angle: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speed = Math.random() * 2 + 1;
        this.size = Math.random() * 3 + 1;
        this.angle = Math.random() * Math.PI * 2;
        this.opacity = Math.random() * 0.5 + 0.3;
      }

      update() {
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          this.angle += 0.1; // Slight deflection towards mouse
          this.speed = 3;
        } else {
          this.speed = Math.random() * 2 + 1;
        }

        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);
        this.angle += 0.02;

        if (this.x > canvas.width) this.x = 0;
        if (this.y > canvas.height) this.y = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y < 0) this.y = canvas.height;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
      }
    }

    const windParticles: WindParticle[] = Array.from({ length: 80 }, () => new WindParticle());

    function handleMouseMove(event: MouseEvent) {
      mouseX = event.clientX;
      mouseY = event.clientY;
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      windParticles.forEach((particle) => {
        particle.update();
        particle.draw(ctx);
      });
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    resizeCanvas();
    animate();

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default WindBackground;