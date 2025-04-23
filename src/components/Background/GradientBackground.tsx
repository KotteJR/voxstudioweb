'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const GradientBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const scrollRef = useRef(0);
  const scrollDirectionRef = useRef(0);
  const scrollVelocityRef = useRef(0);
  const lastScrollTimeRef = useRef(Date.now());
  const smoothScrollRef = useRef(0);
  const sectionRef = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Create camera
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    // Create renderer with better error handling
    try {
      rendererRef.current = new THREE.WebGLRenderer({ 
        alpha: true,
        powerPreference: "high-performance",
        antialias: true,
        preserveDrawingBuffer: true
      });
      
      if (!rendererRef.current) {
        throw new Error('Failed to create WebGL renderer');
      }

      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      containerRef.current.appendChild(rendererRef.current.domElement);
    } catch (error) {
      console.error('WebGL initialization error:', error);
      return;
    }

    // Create gradient mesh
    const geometry = new THREE.PlaneGeometry(2, 2);
    
    // Shader material with improved initialization
    try {
      const material = new THREE.ShaderMaterial({
        uniforms: {
          u_time: { value: 0 },
          u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
          u_scroll: { value: 0 },
          u_scroll_direction: { value: 0 },
          u_scroll_velocity: { value: 0 },
          u_scroll_impulse: { value: 0 },
          u_smooth_scroll: { value: 0 },
          u_section_rotation: { value: 0 },
          u_section_zoom: { value: 1.0 }
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float u_time;
          uniform vec2 u_resolution;
          uniform float u_scroll;
          uniform float u_scroll_direction;
          uniform float u_scroll_velocity;
          uniform float u_scroll_impulse;
          uniform float u_smooth_scroll;
          uniform float u_section_rotation;
          uniform float u_section_zoom;
          
          varying vec2 vUv;
          
          void main() {
            vec2 uv = vUv;
            
            // Apply section rotation
            float angle = u_section_rotation;
            vec2 center = vec2(0.5);
            uv -= center;
            mat2 rotation = mat2(
              cos(angle), -sin(angle),
              sin(angle), cos(angle)
            );
            uv = rotation * uv;
            uv += center;
            
            // Apply section zoom
            uv = (uv - center) * u_section_zoom + center;
            
            // Create base gradient
            vec3 color1 = vec3(0.0, 0.0, 1.0); // Blue
            vec3 color2 = vec3(1.0); // White
            
            float noise = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
            float t = u_time * 0.2 + u_smooth_scroll * 0.1;
            
            // Dynamic movement based on scroll
            float movement = sin(uv.x * 3.14159 + t) * cos(uv.y * 3.14159 + t) * 0.5 + 0.5;
            movement += u_scroll_velocity * 0.1 * noise;
            
            // Smooth color transition
            vec3 finalColor = mix(color1, color2, movement);
            
            // Add subtle noise
            finalColor += noise * 0.05;
            
            gl_FragColor = vec4(finalColor, 1.0);
          }
        `
      });
      
      materialRef.current = material;
    } catch (error) {
      console.error('Shader initialization error:', error);
      return;
    }

    const mesh = new THREE.Mesh(geometry, materialRef.current);
    scene.add(mesh);

    // Improved scroll handling
    const handleScroll = () => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastScrollTimeRef.current;
      lastScrollTimeRef.current = currentTime;

      const currentScroll = window.scrollY;
      const scrollDelta = currentScroll - scrollRef.current;
      
      scrollRef.current = currentScroll;
      scrollDirectionRef.current = Math.sign(scrollDelta);
      scrollVelocityRef.current = Math.min(Math.abs(scrollDelta / deltaTime) * 0.1, 1.0);
      
      if (materialRef.current) {
        materialRef.current.uniforms.u_scroll_impulse.value = scrollVelocityRef.current;
      }
      
      // Calculate current section
      const section = Math.floor(currentScroll / window.innerHeight);
      
      // Update section-specific effects
      if (section !== sectionRef.current) {
        sectionRef.current = section;
        if (materialRef.current) {
          materialRef.current.uniforms.u_section_rotation.value = section * 0.5;
          materialRef.current.uniforms.u_section_zoom.value = 1.0 + (section % 2 === 0 ? 0.3 : -0.3);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Improved resize handling
    const handleResize = () => {
      if (rendererRef.current && materialRef.current) {
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
        materialRef.current.uniforms.u_resolution.value.x = window.innerWidth;
        materialRef.current.uniforms.u_resolution.value.y = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Improved animation loop
    let animationFrameId: number;
    const animate = () => {
      if (!rendererRef.current || !materialRef.current || !sceneRef.current) return;

      try {
        materialRef.current.uniforms.u_time.value += 0.015;
        materialRef.current.uniforms.u_scroll.value = scrollRef.current;
        
        smoothScrollRef.current += (scrollRef.current - smoothScrollRef.current) * 0.03;
        materialRef.current.uniforms.u_smooth_scroll.value = smoothScrollRef.current;
        
        materialRef.current.uniforms.u_scroll_direction.value = scrollDirectionRef.current;
        materialRef.current.uniforms.u_scroll_velocity.value = scrollVelocityRef.current;
        
        scrollVelocityRef.current *= 0.97;
        materialRef.current.uniforms.u_scroll_impulse.value *= 0.97;

        rendererRef.current.render(sceneRef.current, camera);
      } catch (error) {
        console.error('Render error:', error);
        // Try to recover by reinitializing
        handleResize();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      if (sceneRef.current && mesh) {
        sceneRef.current.remove(mesh);
      }

      if (rendererRef.current) {
        rendererRef.current.dispose();
      }

      if (materialRef.current) {
        materialRef.current.dispose();
      }

      geometry.dispose();

      if (containerRef.current && rendererRef.current?.domElement) {
        try {
          containerRef.current.removeChild(rendererRef.current.domElement);
        } catch (error) {
          console.error('Cleanup error:', error);
        }
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: '#000000',
      }}
    />
  );
};

export default GradientBackground; 