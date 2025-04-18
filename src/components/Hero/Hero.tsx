"use client";

import React, { useEffect, useState } from 'react';
import styles from './Hero.module.css';
import { BsChevronDown } from 'react-icons/bs';

const words = [
  "Audiobooks",
  "Advertisements",
  "SSM",
];

const Hero: React.FC = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.hero}>
      <video
        autoPlay
        loop
        muted
        playsInline
        className={styles.videoBackground}
      >
        <source src="/videos/hero-background.mp4" type="video/mp4" />
      </video>
      
      <div className={styles.content}>
        <div className={styles.textContent}>
          <h1 className={styles.staticTitle}>
            We help you to hire top
          </h1>
          <div className={styles.dynamicTitle}>
            {words.map((word, index) => (
              <span
                key={word}
                className={`${styles.word} ${index === currentWordIndex ? styles.wordVisible : ''}`}
              >
                {word}
              </span>
            ))}
          </div>
          <p className={styles.subtitle}>
            Discover exceptional talent, fast.
          </p>
        </div>

        <div className={styles.cta}>
          <a href="#join" className={styles.primaryButton}>
            JOIN OUR NETWORK
          </a>
          <a href="#hire" className={styles.secondaryButton}>
            HIRE TOP TALENT
          </a>
        </div>
      </div>

      <button onClick={scrollToAbout} className={styles.scrollPrompt}>
        <span>SCROLL TO EXPLORE</span>
        <BsChevronDown className={styles.scrollIcon} />
      </button>
    </section>
  );
};

export default Hero; 