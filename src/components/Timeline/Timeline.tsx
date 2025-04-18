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
  heading = "Experience the difference with us",
  description = "We believe in creating lasting partnerships with our clients, focusing on long-term success through collaborative innovation and dedicated support.",
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
      image: "/images/placeholder.jpg",
      title: "Dedicated Support",
      description: "Expanded operations to 5 new countries, reaching millions of new users.",
    },
    {
      image: "/images/placeholder.jpg",
      title: "Series B Funding",
      description: "Secured $50M in Series B funding to accelerate product development.",
    },
    {
      image: "/images/placeholder.jpg",
      title: "Product Launch",
      description: "Successfully launched our flagship product to market.",
    },
    {
      image: "/images/placeholder.jpg",
      title: "Company Founded",
      description: "Started with a vision to revolutionize the industry.",
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