"use client"

import { useRef, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Clouds, Cloud, Sky } from "@react-three/drei"
import * as THREE from "three"
import { useWeather } from "../../context/WeatherContext"
import { useTheme } from "../../context/ThemeContext"

const WeatherParticles = ({ count = 1000, weather }) => {
  const particles = useRef()
  const { viewport } = useThree()

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 0.1
    particles.current.rotation.x = Math.cos(t / 4) / 8
    particles.current.rotation.y = Math.sin(t / 4) / 8
    particles.current.rotation.z = Math.sin(t / 4) / 20
    particles.current.position.y = Math.sin(t / 2) / 10
  })

  let particleColor = new THREE.Color(0xffffff)
  let particleSize = 0.02
  let particleSpeed = 0.01

  switch (weather) {
    case "Rain":
      particleColor = new THREE.Color(0x6699cc)
      particleSize = 0.03
      particleSpeed = 0.05
      break
    case "Snow":
      particleColor = new THREE.Color(0xffffff)
      particleSize = 0.04
      particleSpeed = 0.02
      break
    case "Clear":
      particleColor = new THREE.Color(0xffff99)
      particleSize = 0.01
      particleSpeed = 0.005
      break
    case "Clouds":
      particleColor = new THREE.Color(0xcccccc)
      particleSize = 0.03
      particleSpeed = 0.01
      break
    default:
      break
  }

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attachObject={["attributes", "position"]}
          count={count}
          array={new Float32Array(count * 3)}
          itemSize={3}
          usage={THREE.DynamicDrawUsage}
        />
      </bufferGeometry>
      <pointsMaterial
        size={particleSize}
        color={particleColor}
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

const WeatherBackground = () => {
  const { currentWeather } = useWeather()
  const { theme } = useTheme()
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event) => {
      mouseRef.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const weather = currentWeather?.weather[0]?.main || "Clear"

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Sky
          distance={450000}
          sunPosition={[0, 1, 0]}
          inclination={0.5}
          azimuth={0.25}
          rayleigh={weather === "Clear" ? 1 : 3}
        />
        <Clouds material={THREE.MeshBasicMaterial}>
          <Cloud opacity={0.5} speed={0.4} width={10} depth={1.5} segments={20} />
        </Clouds>
        <WeatherParticles count={2000} weather={weather} />
      </Canvas>
    </div>
  )
}

export default WeatherBackground

