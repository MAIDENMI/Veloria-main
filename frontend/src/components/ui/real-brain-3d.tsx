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
  const energyRingsRef = useRef<THREE.Group>(null);
  const greenDotsRef = useRef<THREE.Group>(null);
  
  // Load the actual brain OBJ model
  const obj = useLoader(OBJLoader, '/brain-parts-big.obj');

  useFrame(({ clock }) => {
    if (brainRef.current) {
      // Gentle rotation
      brainRef.current.rotation.y = clock.elapsedTime * rotationSpeed * 0.3;
      brainRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.15) * 0.02;
      
      // Subtle breathing
      const pulse = 1 + Math.sin(clock.elapsedTime * 1.0) * 0.02;
      brainRef.current.scale.setScalar(scale * pulse);
    }
    
    // Animate cyan ring
    if (energyRingsRef.current) {
      energyRingsRef.current.rotation.z = clock.elapsedTime * 0.4;
    }
  });

  return (
    <group ref={brainRef} position={position}>
      {/* Transparent dot-based brain like reference image */}
      <TransparentBrainDots brainObj={obj} />
      
      {/* Blinking green dots scattered throughout */}
      <BlinkingGreenDots brainObj={obj} />
    </group>
  );
};

// Transparent brain dots like the reference image
const TransparentBrainDots = ({ brainObj }: { brainObj: THREE.Group }) => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions: number[] = [];
    const colors: number[] = [];
    
    // Extract vertices from the brain model
    brainObj.traverse((child) => {
      if (child instanceof THREE.Mesh && child.geometry) {
        const geometry = child.geometry;
        const positionAttribute = geometry.attributes.position;
        
        if (positionAttribute) {
          // Dense sampling for detailed brain structure
          for (let i = 0; i < positionAttribute.count; i += 3) {
            positions.push(
              positionAttribute.getX(i) * 0.01,
              positionAttribute.getY(i) * 0.01,
              positionAttribute.getZ(i) * 0.01
            );
            
            // Soft white/blue colors like reference image
            colors.push(0.9, 0.95, 1.0);
          }
        }
      }
    });
    
    return {
      positions: new Float32Array(positions),
      colors: new Float32Array(colors)
    };
  }, [brainObj]);
  
  useFrame(({ clock }) => {
    if (particlesRef.current && particles.positions.length > 0) {
      const colors = particlesRef.current.geometry.attributes.color.array as Float32Array;
      const time = clock.elapsedTime;
      
      // Gentle twinkling like holographic brain
      for (let i = 0; i < colors.length; i += 3) {
        const twinkle = 0.6 + Math.sin(time * 2 + i * 0.01) * 0.4;
        colors[i] = 0.9 * twinkle;
        colors[i + 1] = 0.95 * twinkle;
        colors[i + 2] = 1.0 * twinkle;
      }
      
      particlesRef.current.geometry.attributes.color.needsUpdate = true;
    }
  });
  
  if (particles.positions.length === 0) return null;

  return (
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
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        sizeAttenuation={true}
        vertexColors={true}
        transparent={true}
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Blinking green dots scattered throughout the brain
const BlinkingGreenDots = ({ brainObj }: { brainObj: THREE.Group }) => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions: number[] = [];
    const delays: number[] = [];
    
    // Extract strategic positions for green dots
    brainObj.traverse((child) => {
      if (child instanceof THREE.Mesh && child.geometry) {
        const geometry = child.geometry;
        const positionAttribute = geometry.attributes.position;
        
        if (positionAttribute) {
          // Sparse sampling for green dots
          for (let i = 0; i < positionAttribute.count; i += 50) {
            positions.push(
              positionAttribute.getX(i) * 0.01,
              positionAttribute.getY(i) * 0.01,
              positionAttribute.getZ(i) * 0.01
            );
            
            delays.push(Math.random() * Math.PI * 2);
          }
        }
      }
    });
    
    return {
      positions: new Float32Array(positions),
      delays: new Float32Array(delays)
    };
  }, [brainObj]);
  
  useFrame(({ clock }) => {
    if (particlesRef.current && particles.positions.length > 0) {
      const colors = particlesRef.current.geometry.attributes.color.array as Float32Array;
      const time = clock.elapsedTime;
      
      for (let i = 0; i < colors.length; i += 3) {
        const delay = particles.delays[i / 3];
        const blink = Math.sin(time * 4 + delay) > 0.3 ? 1.0 : 0.2;
        
        colors[i] = 0.2 * blink;     // R
        colors[i + 1] = 1.0 * blink; // G - bright green
        colors[i + 2] = 0.4 * blink; // B
      }
      
      particlesRef.current.geometry.attributes.color.needsUpdate = true;
    }
  });
  
  if (particles.positions.length === 0) return null;

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[new Float32Array(particles.positions.length), 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        sizeAttenuation={true}
        vertexColors={true}
        transparent={true}
        opacity={1.0}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Neural connections using actual brain vertices
const NeuralConnections = ({ brainObj }: { brainObj: THREE.Group }) => {
  const linesRef = useRef<THREE.LineSegments>(null);
  
  const connections = useMemo(() => {
    const positions: number[] = [];
    const colors: number[] = [];
    const brainVertices: THREE.Vector3[] = [];
    
    // Extract vertices from actual brain geometry
    brainObj.traverse((child) => {
      if (child instanceof THREE.Mesh && child.geometry) {
        const geometry = child.geometry;
        const positionAttribute = geometry.attributes.position;
        
        if (positionAttribute) {
          for (let i = 0; i < positionAttribute.count; i += 50) {
            brainVertices.push(new THREE.Vector3(
              positionAttribute.getX(i) * 0.01,
              positionAttribute.getY(i) * 0.01,
              positionAttribute.getZ(i) * 0.01
            ));
          }
        }
      }
    });
    
    // Create connections between nearby brain regions
    for (let i = 0; i < Math.min(brainVertices.length, 100); i++) {
      for (let j = i + 1; j < Math.min(brainVertices.length, 100); j++) {
        const distance = brainVertices[i].distanceTo(brainVertices[j]);
        
        // Only connect nearby vertices (simulating neural pathways)
        if (distance < 1.2 && Math.random() < 0.3) {
          positions.push(
            brainVertices[i].x, brainVertices[i].y, brainVertices[i].z,
            brainVertices[j].x, brainVertices[j].y, brainVertices[j].z
          );
          
          // Color based on connection strength/activity
          const intensity = 0.3 + Math.random() * 0.4;
          colors.push(
            0.6 * intensity, 0.4 * intensity, 1.0 * intensity,
            0.6 * intensity, 0.4 * intensity, 1.0 * intensity
          );
        }
      }
    }
    
    return {
      positions: new Float32Array(positions),
      colors: new Float32Array(colors)
    };
  }, [brainObj]);
  
  useFrame(({ clock }) => {
    if (linesRef.current) {
      const colors = linesRef.current.geometry.attributes.color.array as Float32Array;
      const time = clock.elapsedTime;
      
      // Animate neural activity along connections
      for (let i = 0; i < colors.length; i += 6) {
        const activity = Math.sin(time * 2 + i * 0.01) * 0.5 + 0.5;
        const baseIntensity = 0.3 + activity * 0.4;
        
        colors[i] = 0.6 * baseIntensity;
        colors[i + 1] = 0.4 * baseIntensity;
        colors[i + 2] = 1.0 * baseIntensity;
        colors[i + 3] = 0.6 * baseIntensity;
        colors[i + 4] = 0.4 * baseIntensity;
        colors[i + 5] = 1.0 * baseIntensity;
      }
      
      linesRef.current.geometry.attributes.color.needsUpdate = true;
    }
  });
  
  return (
    <lineSegments ref={linesRef}>
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
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        linewidth={2}
      />
    </lineSegments>
  );
};

// Floating energy orbs around the brain
const FloatingOrbs = () => {
  const orbsRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (orbsRef.current) {
      orbsRef.current.rotation.y = clock.elapsedTime * 0.3;
    }
  });
  
  return (
    <group ref={orbsRef}>
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 4 + Math.sin(i) * 0.5;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(angle * 2) * 1;
        
        return (
          <EnergyOrb 
            key={i} 
            position={[x, y, z]} 
            delay={i * 0.5}
            color={i % 3 === 0 ? "#fbbf24" : i % 3 === 1 ? "#10b981" : "#3b82f6"}
          />
        );
      })}
    </group>
  );
};

