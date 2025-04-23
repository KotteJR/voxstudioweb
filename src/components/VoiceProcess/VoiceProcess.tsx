"use client";

import React, { useEffect, useRef, useState } from 'react';
import styles from './VoiceProcess.module.css';

const VoiceProcess: React.FC = () => {
  const [activeSection, setActiveSection] = useState(0);
  const sectionsRef = useRef<HTMLDivElement>(null);

  const sections = [
    {
      label: "Step 1",
      title: "Describe your ideal voice",
      description: "We start by reviewing your script, brand tone, and creative direction to understand intent. Whether for digital, TV, or corporate, we tailor our approach to match context and audience. This ensures the voiceover aligns with both emotional tone and strategic goals.",
      image: "/images/kotleeev_retro-futuristic_spaceship_landed_on_the_moon_viewed_cdfa543c-b9bf-49ac-befc-1666dd4263a4_0.png"
    },
    {
      label: "Step 2",
      title: "Choose your voice",
      description: "Based on your brief, we generate tailored AI voice options. Preview and pick the one that fits. Custom or base, it's all yours.",
      image: "/images/kotleeev_retro-futuristic_spaceship_landed_on_the_moon_viewed_cdfa543c-b9bf-49ac-befc-1666dd4263a4_1.png"
    },
    {
      label: "Step 3",
      title: "Tell us what to say",
      description: "Clients upload their finalized script or draft, and optionally timestamp key moments. This guides how the voiceover will be performed.",
      image: "/images/kotleeev_retro-futuristic_spaceship_landed_on_the_moon_viewed_cdfa543c-b9bf-49ac-befc-1666dd4263a4_2.png"
    },
    {
      label: "Step 4",
      title: "Refine to perfection",
      description: "Provide targeted feedback on voice performance. We revise and iterate until it meets your expectations.",
      image: "/images/kotleeev_retro-futuristic_spaceship_landed_on_the_moon_viewed_cdfa543c-b9bf-49ac-befc-1666dd4263a4_3.png"
    }
  ];

  useEffect(() => {
    if (!sectionsRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setActiveSection(index);
          }
        });
      },
      {
        root: null,
        rootMargin: '-45% 0px -45% 0px',
        threshold: 0
      }
    );

    const sections = sectionsRef.current.children;
    Array.from(sections).forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.features} ref={sectionsRef}>
            {sections.map((section, index) => (
              <div 
                key={index} 
                className={styles.featureCard}
                data-index={index}
              >
                <span className={styles.sectionLabel}>{section.label}</span>
                <h3 className={styles.sectionTitle}>{section.title}</h3>
                <p className={styles.sectionDescription}>{section.description}</p>
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

export default VoiceProcess; 