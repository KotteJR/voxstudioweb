"use client";

import React, { useEffect, useRef, useState } from 'react';
import styles from './VoiceProcess.module.css';

const VoiceProcess2: React.FC = () => {
  const [activeSection, setActiveSection] = useState(0);
  const sectionsRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const lastActiveRef = useRef(0);

  const sections = [
    {
      label: "Stage 1",
      title: "You send the script",
      description: "We start by reviewing your script, brand tone, and creative direction to understand intent. Whether for digital, TV, or corporate, we tailor our approach to match context and audience. This ensures the voiceover aligns with both emotional tone and strategic goals.",
      image: "/images/stage1.png"
    },
    {
      label: "Stage 2",
      title: "We craft the voice",
      description: "Using advanced AI synthesis, we generate voice options tailored to your campaign's needs. Each voice is shaped by emotion, pacing, dialect, and delivery style. The result is a voice that feels human — because it's designed that way.",
      image: "/images/stage2.png"
    },
    {
      label: "Stage 3",
      title: "You review and refine",
      description: "We present multiple voice variants — each aligned with your brief but offering tonal variety. You select the most fitting voice and share feedback on delivery, pacing, or emphasis. We refine accordingly to ensure it matches your creative vision.",
      image: "/images/stage3.png"
    },
    {
      label: "Stage 4",
      title: "Final audio delivered",
      description: "Your selected voiceover is mastered by our engineers for clarity, consistency, and compliance. We deliver the final files in your preferred format — ready for immediate use. Every detail, from file naming to sound levels, is handled to spec.",
      image: "/images/stage4.png"
    }
  ];

  useEffect(() => {
    if (!sectionsRef.current) return;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLElement;
        const index = Number(target.getAttribute('data-index'));
        
        if (entry.intersectionRatio > 0.6 && lastActiveRef.current !== index) {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }

          timeoutRef.current = setTimeout(() => {
            setActiveSection(index);
            lastActiveRef.current = index;
          }, 100);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '-20% 0px -30% 0px',
      threshold: [0.6]
    });

    const sections = sectionsRef.current.children;
    Array.from(sections).forEach(section => observer.observe(section));

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <span className={styles.featuresLabel}>
          
        </span>
        <h2 className={styles.featuresTitle}>The Complete Process</h2>
        <div className={styles.grid}>
          <div className={styles.features} ref={sectionsRef}>
            {sections.map((section, index) => (
              <div 
                key={index} 
                className={`${styles.featureCard} ${activeSection === index ? styles.active : ''}`}
                data-index={index}
              >
                <div className={styles.cardContent}>
                  <span className={styles.sectionLabel}>{section.label}</span>
                  <h3 className={styles.sectionTitle}>{section.title}</h3>
                  <p className={styles.sectionDescription}>{section.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.stickyImage}>
            <div className={styles.imageContainer}>
              <img 
                src={sections[activeSection].image}
                alt={sections[activeSection].title}
                className={styles.previewImage}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VoiceProcess2; 