"use client";

import React, { useEffect, useRef } from 'react';
import styles from './UseCases.module.css';

const useCases = [
  {
    icon: '🎯',
    title: 'Advertising',
    description: 'Create engaging voiceovers for your marketing campaigns with consistent brand voice.',
  },
  {
    icon: '📞',
    title: 'IVR Systems',
    description: 'Build natural-sounding interactive voice response systems for better customer experience.',
  },
  {
    icon: '🌍',
    title: 'Localization',
    description: 'Easily translate and localize your content with authentic regional accents.',
  },
  {
    icon: '🎙️',
    title: 'Podcasting',
    description: 'Generate professional-quality podcast voices with natural conversation flow.',
  },
  {
    icon: '♿',
    title: 'Accessibility',
    description: 'Make your content more accessible with high-quality text-to-speech conversion.',
  },
  {
    icon: '🤖',
    title: 'AI Avatars',
    description: 'Create lifelike AI avatars with synchronized voice and facial expressions.',
  },
];

const UseCases: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);

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

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => {
      if (gridRef.current) {
        observer.unobserve(gridRef.current);
      }
    };
  }, []);

  return (
    <section className={styles.useCases} id="use-cases">
      <div className={styles.container}>
        <h2 className={styles.title}>Use Cases</h2>
        <p className={styles.description}>
          Discover how VoxStudios can transform your business communication
          across various industries and applications.
        </p>
        <div ref={gridRef} className={styles.casesGrid}>
          {useCases.map((useCase, index) => (
            <div key={index} className={styles.caseCard}>
              <div className={styles.caseIcon}>{useCase.icon}</div>
              <h3 className={styles.caseTitle}>{useCase.title}</h3>
              <p className={styles.caseDescription}>{useCase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases; 