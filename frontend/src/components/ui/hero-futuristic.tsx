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
    }
  }, [visibleWords, titleWords.length]);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Content - positioned on the left */}
      <div className="relative z-10 flex flex-col justify-center min-h-screen px-8 lg:px-16 w-1/2">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
            BREAKTHROUGH AI THERAPY
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl leading-relaxed">
          Revolutionary mental health solutions powered by advanced AI, voice interaction, and immersive 3D experiences
        </p>
      </div>

      {/* CTA Button - positioned in left section */}
      <div className="absolute bottom-20 left-8 lg:left-16 z-20">
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
      </div>

      {/* 3D Canvas - positioned on the right */}
      <div className="absolute right-0 top-0 w-1/2 h-full">
        <Canvas
          className="w-full h-full"
          camera={{ position: [0, 0, 8], fov: 60 }}
        >
          {/* Real 3D Brain Model */}
          <RealBrain3D 
            scale={1.2}
            position={[0, 0, 0]}
            rotationSpeed={0.015}
          />
          
          {/* Warm, uplifting lighting */}
          <ambientLight intensity={0.3} color="#fef3c7" />
          <pointLight position={[10, 10, 10]} intensity={1.8} color="#fbbf24" />
          <pointLight position={[-10, -10, 10]} intensity={1.5} color="#10b981" />
          <pointLight position={[0, 10, -10]} intensity={1.2} color="#3b82f6" />
          <pointLight position={[8, -8, 8]} intensity={1.0} color="#a855f7" />
          <directionalLight position={[0, 0, 15]} intensity={0.5} color="#ffffff" />
        </Canvas>
      </div>
    </div>
  );
};

export default HeroFuturistic;
