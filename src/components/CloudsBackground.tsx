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
      {/* Center clouds */}
      <Clouds material={THREE.MeshStandardMaterial}>
        <Cloud
          segments={60}
          bounds={[120, 60, 60]}
          volume={30}
          color="#4966ff"
          fade={20}
          speed={0.08}
          opacity={0.4}
          position={[0, 0, 0]}
        />
        <Cloud
          segments={60}
          bounds={[100, 50, 50]}
          volume={25}
          color="white"
          fade={20}
          speed={0.1}
          opacity={0.3}
          position={[0, 10, 0]}
        />
      </Clouds>

      {/* Left side clouds */}
      <Clouds material={THREE.MeshStandardMaterial}>
        <Cloud
          segments={60}
          bounds={[100, 60, 60]}
          volume={25}
          color="#4966ff"
          fade={20}
          speed={0.06}
          opacity={0.35}
          position={[-80, -20, -20]}
        />
        <Cloud
          segments={50}
          bounds={[80, 40, 40]}
          volume={20}
          color="white"
          fade={20}
          speed={0.09}
          opacity={0.25}
          position={[-60, 0, -40]}
        />
      </Clouds>

      {/* Right side clouds */}
      <Clouds material={THREE.MeshStandardMaterial}>
        <Cloud
          segments={60}
          bounds={[100, 60, 60]}
          volume={25}
          color="#4966ff"
          fade={20}
          speed={0.07}
          opacity={0.35}
          position={[80, -10, -30]}
        />
        <Cloud
          segments={50}
          bounds={[80, 40, 40]}
          volume={20}
          color="white"
          fade={20}
          speed={0.08}
          opacity={0.25}
          position={[60, 20, -20]}
        />
      </Clouds>

      {/* Back clouds */}
      <Clouds material={THREE.MeshStandardMaterial}>
        <Cloud
          segments={70}
          bounds={[150, 70, 40]}
          volume={20}
          color="#8099ff"
          fade={25}
          speed={0.05}
          opacity={0.3}
          position={[0, -30, -60]}
        />
        <Cloud
          segments={60}
          bounds={[120, 50, 30]}
          volume={15}
          color="#4966ff"
          fade={25}
          speed={0.04}
          opacity={0.25}
          position={[0, 40, -80]}
        />
      </Clouds>

      {/* Top layer clouds */}
      <Clouds material={THREE.MeshStandardMaterial}>
        <Cloud
          segments={50}
          bounds={[140, 30, 140]}
          volume={15}
          color="white"
          fade={30}
          speed={0.03}
          opacity={0.2}
          position={[0, 50, 0]}
        />
      </Clouds>

      {/* Bottom layer clouds */}
      <Clouds material={THREE.MeshStandardMaterial}>
        <Cloud
          segments={50}
          bounds={[140, 30, 140]}
          volume={15}
          color="#4966ff"
          fade={30}
          speed={0.03}
          opacity={0.2}
          position={[0, -50, 0]}
        />
      </Clouds>
    </group>
  );
};

export default CloudsBackground; 