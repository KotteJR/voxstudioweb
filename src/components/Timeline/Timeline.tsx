"use client";

import React from 'react';
import Image from 'next/image';
import styles from './Timeline.module.css';

interface Feature {
  image: string;
  title: string;
  description: string;
}

interface TimelineProps {
  heading?: string;
  description?: string;
  buttons?: {
    primary: {
      text: string;
      url: string;
    };
    secondary: {
      text: string;
      url: string;
    };
  };
  features?: Feature[];
}

const Timeline: React.FC<TimelineProps> = ({
  heading = "Voice Production for Modern Teams",
  description = "An all-in-one platform that simplifies briefing, voice generation, scripting, and feedback — empowering teams to produce studio-grade AI voiceovers, faster.",
  buttons = {
    primary: {
      text: "Start Now",
      url: "#",
    },
    secondary: {
      text: "Book a demo",
      url: "#",
    },
  },
  features = [
    {
      image: "/images/description.png",
      title: "Describe your ideal voice.",
      description: "Users outline what they need: accent, tone, gender, language, style, and emotional nuance. Our AI uses this to generate a tailor-fit voice profile.",
    },
    {
      image: "/images/voice1.png",
      title: "Choose your voice.",
      description: "Based on your brief, we generate tailored AI voice options. Preview and pick the one that fits. Custom or base, it's all yours.",
    },
    {
      image: "/images/script.png",
      title: "Tell us what to say.",
      description: "Clients upload their finalized script or draft, and optionally timestamp key moments. This guides how the voiceover will be performed.",
    },
    {
      image: "/images/feedback.png",
      title: "Refine to perfection.",
      description: "Provide targeted feedback on voice performance. We revise and iterate until it meets your expectations.",
    },
  ],
}) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.content}>
            <h2 className={styles.title}>{heading}</h2>
            <p className={styles.description}>{description}</p>
            <div className={styles.buttons}>
              <a href={buttons.primary.url} className={styles.primaryButton}>
                {buttons.primary.text}
              </a>
              <a href={buttons.secondary.url} className={styles.secondaryButton}>
                {buttons.secondary.text}
              </a>
            </div>
          </div>
          <div className={styles.features}>
            {features.map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className={styles.featureImage}
                  />
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

export default Timeline; 