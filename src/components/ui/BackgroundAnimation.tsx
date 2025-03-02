"use client"

import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useWeather } from "../../context/WeatherContext";

const BackgroundAnimation = () => {
  const mountRef = useRef(null);
  const { theme } = useTheme();
  const { currentWeather } = useWeather();

  useEffect(() => {
    if (!mountRef.current) return; // Ensure mountRef is not null
  
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
  
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Append only if mountRef.current is valid
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }
  
    let particles, particleMaterial;
    const particleCount = 500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
  
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }
  
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  
    let color = 0xffffff;
    if (currentWeather) {
      const weatherId = currentWeather.weather[0].id;
      if (weatherId >= 200 && weatherId < 300) {
        color = 0x5b9bd5; // Thunderstorm
      } else if (weatherId >= 300 && weatherId < 600) {
        color = 0x6699ff; // Rain
      } else if (weatherId >= 600 && weatherId < 700) {
        color = 0xffffff; // Snow
      } else if (weatherId === 800) {
        color = theme === "dark" ? 0xffffff : 0xffd700; // Clear
      } else {
        color = 0x999999; // Clouds
      }
    }
  
    particleMaterial = new THREE.PointsMaterial({ size: 0.1, color });
    particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);
  
    let mouseX = 0, mouseY = 0;
    window.addEventListener("mousemove", (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });
  
    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.x += 0.001 + mouseY * 0.001;
      particles.rotation.y += 0.001 + mouseX * 0.001;
      renderer.render(scene, camera);
    };
  
    animate();
  
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
  
    return () => {
      window.removeEventListener("resize", handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [theme, currentWeather]);
  
  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default BackgroundAnimation;
