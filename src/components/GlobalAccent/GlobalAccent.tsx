"use client";

import React from 'react';
import styles from './GlobalAccent.module.css';
import { ArrowRight } from 'lucide-react';

const stats = [
  {
    id: "languages",
    value: "60+",
    title: "Brand Campaigns Localized",
    description: "From global beauty brands to regional telecom leaders, we've localized campaigns that resonate with audiences across the Balkan market."
  },
  {
    id: "pace",
    value: "48h",
    title: "Average Project Turnaround",
    description: "We deliver voiceovers in less than 2 days, ensuring your content is always up-to-date and ready for use."
  },
  {
    id: "revisions",
    value: "92%",
    title: "Result in Zero revisions",
    description: "We deliver voiceovers that are ready to use from the first take, thanks to our rigorous quality control and experienced voice talent selection process."
  },
  {
    id: "cost",
    value: "-60%",
    title: "Lower Production Cost",
    description: "Technology cuts cost, not corners. Our AI-enhanced process allows us to offer flexible pricing while delivering studio-grade voiceovers."
  },
];

const GlobalAccent: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Bringing a voice to your ideas.</h2>
          <div>
            <p className={styles.description}>
              We thrive on the power of AI. Our model is trained on 78 languages and varying accents worldwide, ensuring your voice content resonates with audiences across the globe.
            </p>
            <a href="#solutions" className={styles.link}>
              Get in Touch <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
        
        <div className={styles.statsGrid}>
          {stats.map((stat) => (
            <div key={stat.id} className={styles.statItem}>
              <div className={styles.statValue}>{stat.value}</div>
              <h3 className={styles.statTitle}>{stat.title}</h3>
              <p className={styles.statDescription}>{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalAccent; 