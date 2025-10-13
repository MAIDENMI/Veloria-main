'use client';

import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { useAspect } from '@react-three/drei';
import RealBrain3D from './real-brain-3d';
import { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Mesh } from 'three';

// Removed complex WebGPU code for better compatibility

const WIDTH = 300;
const HEIGHT = 300;

// Simple animated brain component
const BrainMesh = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.elapsedTime * 0.3;
      meshRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.5) * 0.1;
      
      const pulse = 1 + Math.sin(clock.elapsedTime * 2) * 0.1;
      meshRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial 
        color="#8b5cf6" 
        transparent 
        opacity={0.8}
        emissive="#4c1d95"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
};

// Removed complex Scene component for simplicity

interface HeroFuturisticProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export const HeroFuturistic = ({ 
  title = "Breakthrough AI Therapy",
  subtitle = "Revolutionary mental health solutions powered by advanced AI",
  buttonText = "Get Early Access",
  onButtonClick
}: HeroFuturisticProps) => {
  const titleWords = title.split(' ');
  const [visibleWords, setVisibleWords] = useState(0);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [delays, setDelays] = useState<number[]>([]);
  const [subtitleDelay, setSubtitleDelay] = useState(0);

  useEffect(() => {
    // Generate random delays for glitch effect on client only
    setDelays(titleWords.map(() => Math.random() * 0.07));
    setSubtitleDelay(Math.random() * 0.1);
  }, [titleWords.length]);

  useEffect(() => {
    if (visibleWords < titleWords.length) {
      const timeout = setTimeout(() => setVisibleWords(visibleWords + 1), 600);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => setSubtitleVisible(true), 800);
      return () => clearTimeout(timeout);
    }
  }, [visibleWords, titleWords.length]);

  return (
    <div className="h-screen relative overflow-hidden bg-black">
      {/* Text Overlay */}
      <div className="h-screen uppercase items-center w-full absolute z-50 pointer-events-none px-10 flex justify-center flex-col">
        <div className="text-3xl md:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold">
          <div className="flex space-x-2 lg:space-x-6 overflow-hidden text-white">
            {titleWords.map((word, index) => (
              <div
                key={index}
                className={`transition-opacity duration-1000 ${index < visibleWords ? 'fade-in' : ''}`}
                style={{ 
                  animationDelay: `${index * 0.13 + (delays[index] || 0)}s`,
                  opacity: index < visibleWords ? undefined : 0 
                }}
              >
                {word}
              </div>
            ))}
          </div>
        </div>
        <div className="text-xs md:text-xl xl:text-2xl 2xl:text-3xl mt-2 overflow-hidden text-white font-bold normal-case">
          <div
            className={`transition-opacity duration-1000 ${subtitleVisible ? 'fade-in-subtitle' : ''}`}
            style={{ 
              animationDelay: `${titleWords.length * 0.13 + 0.2 + subtitleDelay}s`,
              opacity: subtitleVisible ? undefined : 0 
            }}
          >
            {subtitle}
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <button
        className="explore-btn pointer-events-auto"
        style={{ animationDelay: '2.2s' }}
        onClick={onButtonClick}
      >
        {buttonText}
        <span className="explore-arrow">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="arrow-svg">
            <path d="M11 5V17" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M6 12L11 17L16 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </span>
      </button>

      {/* 3D Canvas */}
      <Canvas
        className="absolute inset-0"
        camera={{ position: [0, 0, 8], fov: 60 }}
      >
        {/* Real 3D Brain Model */}
        <RealBrain3D 
          scale={1.2}
          position={[0, 0, 0]}
          rotationSpeed={0.015}
        />
        
        {/* Cool, clinical lighting for holographic effect */}
        <ambientLight intensity={0.3} color="#e0f7fa" />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#40e0d0" />
        <pointLight position={[-10, -10, 10]} intensity={1.0} color="#87ceeb" />
        <pointLight position={[0, 10, -10]} intensity={0.8} color="#b0e0e6" />
        <directionalLight position={[0, 0, 15]} intensity={0.6} color="#f0f8ff" />
      </Canvas>
    </div>
  );
};

export default HeroFuturistic;
