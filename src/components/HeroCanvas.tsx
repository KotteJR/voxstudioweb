'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Preload } from '@react-three/drei';
import LogoModel from './LogoModel';
import CloudsBackground from './CloudsBackground';
import { Suspense } from 'react';

function LoadingFallback() {
  return null;
}

const HeroCanvas = () => {
  return (
    <Canvas
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh'
      }}
      camera={{ position: [0, 0, 10], fov: 45 }}
      dpr={[1, 2]}
      gl={{ 
        antialias: true, 
        alpha: true,
        powerPreference: "high-performance"
      }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45} />
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.2}
        autoRotate
        autoRotateSpeed={1.5}
      />
      <color attach="background" args={['#000000']} />
      <fog attach="fog" args={['#000000', 30, 90]} />
      <ambientLight intensity={0.2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.3}
        penumbra={1}
        intensity={1.5}
        castShadow
      />
      <spotLight
        position={[-10, -10, 10]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        castShadow
      />
      <Environment
        preset="night"
        background={false}
        blur={0.8}
      />
      <Suspense fallback={<LoadingFallback />}>
        <CloudsBackground />
        <LogoModel scale={0.2} />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default HeroCanvas;