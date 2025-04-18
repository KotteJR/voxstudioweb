"use client";

import React, { useEffect, useRef } from 'react';
import styles from './PlatformDemo.module.css';

const PlatformDemo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLDivElement>(null);

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
    if (iframeRef.current) {
      observer.observe(iframeRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
      if (iframeRef.current) {
        observer.unobserve(iframeRef.current);
      }
    };
  }, []);

  return (
    <section className={styles.platformDemo} id="demo">
      <div className={styles.container}>
        <h2 className={styles.title}>Platform Demo</h2>
        <p className={styles.description}>
          Experience our platform in action. Upload your voice samples, customize
          your settings, and export high-quality AI-generated voices.
        </p>
        <div ref={containerRef} className={styles.demoContainer}>
          <div className={styles.demoCard}>
            <div className={styles.cardIcon}>🎤</div>
            <h3 className={styles.cardTitle}>Upload Voice</h3>
            <p className={styles.cardDescription}>
              Simply upload your voice samples and let our AI analyze your unique
              vocal characteristics.
            </p>
          </div>
          <div className={styles.demoCard}>
            <div className={styles.cardIcon}>⚙️</div>
            <h3 className={styles.cardTitle}>Customize</h3>
            <p className={styles.cardDescription}>
              Fine-tune your voice settings, adjust emotions, and perfect your
              desired tone.
            </p>
          </div>
          <div className={styles.demoCard}>
            <div className={styles.cardIcon}>📤</div>
            <h3 className={styles.cardTitle}>Export</h3>
            <p className={styles.cardDescription}>
              Download your AI-generated voice in multiple formats, ready for
              immediate use.
            </p>
          </div>
        </div>
        <div ref={iframeRef} className={styles.iframeContainer}>
          <iframe
            className={styles.iframe}
            src="https://voxstudios-lake.vercel.app"
            title="VoxStudios Platform Demo"
          />
        </div>
      </div>
    </section>
  );
};

export default PlatformDemo; 