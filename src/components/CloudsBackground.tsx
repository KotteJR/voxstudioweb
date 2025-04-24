'use client';
import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Clouds, Cloud } from '@react-three/drei';

const CloudsBackground = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main cloud layer */}
      <Clouds material={THREE.MeshStandardMaterial}>
        <Cloud
          segments={50}
          bounds={[120, 60, 60]}
          volume={25}
          color="#ffffff"
          fade={20}
          speed={0.08}
          opacity={0.6}
          position={[0, 0, 0]}
        />
        <Cloud
          segments={50}
          bounds={[100, 50, 50]}
          volume={20}
          color="#4966ff"
          fade={20}
          speed={0.1}
          opacity={0.4}
          position={[0, 10, -20]}
        />
      </Clouds>

      {/* Background clouds */}
      <Clouds material={THREE.MeshStandardMaterial}>
        <Cloud
          segments={40}
          bounds={[150, 70, 40]}
          volume={15}
          color="#ffffff"
          fade={25}
          speed={0.05}
          opacity={0.5}
          position={[0, -20, -60]}
        />
      </Clouds>

      {/* Top accent clouds */}
      <Clouds material={THREE.MeshStandardMaterial}>
        <Cloud
          segments={40}
          bounds={[140, 30, 140]}
          volume={12}
          color="#ffffff"
          fade={30}
          speed={0.03}
          opacity={0.45}
          position={[0, 40, 0]}
        />
      </Clouds>
    </group>
  );
};

export default CloudsBackground; 