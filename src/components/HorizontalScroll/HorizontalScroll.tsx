'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '../Hero/Hero';
import AIDemo from '../AIDemo/AIDemo';
import Header from '../Header/Header';
import styles from './HorizontalScroll.module.css';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const HorizontalScroll: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sections = gsap.utils.toArray(`.${styles.panel}`);
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        pin: true,
        scrub: 1,
        snap: {
          snapTo: 1 / (sections.length - 1),
          duration: { min: 0.2, max: 0.3 },
          delay: 0.1,
          ease: "power1.inOut"
        },
        end: () => `+=${window.innerWidth}`,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        fastScrollEnd: true,
        preventOverlaps: true,
        pinSpacing: true,
        markers: false
      }
    });

    tl.fromTo(sections, 
      { xPercent: 0 },
      { 
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        duration: 1,
        smoothChildTiming: true
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <Header />
      <div className={styles.container} ref={containerRef}>
        <div className={`${styles.panel} ${styles.heroPanel}`}>
          <Hero />
        </div>
        <div className={`${styles.panel} ${styles.demoPanel}`}>
          <AIDemo />
        </div>
      </div>
    </>
  );
};

export default HorizontalScroll; 