"use client";

import React from 'react';
import styles from './Stats.module.css';
import { ArrowRight } from "lucide-react";

interface StatsProps {
  heading?: string;
  description?: string;
  link?: {
    text: string;
    url: string;
  };
  stats?: Array<{
    id: string;
    value: string;
    label: string;
  }>;
}

const Stats: React.FC<StatsProps> = ({
  heading = "Transforming Architecture Through Technology",
  description = "Delivering measurable impact across design, sustainability, and client satisfaction",
  link = {
    text: "Read our full impact report",
    url: "#",
  },
  stats = [
    {
      id: "stat-1",
      value: "95%",
      label: "reduction in design iteration time",
    },
    {
      id: "stat-2",
      value: "40%",
      label: "increase in energy efficiency",
    },
    {
      id: "stat-3",
      value: "500+",
      label: "successful projects delivered",
    },
    {
      id: "stat-4",
      value: "98%",
      label: "client satisfaction rate",
    },
  ],
}) => {
  return (
    <section className={styles.stats}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{heading}</h2>
          <p className={styles.description}>{description}</p>
          <a href={link.url} className={styles.link}>
            {link.text}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className={styles.statsGrid}>
          {stats.map((stat) => (
            <div key={stat.id} className={styles.statItem}>
              <div className={styles.statValue}>{stat.value}</div>
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats; 