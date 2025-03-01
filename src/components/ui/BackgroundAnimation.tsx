"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "../../context/ThemeContext"
import { useWeather } from "../../context/WeatherContext"

const BackgroundAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const { currentWeather } = useWeather()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", resizeCanvas)

    // Determine background style based on weather and theme
    let particleColor = theme === "dark" ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.1)"
    let particleCount = 50
    let particleSpeed = 0.2

    if (currentWeather) {
      const weatherId = currentWeather.weather[0].id

      // Rain
      if (weatherId >= 200 && weatherId < 600) {
        particleColor = theme === "dark" ? "rgba(120, 160, 255, 0.5)" : "rgba(100, 140, 255, 0.3)"
        particleCount = 100
        particleSpeed = 5
      }
      // Snow
      else if (weatherId >= 600 && weatherId < 700) {
        particleColor = "rgba(255, 255, 255, 0.8)"
        particleCount = 80
        particleSpeed = 1
      }
      // Clear
      else if (weatherId === 800) {
        particleColor = theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 215, 0, 0.2)"
        particleCount = 30
        particleSpeed = 0.1
      }
      // Clouds
      else if (weatherId > 800) {
        particleColor = theme === "dark" ? "rgba(200, 200, 200, 0.3)" : "rgba(100, 100, 100, 0.2)"
        particleCount = 40
        particleSpeed = 0.3
      }
    }

    // Create particles
    const particles: { x: number; y: number; size: number; speedX: number; speedY: number }[] = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 5 + 1,
        speedX: (Math.random() - 0.5) * particleSpeed,
        speedY: (Math.random() - 0.5) * particleSpeed,
      })
    }

    // Mouse interaction
    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        // Draw particle
        ctx.fillStyle = particleColor
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Mouse interaction - particles move away from mouse
        const dx = mouseX - particle.x
        const dy = mouseY - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          const angle = Math.atan2(dy, dx)
          particle.x -= Math.cos(angle) * 1
          particle.y -= Math.sin(angle) * 1
        }

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [theme, currentWeather])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none" />
}

export default BackgroundAnimation

