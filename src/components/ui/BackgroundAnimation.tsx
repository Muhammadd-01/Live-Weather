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

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener("resize", handleResize)

    // Determine background style based on weather and theme
    let particleColor = theme === "dark" ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.1)"
    let particleCount = 50
    let particleSpeed = 0.2
    let particleSize = 2
    let particleShape = "circle" // circle, snowflake, raindrop, leaf
    let windEffect = 0
    let gravity = 0
    let particleOpacity = 0.5

    if (currentWeather) {
      const weatherId = currentWeather.weather[0].id
      const windSpeed = currentWeather.wind.speed

      // Thunderstorm
      if (weatherId >= 200 && weatherId < 300) {
        particleColor = theme === "dark" ? "rgba(120, 160, 255, 0.7)" : "rgba(100, 140, 255, 0.5)"
        particleCount = 100
        particleSpeed = 7
        particleShape = "raindrop"
        gravity = 1
        particleOpacity = 0.7

        // Add occasional lightning flash
        const lightningInterval = setInterval(() => {
          if (Math.random() > 0.7) {
            const alpha = theme === "dark" ? 0.2 : 0.1
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // Double flash effect
            setTimeout(() => {
              ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 1.5})`
              ctx.fillRect(0, 0, canvas.width, canvas.height)
            }, 50)
          }
        }, 3000)

        return () => clearInterval(lightningInterval)
      }
      // Rain
      else if (weatherId >= 300 && weatherId < 600 && weatherId !== 511) {
        particleColor = theme === "dark" ? "rgba(120, 160, 255, 0.5)" : "rgba(100, 140, 255, 0.3)"
        particleCount = weatherId >= 500 ? 150 : 80 // Heavy vs light rain
        particleSpeed = weatherId >= 500 ? 10 : 7
        particleShape = "raindrop"
        gravity = 1
        windEffect = windSpeed * 0.1
      }
      // Snow
      else if ((weatherId >= 600 && weatherId < 700) || weatherId === 511) {
        particleColor = "rgba(255, 255, 255, 0.8)"
        particleCount = 80
        particleSpeed = 1.5
        particleSize = 4
        particleShape = "snowflake"
        windEffect = windSpeed * 0.2
        particleOpacity = 0.9
      }
      // Fog/Mist
      else if (weatherId >= 700 && weatherId < 800) {
        particleColor = theme === "dark" ? "rgba(200, 200, 200, 0.2)" : "rgba(200, 200, 200, 0.3)"
        particleCount = 40
        particleSpeed = 0.5
        particleSize = 50
        particleOpacity = 0.2
      }
      // Clear
      else if (weatherId === 800) {
        particleColor = theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 215, 0, 0.2)"
        particleCount = 30
        particleSpeed = 0.1
        particleOpacity = 0.3
      }
      // Clouds
      else if (weatherId > 800) {
        particleColor = theme === "dark" ? "rgba(200, 200, 200, 0.3)" : "rgba(100, 100, 100, 0.2)"
        particleCount = 40
        particleSpeed = 0.3
        particleSize = 30
        particleShape = "cloud"
        windEffect = windSpeed * 0.05
      }

      // Adjust for wind speed
      if (windSpeed > 5) {
        windEffect = windSpeed * 0.15
        particleCount = Math.min(particleCount + Math.floor(windSpeed), 200)

        if (weatherId === 800 || (weatherId > 800 && weatherId < 900)) {
          particleShape = "leaf"
          particleCount = 20 + Math.floor(windSpeed * 2)
          particleSpeed = 1 + windSpeed * 0.2
        }
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
        opacity: Math.random() * 0.5 + particleOpacity,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2,
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

    // Draw functions for different particle shapes
    const drawParticle = (particle: any) => {
      ctx.globalAlpha = particle.opacity

      if (particleShape === "circle") {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particleColor
        ctx.fill()
      } else if (particleShape === "snowflake") {
        ctx.save()
        ctx.translate(particle.x, particle.y)
        ctx.rotate((particle.rotation * Math.PI) / 180)

        // Draw snowflake
        ctx.strokeStyle = particleColor
        ctx.lineWidth = 1
        const size = particle.size * 1.5

        // Draw 3 lines crossing at center
        for (let i = 0; i < 3; i++) {
          ctx.beginPath()
          ctx.moveTo(0, -size)
          ctx.lineTo(0, size)
          ctx.stroke()
          ctx.rotate(Math.PI / 3)
        }

        ctx.restore()

        // Update rotation
        particle.rotation += particle.rotationSpeed
      } else if (particleShape === "raindrop") {
        ctx.beginPath()
        ctx.moveTo(particle.x, particle.y)
        ctx.lineTo(particle.x, particle.y + particle.size * 2)
        ctx.strokeStyle = particleColor
        ctx.lineWidth = 1
        ctx.stroke()
      } else if (particleShape === "leaf") {
        ctx.save()
        ctx.translate(particle.x, particle.y)
        ctx.rotate((particle.rotation * Math.PI) / 180)

        // Draw leaf
        ctx.beginPath()
        ctx.ellipse(0, 0, particle.size * 2, particle.size, 0, 0, Math.PI * 2)
        ctx.fillStyle =
          theme === "dark" ? `hsl(${Math.random() * 60 + 10}, 70%, 30%)` : `hsl(${Math.random() * 60 + 10}, 80%, 40%)`
        ctx.fill()

        // Leaf vein
        ctx.beginPath()
        ctx.moveTo(-particle.size * 2, 0)
        ctx.lineTo(particle.size * 2, 0)
        ctx.strokeStyle = theme === "dark" ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)"
        ctx.lineWidth = 0.5
        ctx.stroke()

        ctx.restore()

        // Update rotation with wind effect
        particle.rotation += particle.rotationSpeed + windEffect * 0.5
      } else if (particleShape === "cloud") {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.arc(particle.x + particle.size * 0.5, particle.y - particle.size * 0.4, particle.size * 0.7, 0, Math.PI * 2)
        ctx.arc(particle.x - particle.size * 0.5, particle.y - particle.size * 0.4, particle.size * 0.7, 0, Math.PI * 2)
        ctx.fillStyle = particleColor
        ctx.fill()
      }

      ctx.globalAlpha = 1
    }

    // Animation loop
    const animate = () => {
      // Use a semi-transparent clear to create trail effect for some weather types
      if (particleShape === "raindrop" || particleShape === "snowflake") {
        ctx.fillStyle = theme === "dark" ? "rgba(15, 23, 42, 0.3)" : "rgba(249, 250, 251, 0.3)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }

      particles.forEach((particle) => {
        // Draw particle
        drawParticle(particle)

        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Mouse interaction - particles move away from mouse
        const dx = mouseX - particle.x
        const dy = mouseY - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          const angle = Math.atan2(dy, dx)
          const force = (100 - distance) / 100
          particle.x -= Math.cos(angle) * force * 2
          particle.y -= Math.sin(angle) * force * 2
        }

        // Wrap around edges with some offset to avoid instant reappearance
        if (particle.x < -50) particle.x = canvas.width + 50
        if (particle.x > canvas.width + 50) particle.x = -50

        // For rain and snow, reset to top when they fall off screen
        if (particleShape === "raindrop" || particleShape === "snowflake") {
          if (particle.y > canvas.height) {
            particle.y = -10
            particle.x = Math.random() * canvas.width
          }
        } else {
          if (particle.y < -50) particle.y = canvas.height + 50
          if (particle.y > canvas.height + 50) particle.y = -50
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [theme, currentWeather])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
}

export default BackgroundAnimation

