"use client";

import React from 'react';
import styles from './TotalProcess.module.css';
import Image from 'next/image';

const features = [
  {
    id: 1,
    icon: "📝",
    title: "You send the script",
    description: "We review your script, brand tone, and context to understand the creative intent."
  },
  {
    id: 2,
    icon: "🎙️",
    title: "We craft the voice",
    description: "Our AI models generate custom voice options — tailored by emotion, dialect, and style."
  },
  {
    id: 3,
    icon: "✨",
    title: "You review and refine",
    description: "You select your preferred voice and provide feedback — we adjust pacing, intonation, and emphasis."
  },
  {
    id: 4,
    icon: "🎧",
    title: "Final audio delivered",
    description: "You receive broadcast-ready audio files — quality-checked by our engineering team."
  }
];

const TotalProcess: React.FC = () => {
  return (
    <section className={styles.totalProcess}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.imageWrapper}>
            <Image
              src="/images/screen.png"
              alt="Vox Studios Feedback Interface"
              width={700}
              height={350}
              className={styles.mockupImage}
              priority
            />
          </div>

          <div className={styles.textContent}>
            <h2 className={styles.title}>Giving voice to your vision</h2>
            <p className={styles.subtitle}>
              Vox Studios handles everything from voice creation to final mastering
            </p>
          </div>

          <div className={styles.features}>
            {features.map((feature) => (
              <div key={feature.id} className={styles.featureItem}>
                <div className={styles.featureIcon}>
                  {feature.icon}
                </div>
                <div className={styles.featureContent}>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TotalProcess; 