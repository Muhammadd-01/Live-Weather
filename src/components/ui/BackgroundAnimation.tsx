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

    let particles: any[] = []
    let weatherType = "clear"
    let particleColor = "rgba(255, 255, 255, 0.3)"
    let particleCount = 50
    let particleSpeed = 1
    let particleSize = 2

    if (currentWeather) {
      const weatherId = currentWeather.weather[0].id
      if (weatherId >= 200 && weatherId < 300) {
        weatherType = "storm"
        particleColor = "rgba(120, 160, 255, 0.7)"
        particleCount = 100
        particleSpeed = 7
      } else if (weatherId >= 300 && weatherId < 600) {
        weatherType = "rain"
        particleColor = "rgba(100, 140, 255, 0.5)"
        particleCount = 120
        particleSpeed = 5
      } else if (weatherId >= 600 && weatherId < 700) {
        weatherType = "snow"
        particleColor = "rgba(255, 255, 255, 0.8)"
        particleCount = 80
        particleSpeed = 2
        particleSize = 4
      } else if (weatherId >= 700 && weatherId < 800) {
        weatherType = "fog"
        particleColor = "rgba(200, 200, 200, 0.2)"
        particleCount = 40
        particleSpeed = 0.5
        particleSize = 50
      } else if (weatherId === 800) {
        weatherType = "clear"
        particleColor = "rgba(255, 215, 0, 0.2)"
        particleCount = 30
        particleSpeed = 0.1
      } else if (weatherId > 800) {
        weatherType = "clouds"
        particleColor = "rgba(100, 100, 100, 0.2)"
        particleCount = 60
        particleSpeed = 0.5
        particleSize = 30
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * particleSize + 1,
        speedX: (Math.random() - 0.5) * particleSpeed,
        speedY: Math.random() * particleSpeed,
      })
    }

    let mouseX = 0
    let mouseY = 0
    window.addEventListener("mousemove", (event) => {
      mouseX = event.clientX
      mouseY = event.clientY
    })

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particleColor
        ctx.fill()

        let dx = (mouseX - particle.x) * 0.001
        let dy = (mouseY - particle.y) * 0.001

        particle.x += particle.speedX + dx
        particle.y += particle.speedY + dy

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
