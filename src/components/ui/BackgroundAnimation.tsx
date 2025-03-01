"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { useTheme } from "../../context/ThemeContext"
import { useWeather } from "../../context/WeatherContext"

const BackgroundAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const { currentWeather } = useWeather()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Determine background style based on weather and theme
    let particleColor = theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)"
    let particleCount = 100
    let particleSpeed = 0.2
    let particleSize = 2
    let windEffect = 0
    let gravity = 0

    if (currentWeather) {
      const weatherId = currentWeather.weather[0].id
      const windSpeed = currentWeather.wind.speed

      // Update particle properties based on weather conditions
      if (weatherId >= 200 && weatherId < 300) {
        // Thunderstorm
        particleColor = theme === "dark" ? "rgba(120, 160, 255, 0.7)" : "rgba(100, 140, 255, 0.5)"
        particleCount = 100
        particleSpeed = 7
        gravity = 1
      } else if (weatherId >= 300 && weatherId < 600) {
        // Rain
        particleColor = theme === "dark" ? "rgba(120, 160, 255, 0.5)" : "rgba(100, 140, 255, 0.3)"
        particleCount = weatherId >= 500 ? 150 : 80
        particleSpeed = weatherId >= 500 ? 10 : 7
        gravity = 1
        windEffect = windSpeed * 0.1
      } else if (weatherId >= 600 && weatherId < 700) {
        // Snow
        particleColor = "rgba(255, 255, 255, 0.8)"
        particleCount = 80
        particleSpeed = 1.5
        particleSize = 4
        windEffect = windSpeed * 0.2
      } else if (weatherId >= 700 && weatherId < 800) {
        // Fog/Mist
        particleColor = theme === "dark" ? "rgba(200, 200, 200, 0.2)" : "rgba(200, 200, 200, 0.3)"
        particleCount = 40
        particleSpeed = 0.5
        particleSize = 50
      } else if (weatherId === 800) {
        // Clear
        particleColor = theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 215, 0, 0.2)"
        particleCount = 30
        particleSpeed = 0.1
      } else if (weatherId > 800) {
        // Clouds
        particleColor = theme === "dark" ? "rgba(200, 200, 200, 0.3)" : "rgba(100, 100, 100, 0.2)"
        particleCount = 40
        particleSpeed = 0.3
        particleSize = 30
        windEffect = windSpeed * 0.05
      }
    }

    // Create particles
    const particles: any[] = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * particleSize + 1,
        speedX: (Math.random() - 0.5) * particleSpeed + windEffect,
        speedY: Math.random() * particleSpeed + gravity,
      })
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particleColor
        ctx.fill()

        particle.x += particle.speedX
        particle.y += particle.speedY

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
    }
  }, [theme, currentWeather])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
}

export default BackgroundAnimation

