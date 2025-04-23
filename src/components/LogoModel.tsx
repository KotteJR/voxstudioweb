'use client';
import { useRef, Suspense } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { MeshTransmissionMaterial } from '@react-three/drei';

interface LogoModelProps {
  scale?: number;
}

function LoadingFallback() {
  return null;
}

const LogoModel: React.FC<LogoModelProps> = ({ scale = 1 }) => {
  const groupRef = useRef<THREE.Group>(null);
  const svg = useLoader(SVGLoader, '/svg/voxlogo.svg');
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  const shapes = svg.paths.flatMap((path) => {
    path.color.setStyle('#ffffff');
    const shapes = path.toShapes(true);
    return shapes.map((shape) => {
      const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: 15,
        bevelEnabled: true,
        bevelThickness: 2,
        bevelSize: 1.5,
        bevelOffset: 0,
        bevelSegments: 12
      });
      return geometry;
    });
  });

  const mergedGeometry = BufferGeometryUtils.mergeGeometries(shapes);

  // Center the geometry
  mergedGeometry.computeBoundingBox();
  const center = new THREE.Vector3();
  mergedGeometry.boundingBox?.getCenter(center);
  mergedGeometry.translate(-center.x, -center.y, 0);

  const baseScale = 0.04 * scale;

  return (
    <group ref={groupRef} scale={baseScale} position={[0, 0.5, 0]} rotation={[Math.PI, Math.PI, 0]}>
      <mesh geometry={mergedGeometry}>
        <meshPhysicalMaterial
          transparent
          transmission={0.95}
          thickness={0.5}
          roughness={0.1}
          ior={1.5}
          envMapIntensity={2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          attenuationColor="#ffffff"
          attenuationDistance={0.5}
          metalness={0.05}
          opacity={1}
          sheen={1}
          sheenRoughness={0.5}
          specularIntensity={1}
          specularColor="#ffffff"
        />
      </mesh>
    </group>
  );
};

export default LogoModel; 