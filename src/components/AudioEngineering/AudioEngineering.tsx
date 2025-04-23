"use client";

import React, { useRef } from 'react';
import styles from './AudioEngineering.module.css';

const AudioEngineering: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className={styles.audioEngineering} id="audio">
      <div className={styles.container}>
        <h2 className={styles.title}>Advanced Audio Engineering</h2>
        <p className={styles.description}>
          Our cutting-edge audio processing technology ensures crystal-clear voice synthesis with natural intonation and emotional depth. 
          Leveraging state-of-the-art deep learning models, we process and optimize audio in real-time while maintaining perfect clarity across multiple languages and accents. 
          Our advanced noise reduction algorithms and adaptive processing ensure studio-quality output even in challenging acoustic environments.
        </p>
        
        <span className={styles.featuresLabel}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.componentIcon}>
            <circle cx="12" cy="12" r="9" stroke="#fff" strokeWidth="2"/>
            <circle cx="12" cy="12" r="4" stroke="#fff" strokeWidth="2"/>
            <circle cx="12" cy="12" r="1" fill="#fff"/>
          </svg>
          Core Features
        </span>
        <h2 className={styles.featuresTitle}>Powerful Audio Processing</h2>
        
        <div ref={containerRef} className={styles.features}>
          {/* Natural Intonation Card */}
          <div className={styles.featureRow}>
            <div className={styles.featureVisual}>
              <div className={styles.waveform}>
                {[...Array(9)].map((_, i) => (
                  <div key={i} className={styles.bar} />
                ))}
              </div>
            </div>
            <div className={styles.featureContent}>
              <h3 className={styles.featureTitle}>Natural Intonation</h3>
              <p className={styles.featureDescription}>
                Advanced algorithms ensure natural speech patterns and emotional expression
              </p>
            </div>
          </div>

          {/* Noise Reduction Card */}
          <div className={styles.featureRow}>
            <div className={styles.featureVisual}>
              <div className={styles.noiseReduction}>
                {[...Array(30)].map((_, i) => (
                  <div key={i} className={styles.noise} />
                ))}
              </div>
            </div>
            <div className={styles.featureContent}>
              <h3 className={styles.featureTitle}>Noise Reduction</h3>
              <p className={styles.featureDescription}>
                State-of-the-art noise filtering for crystal-clear audio output
              </p>
            </div>
          </div>

          {/* Real-time Processing Card */}
          <div className={styles.featureRow}>
            <div className={styles.featureVisual}>
              <div className={styles.processingAnimation}>
                <div className={styles.processingCircle} />
                <div className={styles.processingCircle} />
                <div className={styles.processingCircle} />
              </div>
            </div>
            <div className={styles.featureContent}>
              <h3 className={styles.featureTitle}>Real-time Processing</h3>
              <p className={styles.featureDescription}>
                Instant voice synthesis with minimal latency for seamless integration
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudioEngineering; 