'use client';

import { useRef, useMemo, Suspense } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import * as THREE from 'three';

interface RealBrain3DProps {
  scale?: number;
  position?: [number, number, number];
  rotationSpeed?: number;
}

const BrainModel = ({ scale = 1, position = [0, 0, 0], rotationSpeed = 0.01 }: RealBrain3DProps) => {
  const brainRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  
  // Load the actual brain OBJ model
  const obj = useLoader(OBJLoader, '/brain-parts-big.obj');
  
  // Create particle system for the holographic effect
  const particles = useMemo(() => {
    const positions: number[] = [];
    const colors: number[] = [];
    const sizes: number[] = [];
    
    // Extract vertices from brain model for particle cloud
    obj.traverse((child) => {
      if (child instanceof THREE.Mesh && child.geometry) {
        const geometry = child.geometry;
        const positionAttribute = geometry.attributes.position;
        
        if (positionAttribute) {
          for (let i = 0; i < positionAttribute.count; i += 3) { // More particles for dense effect
            positions.push(
              positionAttribute.getX(i) * 0.01,
              positionAttribute.getY(i) * 0.01,
              positionAttribute.getZ(i) * 0.01
            );
            
            // Cyan/white gradient like the reference image
            const intensity = 0.4 + Math.random() * 0.6;
            colors.push(
              0.7 * intensity, // R - light blue/white
              0.9 * intensity, // G - cyan
              1.0 * intensity  // B - full blue
            );
            
            sizes.push(Math.random() * 2 + 0.5);
          }
        }
      }
    });
    
    return {
      positions: new Float32Array(positions),
      colors: new Float32Array(colors),
      sizes: new Float32Array(sizes)
    };
  }, [obj]);

  useFrame(({ clock }) => {
    if (brainRef.current) {
      // Slow, elegant rotation
      brainRef.current.rotation.y = clock.elapsedTime * rotationSpeed * 0.3;
      brainRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.1) * 0.02;
      
      // Very subtle breathing
      const pulse = 1 + Math.sin(clock.elapsedTime * 1.2) * 0.03;
      brainRef.current.scale.setScalar(scale * pulse);
    }
    
    // Animate particles for shimmering effect
    if (particlesRef.current) {
      const colors = particlesRef.current.geometry.attributes.color.array as Float32Array;
      const time = clock.elapsedTime;
      
      for (let i = 0; i < colors.length; i += 3) {
        const wave = Math.sin(time * 2 + i * 0.01) * 0.3 + 0.7;
        colors[i] = 0.7 * wave;     // R
        colors[i + 1] = 0.9 * wave; // G
        colors[i + 2] = 1.0 * wave; // B
      }
      
      particlesRef.current.geometry.attributes.color.needsUpdate = true;
    }
  });

  return (
    <group ref={brainRef} position={position}>
      {/* Translucent brain mesh with holographic effect */}
      <primitive 
        object={obj.clone()} 
        scale={[0.01, 0.01, 0.01]}
      >
        <meshPhongMaterial 
          color="#87ceeb"
          transparent={true}
          opacity={0.15}
          emissive="#40e0d0"
          emissiveIntensity={0.3}
          shininess={100}
          specular="#ffffff"
        />
      </primitive>
      
      {/* Wireframe overlay for structure definition */}
      <primitive 
        object={obj.clone()} 
        scale={[0.01, 0.01, 0.01]}
      >
        <meshBasicMaterial 
          color="#40e0d0"
          wireframe={true}
          transparent={true}
          opacity={0.4}
        />
      </primitive>
      
      {/* Particle cloud for holographic glow */}
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
          size={0.02}
          sizeAttenuation={true}
          vertexColors={true}
          transparent={true}
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

// Removed LightBulb component - using holographic particle effect instead

export const RealBrain3D = (props: RealBrain3DProps) => {
  return (
    <Suspense fallback={null}>
      <BrainModel {...props} />
    </Suspense>
  );
};

export default RealBrain3D;
