"use client";

import React from 'react';
import styles from './GlobalAccent.module.css';
import { ArrowRight } from 'lucide-react';
import * as flags from 'country-flag-icons/react/3x2';

const countries = [
  { code: 'RS', name: 'Serbia' },
  { code: 'HR', name: 'Croatia' },
  { code: 'BG', name: 'Bulgaria' },
  { code: 'SE', name: 'Sweden' },
  { code: 'MK', name: 'Macedonia' },
  { code: 'RU', name: 'Russia' },
  { code: 'CN', name: 'China' },
  { code: 'ES', name: 'Spain' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'IT', name: 'Italy' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'PL', name: 'Poland' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'GR', name: 'Greece' },
];

const GlobalAccent: React.FC = () => {
  // Create duplicate array for seamless scrolling
  const allCountries = [...countries, ...countries];

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
              Explore our solutions <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
        
        <div className={styles.flagsContainer}>
          <div className={styles.flagsTrack}>
            {allCountries.map((country, index) => {
              const FlagComponent = flags[country.code as keyof typeof flags];
              return (
                <div key={`${country.code}-${index}`} className={styles.flagItem}>
                  <FlagComponent title={country.name} className={styles.flag} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalAccent; 