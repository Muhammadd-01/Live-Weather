"use client";

import { useRef, useEffect, useState } from "react";
import { useWeather } from "../../context/WeatherContext";
import { useTheme } from "../../context/ThemeContext";

const EnhancedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { currentWeather } = useWeather();
  const { theme } = useTheme();
  const animationStateRef = useRef<"wind" | "clouds" | "snow">("wind");
  const particlesRef = useRef<any[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: any[] = [];
    const particleCount = 200;

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

        // Mouse interaction
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          this.x -= dx * 0.05;
          this.y -= dy * 0.05;
        }

        if (this.type === "snow") {
          this.y += 0.5;
          this.x += Math.sin(this.y * 0.01) * 0.5;
        } else if (this.type === "cloud") {
          this.x += 0.2;
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
      particles.length = 0; // Clear previous particles
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(animationStateRef.current));
      }
      particlesRef.current = particles;
    }

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update(mouseX, mouseY);
        particle.draw();
      });
      requestAnimationFrame(animate);
    }

    initParticles();
    animate();

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(); // Reinitialize particles
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // Transition between animation states
    const transitionInterval = setInterval(() => {
      animationStateRef.current =
        animationStateRef.current === "wind"
          ? "clouds"
          : animationStateRef.current === "clouds"
          ? "snow"
          : "wind";
      initParticles(); // Recreate particles with new animation state
    }, 10000); // Change every 10 seconds

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      clearInterval(transitionInterval);
    };
  }, [currentWeather, theme]);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default EnhancedBackground;
