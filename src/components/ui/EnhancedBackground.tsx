"use client";

import { useRef, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";

const WindBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const animationFrameRef = useRef<number | null>(null);
  let mouseX = 0;
  let mouseY = 0;
  const audio = new Audio("/crystal-break.mp3");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Snowflake {
      x: number;
      y: number;
      size: number;
      speed: number;
      angle: number;
      opacity: number;
      broken: boolean;
      breakingFrames: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 8 + 4;
        this.speed = Math.random() * 1.5 + 0.5;
        this.angle = Math.random() * Math.PI * 2;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.broken = false;
        this.breakingFrames = 0;
      }

      update() {
        if (this.broken) {
          this.breakingFrames++;
          if (this.breakingFrames > 15) {
            this.reset();
          }
        } else {
          this.y += this.speed;
          this.x += Math.sin(this.angle) * 0.5;
          this.angle += 0.01;

          if (this.y > canvas.height) {
            this.reset();
          }
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        const snowflakeColor = theme === "dark" ? "255, 255, 255" : "0, 0, 0"; // White in dark mode, black in light mode
        
        if (this.broken) {
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const x1 = this.x + (this.size * 2 * Math.cos(this.angle + (i * Math.PI) / 3));
            const y1 = this.y + (this.size * 2 * Math.sin(this.angle + (i * Math.PI) / 3));
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(x1, y1);
          }
          ctx.strokeStyle = `rgba(${snowflakeColor}, ${1 - this.breakingFrames / 15})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        } else {
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const x1 = this.x + this.size * Math.cos(this.angle + (i * Math.PI) / 3);
            const y1 = this.y + this.size * Math.sin(this.angle + (i * Math.PI) / 3);
            ctx.lineTo(x1, y1);
          }
          ctx.closePath();
          ctx.fillStyle = `rgba(${snowflakeColor}, ${this.opacity})`;
          ctx.fill();
        }
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = 0;
        this.broken = false;
        this.breakingFrames = 0;
      }
    }

    const snowflakes: Snowflake[] = Array.from({ length: 80 }, () => new Snowflake());

    function handleMouseMove(event: MouseEvent) {
      mouseX = event.clientX;
      mouseY = event.clientY;
    }

    function handleClick(event: MouseEvent) {
      const clickX = event.clientX;
      const clickY = event.clientY;

      snowflakes.forEach((flake) => {
        const dx = flake.x - clickX;
        const dy = flake.y - clickY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < flake.size * 2 && !flake.broken) {
          flake.broken = true;
          audio.currentTime = 0;
          audio.play();
        }
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      snowflakes.forEach((flake) => {
        flake.update();
        flake.draw(ctx);
      });
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    resizeCanvas();
    animate();

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 bg-transparent" />;
};

export default WindBackground;
