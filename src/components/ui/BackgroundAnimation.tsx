"use client"

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
    const mountElement = mountRef.current as HTMLDivElement;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountElement.appendChild(renderer.domElement);
    
    let weatherEffect = "clear";
    if (currentWeather) {
      const weatherId = currentWeather.weather[0].id;
      if (weatherId >= 200 && weatherId < 300) {
        weatherEffect = "windy"; 
      } else if (weatherId >= 600 && weatherId < 700) {
        weatherEffect = "snow"; 
      } else if (weatherId >= 700 && weatherId < 800) {
        weatherEffect = "heat"; 
      } else if (weatherId > 800) {
        weatherEffect = "cloudy"; 
      }
    }

    // Cloud effect
    const clouds: THREE.Sprite[] = [];
    const createClouds = () => {
      const cloudTexture = new THREE.TextureLoader().load("/textures/cloud.png");
      const cloudMaterial = new THREE.SpriteMaterial({ map: cloudTexture, transparent: true });
      for (let i = 0; i < 10; i++) {
        const cloud = new THREE.Sprite(cloudMaterial);
        cloud.position.set((Math.random() - 0.5) * 10, Math.random() * 5, (Math.random() - 0.5) * 10);
        cloud.scale.set(3, 3, 3);
        scene.add(cloud);
        clouds.push(cloud);
      }
    };

    // Crystalline Snowfall Effect
    const snowParticles: THREE.Mesh[] = [];
    const createSnow = () => {
      for (let i = 0; i < 200; i++) {
        const particle = new THREE.Mesh(
          new THREE.SphereGeometry(0.05, 8, 8),
          new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5, metalness: 0.8 })
        );
        particle.position.set((Math.random() - 0.5) * 10, Math.random() * 10, (Math.random() - 0.5) * 10);
        scene.add(particle);
        snowParticles.push(particle);
      }
    };

    // Wind Effect
    const windParticles: THREE.Mesh[] = [];
    const createWind = () => {
      for (let i = 0; i < 50; i++) {
        const wind = new THREE.Mesh(
          new THREE.PlaneGeometry(0.5, 0.1),
          new THREE.MeshBasicMaterial({ color: 0xaaaaaa, transparent: true, opacity: 0.5 })
        );
        wind.position.set((Math.random() - 0.5) * 10, Math.random() * 5, (Math.random() - 0.5) * 10);
        scene.add(wind);
        windParticles.push(wind);
      }
    };

    // Heat Waves Effect
    let heatEffect: THREE.Mesh | undefined;
    const createHeat = () => {
      const heatGeometry = new THREE.PlaneGeometry(10, 10);
      const heatMaterial = new THREE.MeshBasicMaterial({ color: 0xff4500, transparent: true, opacity: 0.2 });
      heatEffect = new THREE.Mesh(heatGeometry, heatMaterial);
      heatEffect.position.set(0, 0, -5);
      scene.add(heatEffect);
    };

    if (weatherEffect === "cloudy") {
      createClouds();
    } else if (weatherEffect === "snow") {
      createSnow();
    } else if (weatherEffect === "windy") {
      createWind();
    } else if (weatherEffect === "heat") {
      createHeat();
    }

    // Animate scene
    const animate = () => {
      requestAnimationFrame(animate);
      
      clouds.forEach(cloud => {
        cloud.position.x += 0.002;
        if (cloud.position.x > 5) cloud.position.x = -5;
      });

      snowParticles.forEach(particle => {
        particle.position.y -= 0.02;
        if (particle.position.y < -5) particle.position.y = 5;
      });

      windParticles.forEach(wind => {
        wind.position.x += 0.05;
        if (wind.position.x > 5) wind.position.x = -5;
      });

      if (heatEffect && heatEffect.material instanceof THREE.MeshBasicMaterial) {
        heatEffect.material.opacity = 0.2 + Math.sin(Date.now() * 0.002) * 0.1;
      }
      
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
      if (mountElement) {
        mountElement.removeChild(renderer.domElement);
      }
    };
  }, [theme, currentWeather]);

  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default BackgroundAnimation;
