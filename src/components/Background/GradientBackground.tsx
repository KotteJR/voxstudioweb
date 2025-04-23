'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const GradientBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);
  const lastScrollRef = useRef(0);
  const scrollDirectionRef = useRef(0);
  const scrollVelocityRef = useRef(0);
  const lastScrollTimeRef = useRef(Date.now());
  const sectionTransitionRef = useRef(0);
  const smoothScrollRef = useRef(0);
  const sectionRef = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create scene
    const scene = new THREE.Scene();
    
    // Create camera
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      powerPreference: "high-performance",
      antialias: true,
      preserveDrawingBuffer: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Handle WebGL context loss
    renderer.domElement.addEventListener('webglcontextlost', (event) => {
      event.preventDefault();
      // Stop animation
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    }, false);

    renderer.domElement.addEventListener('webglcontextrestored', () => {
      // Reinitialize everything
      handleResize();
      animate();
    }, false);

    containerRef.current.appendChild(renderer.domElement);

    // Create gradient mesh
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2() },
        u_mouse: { value: new THREE.Vector2() },
        u_scroll: { value: 0 },
        u_scroll_direction: { value: 0 },
        u_scroll_velocity: { value: 0 },
        u_section_transition: { value: 0 },
        u_section: { value: 0 },
        u_scroll_impulse: { value: 0 },
        u_flip_progress: { value: 0 },
        u_section_color: { value: 0 },
        u_smooth_scroll: { value: 0 },
        u_section_rotation: { value: 0 },
        u_section_zoom: { value: 1.0 },
      },
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float u_time;
        uniform vec2 u_resolution;
        uniform float u_scroll;
        uniform float u_scroll_direction;
        uniform float u_scroll_velocity;
        uniform float u_section_transition;
        uniform float u_section;
        uniform float u_scroll_impulse;
        uniform float u_flip_progress;
        uniform float u_section_color;
        uniform float u_smooth_scroll;
        uniform float u_section_rotation;
        uniform float u_section_zoom;
        
        // Noise function
        float noise(vec2 p) {
          return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
        }
        
        // Fractal Brownian Motion
        float fbm(vec2 p) {
          float value = 0.0;
          float amplitude = 0.5;
          float frequency = 1.0;
          
          for (int i = 0; i < 6; i++) {
            value += amplitude * noise(p * frequency);
            frequency *= 2.0;
            amplitude *= 0.5;
          }
          
          return value;
        }
        
        // Contrast enhancement function
        float contrast(float value, float factor) {
          return 0.5 + (value - 0.5) * factor;
        }
        
        // Smooth step function with easing
        float smoothStepEased(float edge0, float edge1, float x) {
          x = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
          return x * x * (3.0 - 2.0 * x);
        }
        
        // Clean soundwave function with balanced visibility
        float soundwave(vec2 p, float frequency, float amplitude, float phase) {
          // Basic sine wave
          float wave = sin(p.x * frequency + phase) * amplitude;
          
          // Add harmonics for complex sound
          wave += sin(p.x * frequency * 2.0 + phase * 1.5) * amplitude * 0.5;
          wave += sin(p.x * frequency * 3.0 + phase * 2.0) * amplitude * 0.25;
          
          // Create a band around the wave with improved visibility
          return smoothstep(0.012, 0.0, abs(p.y - wave));
        }
        
        // Equalizer bars
        float equalizer(vec2 p, float time) {
          float eq = 0.0;
          
          // Create multiple equalizer bars
          for (int i = 0; i < 20; i++) {
            float x = float(i) * 0.05 - 0.5;
            float width = 0.02;
            
            // Create bar with dynamic height
            float height = 0.1 + 0.4 * sin(time * 2.0 + float(i) * 0.3);
            height *= 0.7 + 0.3 * sin(time * 0.5 + float(i) * 0.1);
            
            // Create bar
            float bar = smoothstep(width, 0.0, abs(p.x - x));
            bar *= smoothstep(0.0, height, p.y) * smoothstep(1.0, height, p.y);
            
            // Add glow
            float glow = 0.1 * smoothstep(0.0, height, p.y) * smoothstep(1.0, height, p.y);
            bar += glow * smoothstep(0.1, 0.0, abs(p.x - x));
            
            eq += bar;
          }
          
          return eq;
        }
        
        // Pulse circles
        float pulseCircles(vec2 p, float time) {
          float circles = 0.0;
          
          // Create multiple pulse circles
          for (int i = 0; i < 5; i++) {
            float radius = 0.1 + float(i) * 0.05;
            float pulse = 0.02 * sin(time * 2.0 + float(i) * 1.5);
            float circle = smoothstep(0.01, 0.0, abs(length(p) - (radius + pulse)));
            circles += circle * (0.5 + 0.5 * sin(time * 1.0 + float(i)));
          }
          
          return circles;
        }
        
        // 3D effect - depth-based rendering
        float depthEffect(vec2 p, float time) {
          float depth = 0.0;
          
          // Create multiple depth layers
          for (int i = 0; i < 5; i++) {
            float z = float(i) * 0.2;
            float scale = 1.0 + z;
            vec2 pos = (p - 0.5) * scale + 0.5;
            
            // Add wave effect to each layer
            float wave = sin(pos.x * 10.0 + time + z * 2.0) * 0.1;
            wave *= smoothstep(1.0, 0.0, length(pos - 0.5));
            
            // Layer opacity based on depth
            float opacity = exp(-z * 2.0);
            depth += wave * opacity;
          }
          
          return depth;
        }
        
        // Audio reactive waves
        float audioWaves(vec2 p, float time) {
          float waves = 0.0;
          
          // Create multiple wave layers
          for (int i = 0; i < 3; i++) {
            float freq = 5.0 + float(i) * 3.0;
            float amp = 0.05 / (float(i) + 1.0);
            float phase = time * (1.0 + float(i) * 0.5);
            
            // Create wave
            float wave = sin(p.x * freq + phase) * amp;
            
            // Add vertical movement
            wave += sin(p.y * 2.0 + time * 0.5) * 0.02;
            
            // Create band
            float band = smoothstep(0.01, 0.0, abs(p.y - wave));
            waves += band * (0.5 + 0.5 * sin(time * 0.3 + float(i)));
          }
          
          return waves;
        }
        
        // Sag waves (like a rope or string)
        float sagWaves(vec2 p, float time) {
          float sag = 0.0;
          
          // Create multiple sag waves
          for (int i = 0; i < 3; i++) {
            // Create a sagging wave (like a rope hanging)
            float x = p.x * 2.0 - 1.0;
            float y = p.y * 2.0 - 1.0;
            
            // Base sag curve (parabola)
            float baseSag = x * x * 0.5;
            
            // Add wave to the sag
            float wave = sin(x * 10.0 + time * 2.0 + float(i)) * 0.05;
            
            // Combine base sag and wave
            float sagCurve = baseSag + wave;
            
            // Create band around the curve
            float band = smoothstep(0.02, 0.0, abs(y - sagCurve));
            sag += band * (0.5 + 0.5 * sin(time * 0.5 + float(i)));
          }
          
          return sag;
        }
        
        // Additional soundwave for middle area
        float middleSoundwave(vec2 p, float time) {
          // Center the animation in the middle-top
          vec2 center = vec2(0.0, 0.7);
          vec2 q = p - center;
          
          // Create a complex soundwave
          float wave = 0.0;
          
          // Create multiple waves with different frequencies
          for (int i = 0; i < 5; i++) {
            float freq = 3.0 + float(i) * 2.0;
            float amp = 0.05 / (float(i) + 1.0);
            float phase = time * (1.0 + float(i) * 0.3);
            
            // Create wave
            wave += sin(q.x * freq + phase) * amp;
          }
          
          // Create a band around the wave
          return smoothstep(0.01, 0.0, abs(q.y - wave));
        }
        
        // Smooth section transition effect with gentle flip
        vec2 sectionTransition(vec2 p, float transition) {
          // Detect section boundaries (every 0.25 of scroll)
          float section = floor(u_smooth_scroll * 4.0);
          float sectionProgress = fract(u_smooth_scroll * 4.0);
          
          // Enhanced scroll-based transformations
          vec2 rotatedP;
          
          // Calculate rotation angle with smooth acceleration
          float rotationAngle = u_section_rotation * smoothStepEased(0.0, 0.3, sectionProgress);
          
          // Apply enhanced rotation
          rotatedP.x = p.x * cos(rotationAngle) - p.y * sin(rotationAngle);
          rotatedP.y = p.x * sin(rotationAngle) + p.y * cos(rotationAngle);
          
          // Dynamic zoom based on scroll position
          float zoomFactor = 1.0 + smoothStepEased(0.2, 0.8, sectionProgress) * 0.3;
          rotatedP = (rotatedP - 0.5) / zoomFactor + 0.5;
          
          // Enhanced horizontal shift with smooth easing
          float horizontalShift = u_scroll_direction * smoothStepEased(0.1, 0.9, sectionProgress) * 0.5;
          rotatedP.x += horizontalShift;
          
          // Add vertical wave motion
          float verticalWave = sin(sectionProgress * 3.14159 * 2.0) * 0.1;
          rotatedP.y += verticalWave * (1.0 + u_scroll_velocity * 0.2);
          
          // Add perspective shift based on scroll direction
          float perspectiveShift = u_scroll_direction * (1.0 - sectionProgress) * 0.2;
          rotatedP.x += perspectiveShift * (rotatedP.y - 0.5);
          
          // Smooth acceleration for sudden scroll changes
          float scrollAccel = u_scroll_velocity * smoothStepEased(0.0, 1.0, 1.0 - abs(rotatedP.y));
          rotatedP.x += scrollAccel * u_scroll_direction * 0.2;
          
          return rotatedP;
        }
        
        // Get section-specific color with smooth transition
        vec3 getSectionColor(float section, float progress) {
          // Alternate between dominant blue and subtle white accents
          vec3 color1, color2;
          vec3 deepBlue = vec3(0.0, 0.0, 1.0);
          vec3 lightBlue = vec3(0.4, 0.4, 1.0);
          vec3 subtleWhite = vec3(0.85, 0.85, 1.0); // Slightly blue-tinted white
          
          if (mod(section, 2.0) < 1.0) {
            color1 = deepBlue;
            color2 = lightBlue;
          } else {
            color1 = lightBlue;
            color2 = subtleWhite;
          }
          
          // Smooth transition between colors with blue bias
          float blueWeight = smoothStepEased(0.3, 0.7, progress);
          return mix(color1, color2, blueWeight * 0.7); // Reduce the mix to favor blue
        }
        
        void main() {
          vec2 st = gl_FragCoord.xy/u_resolution.xy;
          
          // Apply smooth section transition effects
          st = sectionTransition(st, u_section_transition);
          
          // Create dynamic noise pattern
          float noiseValue = fbm(st * 3.0 + u_time * 0.3);
          
          // Get section-specific colors with smooth transition
          float section = floor(u_smooth_scroll * 4.0);
          float sectionProgress = fract(u_smooth_scroll * 4.0);
          vec3 color1 = getSectionColor(section, sectionProgress);
          vec3 color2 = getSectionColor(section + 1.0, sectionProgress);
          
          // Create clean soundwaves
          float wave1 = soundwave(st - vec2(0.0, 0.3), 10.0, 0.1, u_time * 2.0);
          float wave2 = soundwave(st - vec2(0.0, -0.3), 15.0, 0.08, -u_time * 1.5);
          float wave3 = soundwave(st - vec2(0.0, 0.0), 20.0, 0.05, u_time * 1.0);
          
          // Create pulse circles
          float circles = pulseCircles(st - vec2(0.4, -0.4), u_time);
          
          // Create 3D effect
          float depth = depthEffect(st, u_time);
          
          // Create audio reactive waves
          float audioWaves = audioWaves(st - vec2(-0.4, 0.4), u_time);
          
          // Create sag waves
          float sag = sagWaves(st, u_time);
          
          // Create middle soundwave
          float middleWave = middleSoundwave(st, u_time);
          
          // Create waves with different frequencies
          float wavePattern1 = sin(st.x * 5.0 + u_time * 1.5 + noiseValue) * 0.5 + 0.5;
          float wavePattern2 = cos(st.y * 4.0 - u_time * 1.0 + noiseValue) * 0.5 + 0.5;
          float wavePattern3 = sin((st.x + st.y) * 3.0 + u_time * 0.8 + noiseValue) * 0.5 + 0.5;
          
          // Combine elements
          float mixValue = (wavePattern1 + wavePattern2 + wavePattern3) / 3.0;
          
          // Add soundwaves to the mix with enhanced visibility
          mixValue = mix(mixValue, 1.0, wave1 * 0.85);
          mixValue = mix(mixValue, 0.0, wave2 * 0.85);
          mixValue = mix(mixValue, 0.7, wave3 * 0.7);
          
          // Add pulse circles
          mixValue = mix(mixValue, 0.8, circles * 0.6);
          
          // Add 3D effect
          mixValue = mix(mixValue, 0.5, depth * 0.4);
          
          // Add audio reactive waves
          mixValue = mix(mixValue, 0.6, audioWaves * 0.5);
          
          // Add sag waves
          mixValue = mix(mixValue, 0.4, sag * 0.5);
          
          // Add middle soundwave
          mixValue = mix(mixValue, 0.7, middleWave * 0.6);
          
          // Make scroll effect more pronounced and responsive
          float scrollEffect = u_smooth_scroll * 2.0 - 1.0;
          float scrollIntensity = smoothStepEased(0.0, 1.0, abs(scrollEffect));
          mixValue = mix(mixValue, 1.0 - mixValue, scrollIntensity);
          
          // Add noise for texture
          mixValue = mix(mixValue, noiseValue, 0.2);
          
          // Apply balanced contrast enhancement
          mixValue = contrast(mixValue, 2.8);
          
          // Create the final color with enhanced contrast and blue dominance
          vec3 color = mix(color1, color2, mixValue * 0.8);
          
          // Add pulsing effect
          float pulse = sin(u_time * 0.5) * 0.08 + 0.92;
          color *= pulse;
          
          // Add blue glow effect
          float glow = mixValue * 0.55;
          color += vec3(0.0, 0.0, glow);
          
          // Add subtle color variation based on scroll position
          float scrollColor = sin(u_smooth_scroll * 10.0) * 0.12;
          color += vec3(0.0, 0.0, scrollColor);
          
          // Ensure colors stay within a balanced range
          color = clamp(color, vec3(0.0), vec3(0.9, 0.9, 1.0));
          
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Handle scroll with improved responsiveness
    const handleScroll = () => {
      const now = Date.now();
      const timeSinceLastScroll = now - lastScrollTimeRef.current;
      lastScrollTimeRef.current = now;
      
      // Calculate scroll position with easing
      const scrollPosition = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const newScroll = Math.min(Math.max(scrollPosition / maxScroll, 0), 1);
      
      
      // Calculate scroll direction and velocity with increased sensitivity
      const scrollDelta = newScroll - scrollRef.current;
      scrollDirectionRef.current = Math.sign(scrollDelta);
      
      // Calculate velocity with increased sensitivity but cap it for smoother transitions
      scrollVelocityRef.current = Math.min(Math.abs(scrollDelta) * 20, 0.8);
      
      // Detect sudden scroll changes for impulse effect
      if (timeSinceLastScroll < 100 && Math.abs(scrollDelta) > 0.01) {
        material.uniforms.u_scroll_impulse.value = 0.5; // Reduced for smoother effect
      }

      const zoom = Math.min(1.3, 1.0 + smoothScrollRef.current * 0.3);
      material.uniforms.u_section_zoom.value = zoom;
      // Update scroll position
      scrollRef.current = newScroll;
      
      // Detect section transitions
      const section = Math.floor(newScroll * 4);
      const sectionProgress = (newScroll * 4) % 1;
      material.uniforms.u_section_transition.value = sectionProgress;
      material.uniforms.u_section.value = section;
      
      // Update section color
      material.uniforms.u_section_color.value = section;
      
      // Update section-specific effects
      if (section !== sectionRef.current) {
        sectionRef.current = section;
        
        // Set section-specific rotation (slow rotation per section)
        material.uniforms.u_section_rotation.value = section * 0.5; // 0.5 radians per section
        
        // Set section-specific zoom (alternate between zoom in and out)
        material.uniforms.u_section_zoom.value = 1.0 + (section % 2 === 0 ? 0.3 : -0.3);
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Handle resize
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.u_resolution.value.x = window.innerWidth;
      material.uniforms.u_resolution.value.y = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // Animation loop with smoother updates
    let animationFrameId: number;
    const animate = () => {
      if (!renderer.getContext()) return; // Check if context is valid

      material.uniforms.u_time.value += 0.015;
      material.uniforms.u_scroll.value = scrollRef.current;
      
      // Smooth scroll value for transitions
      smoothScrollRef.current += (scrollRef.current - smoothScrollRef.current) * 0.03;
      material.uniforms.u_smooth_scroll.value = smoothScrollRef.current;
      
      material.uniforms.u_scroll_direction.value = scrollDirectionRef.current;
      material.uniforms.u_scroll_velocity.value = scrollVelocityRef.current;
      
      scrollVelocityRef.current *= 0.97;
      material.uniforms.u_scroll_impulse.value *= 0.97;
      
      try {
        renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(animate);
      } catch (error) {
        console.error('Render error:', error);
        // Try to recover
        handleResize();
      }
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
      scene.remove(mesh);
      renderer.dispose();
      material.dispose();
      geometry.dispose();
      if (containerRef.current && renderer.domElement) {
        try {
          containerRef.current.removeChild(renderer.domElement);
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
        background: '#000000', // Changed to black to match the gradient
      }}
    />
  );
};

export default GradientBackground; 