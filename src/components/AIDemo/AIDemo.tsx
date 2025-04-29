'use client';

import React, { useRef, useEffect, useState } from 'react';
import styles from './AIDemo.module.css';
import FeatureIcon from './FeatureIcon';

const AIDemo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (!videoRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const playPromise = videoRef.current?.play();
            if (playPromise !== undefined) {
              playPromise.catch(error => {
                // Auto-play was prevented
                console.log("Autoplay prevented:", error);
              });
            }
          } else {
            videoRef.current?.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(videoRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.textContent}>
          <h1 className={styles.title}>Voiceover Localization </h1>
          <p className={styles.description}>
            Bring your campaigns to life in Serbian, Croatian, Bosnian, Slovenian, Macedonian, and Bulgarian — with native-level nuance, cultural accuracy, and studio-grade quality, powered by AI and refined by humans.
          </p>
        </div>
        <div className={styles.videoContainer}>
          <video 
            ref={videoRef}
            className={styles.video}
            playsInline
            loop
            muted={isMuted}
          >
            <source src="/videos/english.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button 
            className={styles.muteButton}
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M23 9L17 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17 9L23 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15.54 8.46C16.4774 9.39764 17.0039 10.6692 17.0039 12C17.0039 13.3308 16.4774 14.6024 15.54 15.54" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19.07 4.93C20.9447 6.80528 21.9979 9.34836 21.9979 12C21.9979 14.6516 20.9447 17.1947 19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className={styles.features}>
        <div className={styles.featureItem}>
          <div className={styles.featureIcon}>
            <FeatureIcon type="language" />
          </div>
          <h3 className={styles.featureTitle}>Adriatic Languages</h3>
          <p className={styles.featureDescription}>
            Voiceovers delivered in 6 Balkan languages — each adapted with cultural precision and performed with native vocal authenticity.
          </p>
        </div>

        <div className={styles.featureItem}>
          <div className={styles.featureIcon}>
            <FeatureIcon type="workflow" />
          </div>
          <h3 className={styles.featureTitle}>Human Workflow</h3>
          <p className={styles.featureDescription}>
            We merge cutting-edge AI with native linguists and expert engineers to craft expressive, broadcast-ready voiceovers at scale.
          </p>
        </div>

        <div className={styles.featureItem}>
          <div className={styles.featureIcon}>
            <FeatureIcon type="agency" />
          </div>
          <h3 className={styles.featureTitle}>Built For Agencies</h3>
          <p className={styles.featureDescription}>
            Tight deadlines? Multi-market launches? We've done it for Nike, Telekom, L'Oréal, and we can do it for you.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AIDemo; 