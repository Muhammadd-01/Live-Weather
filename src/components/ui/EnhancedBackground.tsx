"use client";

import { useRef, useEffect } from "react";
import { useWeather } from "../../context/WeatherContext";
import { useTheme } from "../../context/ThemeContext";

const EnhancedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { currentWeather } = useWeather();
  const { theme } = useTheme();
  const animationStateRef = useRef<"wind" | "clouds" | "snow">("wind");
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(); // Reinitialize particles after resizing
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      type: string;

      constructor(type: string) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = theme === "dark" ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.6)";
        this.type = type;
      }

      update(mouseX: number, mouseY: number) {
        this.x += this.speedX;
        this.y += this.speedY;

        // Mouse interaction effect
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          this.x -= dx * 0.05;
          this.y -= dy * 0.05;
        }

        // Movement based on animation type
        if (this.type === "snow") {
          this.y += 0.5;
          this.x += Math.sin(this.y * 0.01) * 0.5;
        } else if (this.type === "cloud") {
          this.x += 0.2;
        } else if (this.type === "wind") {
          this.x += 1;
        }

        // Boundary checks
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.beginPath();

        if (this.type === "snow") {
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (this.type === "cloud") {
          ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (this.type === "wind") {
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(this.x + this.size * 3, this.y);
          ctx.strokeStyle = this.color;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    function initParticles() {
      particlesRef.current = [];
      for (let i = 0; i < 200; i++) {
        particlesRef.current.push(new Particle(animationStateRef.current));
      }
    }

    let mouseX = 0;
    let mouseY = 0;

    function handleMouseMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }

    function animate() {
      if (!canvas || !ctx) return; // Ensure context is available
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach((particle) => {
        particle.update(mouseX, mouseY);
        particle.draw(ctx);
      });
      requestAnimationFrame(animate);
    }

    // Initialize particles and start animation
    resizeCanvas();
    animate();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", resizeCanvas);

    // Transition between animation states
    const transitionInterval = setInterval(() => {
      animationStateRef.current =
        animationStateRef.current === "wind"
          ? "clouds"
          : animationStateRef.current === "clouds"
          ? "snow"
          : "wind";
      initParticles(); // Recreate particles with new animation state
    }, 10000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
      clearInterval(transitionInterval);
    };
  }, [currentWeather, theme]);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default EnhancedBackground;