// Individual energy orb
const EnergyOrb = ({ position, delay, color }: { 
  position: [number, number, number], 
  delay: number,
  color: string 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Pulsing effect
      const pulse = 0.5 + Math.sin(clock.elapsedTime * 2 + delay) * 0.3;
      meshRef.current.scale.setScalar(pulse);
      
      // Floating motion
      meshRef.current.position.y = position[1] + Math.sin(clock.elapsedTime + delay) * 0.5;
    }
  });
  
  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshBasicMaterial
        color={color}
        transparent={true}
        opacity={0.8}
      />
    </mesh>
  );
};

// Energy rings for dramatic visual effect
const EnergyRings = () => {
  const ringsRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (ringsRef.current) {
      ringsRef.current.rotation.z = clock.elapsedTime * 0.5;
      ringsRef.current.rotation.x = clock.elapsedTime * 0.3;
    }
  });
  
  return (
    <group ref={ringsRef}>
      {/* Large outer ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4, 4.3, 64]} />
        <meshBasicMaterial
          color="#fbbf24"
          transparent={true}
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Medium ring */}
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <ringGeometry args={[3.2, 3.5, 64]} />
        <meshBasicMaterial
          color="#10b981"
          transparent={true}
          opacity={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Inner ring */}
      <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <ringGeometry args={[2.5, 2.8, 64]} />
        <meshBasicMaterial
          color="#3b82f6"
          transparent={true}
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

// Healing energy particles that flow around the brain
const HealingEnergyFlow = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions: number[] = [];
    const colors: number[] = [];
    const velocities: number[] = [];
    const sizes: number[] = [];
    
    // Create flowing particles around the brain
    for (let i = 0; i < 100; i++) {
      // Random positions around brain
      const radius = 3 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions.push(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );
      
      // Healing colors - soft pastels
      const colorType = Math.random();
      if (colorType < 0.4) {
        // Soft green - growth and healing
        colors.push(0.4, 1.0, 0.6);
      } else if (colorType < 0.7) {
        // Soft blue - calm and peace
        colors.push(0.5, 0.8, 1.2);
      } else {
        // Soft gold - warmth and hope
        colors.push(1.2, 0.9, 0.5);
      }
      
      // Random velocities for organic movement
      velocities.push(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      );
      
      sizes.push(Math.random() * 2 + 1);
    }
    
    return {
      positions: new Float32Array(positions),
      colors: new Float32Array(colors),
      velocities: new Float32Array(velocities),
      sizes: new Float32Array(sizes)
    };
  }, []);
  
  useFrame(({ clock }) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const colors = particlesRef.current.geometry.attributes.color.array as Float32Array;
      const time = clock.elapsedTime;
      
      for (let i = 0; i < positions.length; i += 3) {
        // Gentle floating movement
        positions[i] += particles.velocities[i] * Math.sin(time + i);
        positions[i + 1] += particles.velocities[i + 1] * Math.cos(time + i);
        positions[i + 2] += particles.velocities[i + 2] * Math.sin(time * 0.5 + i);
        
        // Keep particles in bounds
        const distance = Math.sqrt(
          positions[i] ** 2 + positions[i + 1] ** 2 + positions[i + 2] ** 2
        );
        if (distance > 6) {
          positions[i] *= 0.8;
          positions[i + 1] *= 0.8;
          positions[i + 2] *= 0.8;
        }
        
        // Pulsing colors for healing energy
        const pulse = Math.sin(time * 2 + i * 0.1) * 0.3 + 0.7;
        const baseR = particles.colors[i];
        const baseG = particles.colors[i + 1];
        const baseB = particles.colors[i + 2];
        
        colors[i] = baseR * pulse;
        colors[i + 1] = baseG * pulse;
        colors[i + 2] = baseB * pulse;
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      particlesRef.current.geometry.attributes.color.needsUpdate = true;
    }
  });
  
  return (
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
        size={0.08}
        sizeAttenuation={true}
        vertexColors={true}
        transparent={true}
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Healing particles that float around the brain
const HealingParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions: number[] = [];
    const colors: number[] = [];
    const velocities: number[] = [];
    
    for (let i = 0; i < 50; i++) {
      // Random positions around brain
      const radius = 3 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions.push(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );
      
      // Healing colors
      const colorType = Math.random();
      if (colorType < 0.33) {
        colors.push(0.8, 1.5, 0.9); // Soft green - growth
      } else if (colorType < 0.66) {
        colors.push(1.5, 1.2, 0.6); // Warm gold - hope
      } else {
        colors.push(0.7, 1.0, 1.8); // Soft blue - calm
      }
      
      velocities.push(
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01
      );
    }
    
    return {
      positions: new Float32Array(positions),
      colors: new Float32Array(colors),
      velocities: new Float32Array(velocities)
    };
  }, []);
  
  useFrame(({ clock }) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const colors = particlesRef.current.geometry.attributes.color.array as Float32Array;
      const time = clock.elapsedTime;
      
      for (let i = 0; i < positions.length; i += 3) {
        // Gentle floating movement
        positions[i] += Math.sin(time + i) * 0.005;
        positions[i + 1] += Math.cos(time * 0.8 + i) * 0.005;
        positions[i + 2] += Math.sin(time * 0.6 + i) * 0.005;
        
        // Pulsing colors
        const pulse = Math.sin(time * 2 + i * 0.1) * 0.3 + 0.7;
        colors[i] = particles.colors[i] * pulse;
        colors[i + 1] = particles.colors[i + 1] * pulse;
        colors[i + 2] = particles.colors[i + 2] * pulse;
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      particlesRef.current.geometry.attributes.color.needsUpdate = true;
    }
  });
  
  return (
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
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        sizeAttenuation={true}
        vertexColors={true}
        transparent={true}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Now properly utilizing the actual 3D brain model geometry!

export const RealBrain3D = (props: RealBrain3DProps) => {
  return (
    <Suspense fallback={null}>
      <BrainModel {...props} />
    </Suspense>
  );
};

export default RealBrain3D;
