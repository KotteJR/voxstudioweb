"use client";

import React, { useEffect, useRef } from 'react';
import styles from './AccentSystem.module.css';

// Sample data for demonstration
const accents = [
  { code: 'en-US', name: 'English (US)', flag: '🇺🇸' },
  { code: 'en-GB', name: 'English (UK)', flag: '🇬🇧' },
  { code: 'es-ES', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr-FR', name: 'French', flag: '🇫🇷' },
  { code: 'de-DE', name: 'German', flag: '🇩🇪' },
  { code: 'it-IT', name: 'Italian', flag: '🇮🇹' },
  { code: 'pt-BR', name: 'Portuguese', flag: '🇧🇷' },
  { code: 'nl-NL', name: 'Dutch', flag: '🇳🇱' },
  { code: 'pl-PL', name: 'Polish', flag: '🇵🇱' },
  { code: 'ru-RU', name: 'Russian', flag: '🇷🇺' },
  { code: 'ja-JP', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko-KR', name: 'Korean', flag: '🇰🇷' },
];

const AccentSystem: React.FC = () => {
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
    <section className={styles.accentSystem} id="features">
      <div className={styles.container}>
        <h2 className={styles.title}>Global Accent Support</h2>
        <p className={styles.description}>
          Our platform supports 78 languages and accents worldwide, ensuring your
          voice content resonates with audiences across the globe.
        </p>
        <div ref={gridRef} className={styles.flagGrid}>
          {accents.map((accent) => (
            <div key={accent.code} className={styles.flagItem}>
              <div className={styles.flagImage}>{accent.flag}</div>
              <div className={styles.flagInfo}>
                <div className={styles.flagName}>{accent.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AccentSystem; 