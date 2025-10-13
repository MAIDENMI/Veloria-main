'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface SimpleBrainProps {
  scale?: number;
  position?: [number, number, number];
}

export const SimpleBrain = ({ scale = 1, position = [0, 0, 0] }: SimpleBrainProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.2;
      groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.5) * 0.1;
      
      const pulse = 1 + Math.sin(clock.elapsedTime * 2) * 0.1;
      groupRef.current.scale.setScalar(scale * pulse);
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Main brain sphere */}
      <Sphere args={[1.5, 32, 32]}>
        <meshStandardMaterial
          color="#8b5cf6"
          transparent
          opacity={0.7}
          emissive="#4c1d95"
          emissiveIntensity={0.2}
        />
      </Sphere>
      
      {/* Brain hemispheres */}
      <Sphere args={[1.2, 16, 16]} position={[-0.3, 0, 0]}>
        <meshStandardMaterial
          color="#06b6d4"
          transparent
          opacity={0.5}
          emissive="#0891b2"
          emissiveIntensity={0.3}
        />
      </Sphere>
      
      <Sphere args={[1.2, 16, 16]} position={[0.3, 0, 0]}>
        <meshStandardMaterial
          color="#ec4899"
          transparent
          opacity={0.5}
          emissive="#be185d"
          emissiveIntensity={0.3}
        />
      </Sphere>
      
      {/* Neural activity particles */}
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i / 20) * Math.PI * 2;
        const radius = 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = (Math.random() - 0.5) * 2;
        
        return (
          <Sphere key={i} args={[0.05, 8, 8]} position={[x, y, z]}>
            <meshStandardMaterial
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={0.5}
            />
          </Sphere>
        );
      })}
    </group>
  );
};

export default SimpleBrain;
