"use client";

import React from 'react';
import styles from './Hero.module.css';

const Hero: React.FC = () => {
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.mainHeading}>
          AI-Powered Voiceover Localization for the Adriatic Region
        </h1>
        <div className={styles.rightContent}>
          <p className={styles.description}>
            Bring your campaigns to life in Serbian, Croatian, Bosnian, Slovenian, Macedonian, and Bulgarian — with native-level nuance, cultural accuracy, and studio-grade quality, powered by AI and refined by humans.
          </p>
          <div className={styles.buttonContainer}>
            <a href="#contact" className={styles.button} onClick={scrollToContact}>
              Contact Us
              <svg 
                className={styles.arrow}
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M13.5 19L20.5 12L13.5 5M3.5 12H20" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a href="#contact" className={styles.button} onClick={scrollToContact}>
              Request Demo
              <svg 
                className={styles.arrow}
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M13.5 19L20.5 12L13.5 5M3.5 12H20" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 