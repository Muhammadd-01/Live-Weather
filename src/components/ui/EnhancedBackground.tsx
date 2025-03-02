"use client";

import { useRef, useEffect } from "react";
import { useWeather } from "../../context/WeatherContext";
import { useTheme } from "../../context/ThemeContext";

const EnhancedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { currentWeather } = useWeather();
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles: Particle[] = [];
    const particleCount = 200;
    const weather = currentWeather?.weather[0]?.main || "Clear";
    let animationId: number; // Store animation frame ID

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

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.type === "snow") {
          this.y += 0.5;
          this.x += Math.sin(this.y * 0.01) * 0.5;
        } else if (this.type === "heat") {
          this.y -= 0.5;
          this.x += Math.sin(this.y * 0.01) * 0.3;
        } else if (this.type === "wind") {
          this.x += 1;
        }

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();

        if (this.type === "snow") {
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        } else if (this.type === "heat") {
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(this.x - this.size, this.y + this.size * 2);
          ctx.lineTo(this.x + this.size, this.y + this.size * 2);
        } else if (this.type === "wind") {
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(this.x + this.size * 3, this.y);
        }

        ctx.fill();
      }
    }

    function initParticles() {
      particles = []; // Fix: Clear old particles before re-initializing
      for (let i = 0; i < particleCount; i++) {
        let type;
        if (weather === "Snow") {
          type = "snow";
        } else if (weather === "Clear" && currentWeather?.main?.temp > 25) {
          type = "heat";
        } else if (currentWeather?.wind?.speed > 5) {
          type = "wind";
        } else {
          type = ["snow", "heat", "wind"][Math.floor(Math.random() * 3)];
        }
        particles.push(new Particle(type));
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      animationId = requestAnimationFrame(animateParticles);
    }

    // Initialize and animate
    initParticles();
    animateParticles();

    // Handle Resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(); // Fix: Reset particles on resize
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId); // Fix: Stop animation when component unmounts
    };
  }, [currentWeather, theme]);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default EnhancedBackground;
