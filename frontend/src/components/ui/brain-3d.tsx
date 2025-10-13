'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Brain3DProps {
  scale?: number;
  position?: [number, number, number];
  rotationSpeed?: number;
  pulseIntensity?: number;
}

export const Brain3D = ({ 
  scale = 1, 
  position = [0, 0, 0], 
  rotationSpeed = 0.005,
  pulseIntensity = 0.1 
}: Brain3DProps) => {
  const brainRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const connectionsRef = useRef<THREE.LineSegments>(null);

  // Create brain structure with particles
  const { particles, connections } = useMemo(() => {
    const particleCount = 800;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    // Connection lines
    const connectionPositions = new Float32Array(600 * 6); // 600 lines, 2 points each
    const connectionColors = new Float32Array(600 * 6);
    
    // Brain-like shape parameters
    const brainWidth = 2.5;
    const brainHeight = 2;
    const brainDepth = 2.2;
    
    let connectionIndex = 0;
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Create brain-like ellipsoid shape with some randomness
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      
      // Add some noise for organic shape
      const noise = 0.3 + Math.random() * 0.4;
      const r = noise;
      
      // Brain-like proportions
      const x = r * Math.sin(phi) * Math.cos(theta) * brainWidth;
      const y = r * Math.cos(phi) * brainHeight;
      const z = r * Math.sin(phi) * Math.sin(theta) * brainDepth;
      
      // Add wrinkles and folds typical of brain surface
      const wrinkle = Math.sin(x * 3) * Math.sin(y * 4) * Math.sin(z * 3) * 0.1;
      
      positions[i3] = x + wrinkle;
      positions[i3 + 1] = y + wrinkle;
      positions[i3 + 2] = z + wrinkle;
      
      // Color gradient from deep purple to bright cyan
      const intensity = 0.3 + Math.random() * 0.7;
      colors[i3] = 0.4 * intensity;     // R - purple/blue
      colors[i3 + 1] = 0.1 * intensity; // G - minimal green
      colors[i3 + 2] = 0.8 * intensity; // B - strong blue
      
      // Varying particle sizes
      sizes[i] = Math.random() * 3 + 1;
      
      // Create neural connections between nearby particles
      if (connectionIndex < 600 * 6 && i > 0 && Math.random() < 0.15) {
        const prevIndex = Math.floor(Math.random() * i) * 3;
        
        // Connection line from current particle to a previous one
        connectionPositions[connectionIndex] = positions[i3];
        connectionPositions[connectionIndex + 1] = positions[i3 + 1];
        connectionPositions[connectionIndex + 2] = positions[i3 + 2];
        
        connectionPositions[connectionIndex + 3] = positions[prevIndex];
        connectionPositions[connectionIndex + 4] = positions[prevIndex + 1];
        connectionPositions[connectionIndex + 5] = positions[prevIndex + 2];
        
        // Connection colors (dimmer than particles)
        const connectionIntensity = 0.2 + Math.random() * 0.3;
        for (let j = 0; j < 6; j += 3) {
          connectionColors[connectionIndex + j] = 0.2 * connectionIntensity;
          connectionColors[connectionIndex + j + 1] = 0.4 * connectionIntensity;
          connectionColors[connectionIndex + j + 2] = 0.6 * connectionIntensity;
        }
        
        connectionIndex += 6;
      }
    }
    
    return {
      particles: { positions, colors, sizes },
      connections: { 
        positions: connectionPositions.slice(0, connectionIndex), 
        colors: connectionColors.slice(0, connectionIndex) 
      }
    };
  }, []);

  // Animation loop
  useFrame(({ clock }) => {
    if (brainRef.current) {
      // Gentle rotation
      brainRef.current.rotation.y += rotationSpeed;
      brainRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.3) * 0.1;
      
      // Pulsing effect
      const pulse = 1 + Math.sin(clock.elapsedTime * 2) * pulseIntensity;
      brainRef.current.scale.setScalar(scale * pulse);
    }
    
    // Animate particle colors for neural activity
    if (particlesRef.current) {
      const colors = particlesRef.current.geometry.attributes.color.array as Float32Array;
      const time = clock.elapsedTime;
      
      for (let i = 0; i < colors.length; i += 3) {
        const wave = Math.sin(time * 3 + i * 0.01) * 0.3 + 0.7;
        colors[i] = 0.4 * wave;     // R
        colors[i + 1] = 0.1 * wave; // G  
        colors[i + 2] = 0.8 * wave; // B
      }
      
      particlesRef.current.geometry.attributes.color.needsUpdate = true;
    }
    
    // Animate connections
    if (connectionsRef.current) {
      const colors = connectionsRef.current.geometry.attributes.color.array as Float32Array;
      const time = clock.elapsedTime;
      
      for (let i = 0; i < colors.length; i += 3) {
        const wave = Math.sin(time * 2 + i * 0.02) * 0.5 + 0.5;
        colors[i] = 0.2 * wave;
        colors[i + 1] = 0.4 * wave;
        colors[i + 2] = 0.6 * wave;
      }
      
      connectionsRef.current.geometry.attributes.color.needsUpdate = true;
    }
  });

  return (
    <group ref={brainRef} position={position}>
      {/* Neural network particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particles.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[particles.colors, 3]}
          />
          <bufferAttribute
            attach="attributes-size"
            args={[particles.sizes, 1]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          sizeAttenuation={true}
          vertexColors={true}
          transparent={true}
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>
      
      {/* Neural connections */}
      <lineSegments ref={connectionsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[connections.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[connections.colors, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors={true}
          transparent={true}
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
};

export default Brain3D;
