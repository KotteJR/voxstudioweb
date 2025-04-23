'use client';

import { useEffect, useRef } from 'react';
import Whatamesh from 'whatamesh';

const MeshGradient = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const meshRef = useRef<any>(null);

  const initMesh = () => {
    if (!canvasRef.current) return;

    try {
      // Cleanup existing instance if any
      if (meshRef.current) {
        meshRef.current.stop();
      }

      // Create new instance
      meshRef.current = new Whatamesh({
        canvas: canvasRef.current,
        colors: [
          [0, 0, 255],    // Blue
          [255, 255, 255], // White
          [0, 0, 255],    // Blue
          [255, 255, 255], // White
        ],
        speed: 0.0005,
        pointSize: 10,
      });

      // Start the animation
      meshRef.current.start();
    } catch (error) {
      console.error('Error initializing mesh:', error);
      // Try to reinitialize after a short delay
      setTimeout(initMesh, 1000);
    }
  };

  useEffect(() => {
    initMesh();

    // Handle visibility change
    const handleVisibilityChange = () => {
      if (document.hidden) {
        meshRef.current?.stop();
      } else {
        initMesh();
      }
    };

    // Handle context loss
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      if (meshRef.current) {
        meshRef.current.stop();
      }
    };

    // Handle context restored
    const handleContextRestored = () => {
      initMesh();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    canvasRef.current?.addEventListener('webglcontextlost', handleContextLost);
    canvasRef.current?.addEventListener('webglcontextrestored', handleContextRestored);

    // Cleanup
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      canvasRef.current?.removeEventListener('webglcontextlost', handleContextLost);
      canvasRef.current?.removeEventListener('webglcontextrestored', handleContextRestored);
      if (meshRef.current) {
        meshRef.current.stop();
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: '#000000', // Added black background
      }}
    />
  );
};

export default MeshGradient; 