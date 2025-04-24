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
      {/* Center clouds - main focal point */}
      <Clouds material={THREE.MeshStandardMaterial}>
        <Cloud
          segments={60}
          bounds={[140, 70, 70]}
          volume={30}
          color="#ffffff"
          fade={25}
          speed={0.1}
          opacity={0.7}
          position={[0, 0, 0]}
        />
        <Cloud
          segments={60}
          bounds={[120, 60, 60]}
          volume={25}
          color="#4966ff"
          fade={20}
          speed={0.12}
          opacity={0.5}
          position={[0, 10, -20]}
        />
      </Clouds>

      {/* Left side clouds */}
      <Clouds material={THREE.MeshStandardMaterial}>
        <Cloud
          segments={50}
          bounds={[100, 60, 60]}
          volume={20}
          color="#ffffff"
          fade={30}
          speed={0.08}
          opacity={0.6}
          position={[-80, -10, -40]}
        />
        <Cloud
          segments={50}
          bounds={[90, 50, 50]}
          volume={18}
          color="#0033ff"
          fade={25}
          speed={0.09}
          opacity={0.4}
          position={[-70, 0, -60]}
        />
      </Clouds>

      {/* Right side clouds */}
      <Clouds material={THREE.MeshStandardMaterial}>
        <Cloud
          segments={50}
          bounds={[100, 60, 60]}
          volume={20}
          color="#ffffff"
          fade={30}
          speed={0.07}
          opacity={0.6}
          position={[80, -10, -40]}
        />
        <Cloud
          segments={50}
          bounds={[90, 50, 50]}
          volume={18}
          color="#0033ff"
          fade={25}
          speed={0.08}
          opacity={0.4}
          position={[70, 0, -60]}
        />
      </Clouds>

      {/* Back clouds - creating depth */}
      <Clouds material={THREE.MeshStandardMaterial}>
        <Cloud
          segments={40}
          bounds={[180, 80, 40]}
          volume={15}
          color="#ffffff"
          fade={35}
          speed={0.05}
          opacity={0.4}
          position={[0, -20, -100]}
        />
        <Cloud
          segments={40}
          bounds={[160, 70, 30]}
          volume={12}
          color="#1a4fff"
          fade={30}
          speed={0.06}
          opacity={0.3}
          position={[0, 0, -120]}
        />
      </Clouds>

      {/* Top layer clouds */}
      <Clouds material={THREE.MeshStandardMaterial}>
        <Cloud
          segments={50}
          bounds={[160, 40, 160]}
          volume={14}
          color="#ffffff"
          fade={40}
          speed={0.04}
          opacity={0.5}
          position={[0, 50, -20]}
        />
        <Cloud
          segments={50}
          bounds={[140, 30, 140]}
          volume={12}
          color="#4966ff"
          fade={35}
          speed={0.05}
          opacity={0.4}
          position={[0, 70, -40]}
        />
      </Clouds>

      {/* Bottom layer clouds */}
      <Clouds material={THREE.MeshStandardMaterial}>
        <Cloud
          segments={50}
          bounds={[160, 40, 160]}
          volume={14}
          color="#ffffff"
          fade={40}
          speed={0.04}
          opacity={0.5}
          position={[0, -50, -20]}
        />
        <Cloud
          segments={50}
          bounds={[140, 30, 140]}
          volume={12}
          color="#4966ff"
          fade={35}
          speed={0.05}
          opacity={0.4}
          position={[0, -70, -40]}
        />
      </Clouds>
    </group>
  );
};

export default CloudsBackground; 