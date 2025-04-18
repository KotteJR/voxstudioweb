"use client";

import React, { useEffect, useRef } from 'react';
import styles from './AudioEngineering.module.css';

const AudioEngineering: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <section className={styles.audioEngineering} id="audio">
      <div className={styles.container}>
        <h2 className={styles.title}>Advanced Audio Engineering</h2>
        <p className={styles.description}>
          Our cutting-edge audio processing technology ensures crystal-clear voice
          synthesis with natural intonation and emotional depth.
        </p>
        <div ref={containerRef} className={styles.waveformContainer}>
          <div className={styles.waveform}>
            {[...Array(9)].map((_, i) => (
              <div key={i} className={styles.bar} />
            ))}
          </div>
          <div className={styles.waveform}>
            {[...Array(9)].map((_, i) => (
              <div key={i} className={styles.bar} />
            ))}
          </div>
          <div className={styles.waveform}>
            {[...Array(9)].map((_, i) => (
              <div key={i} className={styles.bar} />
            ))}
          </div>
        </div>
        <div className={styles.features}>
          <div className={styles.feature}>
            <h3 className={styles.featureTitle}>Natural Intonation</h3>
            <p className={styles.featureDescription}>
              Advanced algorithms ensure natural speech patterns and emotional expression
            </p>
          </div>
          <div className={styles.feature}>
            <h3 className={styles.featureTitle}>Noise Reduction</h3>
            <p className={styles.featureDescription}>
              State-of-the-art noise filtering for crystal-clear audio output
            </p>
          </div>
          <div className={styles.feature}>
            <h3 className={styles.featureTitle}>Real-time Processing</h3>
            <p className={styles.featureDescription}>
              Instant voice synthesis with minimal latency for seamless integration
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudioEngineering; 