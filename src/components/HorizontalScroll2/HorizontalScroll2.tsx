'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlobalAccent from '../GlobalAccent/GlobalAccent';
import TotalProcess from '../TotalProcess/TotalProcess';
import styles from './HorizontalScroll2.module.css';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const HorizontalScroll2: React.FC = () => {
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

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={`${styles.panel} ${styles.accentPanel}`}>
        <GlobalAccent />
      </div>
      <div className={`${styles.panel} ${styles.processPanel}`}>
        <TotalProcess />
      </div>
    </div>
  );
};

export default HorizontalScroll2; 