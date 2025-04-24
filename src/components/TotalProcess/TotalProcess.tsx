"use client";

import React, { useEffect, useState } from 'react';
import styles from './TotalProcess.module.css';
import Image from 'next/image';

const features = [
  {
    id: "01",
    title: "You send the script",
    description: "We review your script, brand tone, and context to understand the creative intent.",
    icon: "📝"
  },
  {
    id: "02",
    title: "We craft the voice",
    description: "Our AI models generate custom voice options — tailored by emotion, dialect, and style.",
    icon: "🎙️"
  },
  {
    id: "03",
    title: "You review and refine",
    description: "You select your preferred voice and provide feedback — we adjust pacing, intonation, and emphasis.",
    icon: "✨"
  },
  {
    id: "04",
    title: "Final audio delivered",
    description: "You receive broadcast-ready audio files — quality-checked by our engineering team.",
    icon: "🎧"
  }
];

const TotalProcess: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className={styles.totalProcess} id="process">
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h2 className={styles.title}>Giving voice to your vision</h2>
            <p className={styles.subtitle}>
              Vox Studios handles everything from voice creation to final mastering — so you can focus on campaigns, not casting.
            </p>
            
            <div className={styles.features}>
              {features.map((feature) => (
                <div key={feature.id} className={styles.featureItem}>
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <div className={styles.featureContent}>
                    <h3 className={styles.featureTitle}>{feature.title}</h3>
                    <p className={styles.featureDescription}>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {!isMobile && (
            <div className={styles.imageContainer}>
              <Image
                src="/images/feedback-front.png"
                alt="Voice Creation Process"
                width={600}
                height={400}
                className={styles.mockupImage}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TotalProcess; 