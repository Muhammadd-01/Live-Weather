"use client";

import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useWeather } from "../../context/WeatherContext";

const BackgroundAnimation = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();
  const { currentWeather } = useWeather();

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current?.appendChild(renderer.domElement);

    // Determine weather condition
    let weatherEffect = "clear";
    if (currentWeather) {
      const weatherId = currentWeather.weather[0].id;
      if (weatherId >= 200 && weatherId < 300) {
        weatherEffect = "windy"; // Thunderstorm
      } else if (weatherId >= 300 && weatherId < 600) {
        weatherEffect = "rain"; // Rain
      } else if (weatherId >= 600 && weatherId < 700) {
        weatherEffect = "snow"; // Snow
      } else if (weatherId >= 700 && weatherId < 800) {
        weatherEffect = "windy"; // Mist/Fog
      } else if (weatherId > 800) {
        weatherEffect = "cloudy"; // Cloudy
      }
    }

    // Particle system properties
    let color = 0xffffff;
    let particleCount = 300;
    let velocity = { x: 0, y: -0.01, z: 0 };

    if (weatherEffect === "snow") {
      color = 0xffffff;
      particleCount = 200;
      velocity = { x: Math.random() * 0.02 - 0.01, y: -0.02, z: 0 };
    } else if (weatherEffect === "rain") {
      color = 0x6699ff;
      particleCount = 400;
      velocity = { x: 0, y: -0.08, z: 0 }; // Faster falling
    } else if (weatherEffect === "windy") {
      color = 0xaaaaaa;
      particleCount = 150;
      velocity = { x: -0.05, y: -0.005, z: 0 }; // Sideways motion
    } else if (weatherEffect === "cloudy") {
      color = 0x999999;
      particleCount = 100;
      velocity = { x: 0.005, y: 0, z: 0 }; // Slow horizontal movement
    }

    const particles: { velocity: THREE.Vector3 }[] = [];
    const particleMaterial = new THREE.PointsMaterial({
      size: weatherEffect === "rain" ? 0.05 : 0.1,
      transparent: true,
      color: color,
    });

    const particleGeometry = new THREE.BufferGeometry();
    const positions: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      positions.push((Math.random() - 0.5) * 10, Math.random() * 10, (Math.random() - 0.5) * 10);
      particles.push({
        velocity: new THREE.Vector3(
          velocity.x + (Math.random() - 0.5) * 0.02,
          velocity.y + (Math.random() - 0.5) * 0.01,
          velocity.z
        ),
      });
    }

    particleGeometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    const animate = () => {
      requestAnimationFrame(animate);
      const positionsArray = particleGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positionsArray[i * 3] += particles[i].velocity.x;
        positionsArray[i * 3 + 1] += particles[i].velocity.y;

        // Reset particles when they move out of view
        if (positionsArray[i * 3 + 1] < -5) {
          positionsArray[i * 3 + 1] = 5;
          positionsArray[i * 3] = (Math.random() - 0.5) * 10;
        }
        if (weatherEffect === "windy" && positionsArray[i * 3] < -5) {
          positionsArray[i * 3] = 5;
        }
      }
      particleGeometry.attributes.position.needsUpdate = true;
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
        mountRef.current?.removeChild(renderer.domElement);
      }
    };
  }, [theme, currentWeather]);

  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default BackgroundAnimation;
