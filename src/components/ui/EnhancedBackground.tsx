"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import { useWeather } from "../../context/WeatherContext"
import { useTheme } from "../../context/ThemeContext"

const EnhancedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { currentWeather } = useWeather()
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: any[] = []
    const particleCount = 200
    const weather = currentWeather?.weather[0]?.main || "Clear"

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      type: string

      constructor(type: string) {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 5 + 1
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5
        this.color = theme === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)"
        this.type = type
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.type === "snow") {
          this.y += 0.5
        } else if (this.type === "heat") {
          this.y -= 0.5
        }

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
        if (this.y < 0 || this.y > canvas.height) {
          if (this.type === "snow") {
            this.y = 0
          } else if (this.type === "heat") {
            this.y = canvas.height
          } else {
            this.speedY *= -1
          }
        }
      }

      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()

        if (this.type === "snow") {
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        } else if (this.type === "heat") {
          ctx.moveTo(this.x, this.y)
          ctx.lineTo(this.x - this.size, this.y + this.size * 2)
          ctx.lineTo(this.x + this.size, this.y + this.size * 2)
        } else if (this.type === "cloud") {
          ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2)
        } else if (this.type === "wind") {
          ctx.moveTo(this.x, this.y)
          ctx.lineTo(this.x + this.size * 3, this.y)
        }

        ctx.fill()
      }
    }

    function init() {
      for (let i = 0; i < particleCount; i++) {
        const types = ["snow", "heat", "cloud", "wind"]
        const type = types[Math.floor(Math.random() * types.length)]
        particles.push(new Particle(type))
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()
      }
      requestAnimationFrame(animate)
    }

    init()
    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const handleMouseMove = (event: MouseEvent) => {
      const mouseX = event.clientX
      const mouseY = event.clientY

      particles.forEach((particle) => {
        const dx = mouseX - particle.x
        const dy = mouseY - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < 100) {
          particle.x -= dx * 0.05
          particle.y -= dy * 0.05
        }
      })
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [currentWeather, theme])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
}

export default EnhancedBackground

