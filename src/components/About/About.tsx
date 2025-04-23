"use client";

import React from 'react';
import styles from './About.module.css';
import Image from 'next/image';

const About: React.FC = () => {
  return (
    <section className={styles.about} id="about">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Modern solutions. Timeless design.</h2>
          <p className={styles.description}>
            We&apos;re not just another voice-over company - we&apos;re your strategic partner in creating impactful, culturally resonant content.
          </p>
        </div>
        
        <div className={styles.grid}>
          <div className={`${styles.card} ${styles.sustainableDesign}`}>
            <Image
              src="/images/placeholder.jpg"
              alt="Sustainable Design"
              className={styles.cardImage}
              width={800}
              height={600}
              priority
            />
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>Sustainable Design</h3>
              <p className={styles.cardDescription}>
                Create eco-friendly spaces that blend innovation with environmental responsibility. Utilizing
                renewable materials and energy-efficient solutions for tomorrow's world.
              </p>
            </div>
          </div>

          <div className={`${styles.card} ${styles.urbanPlanning}`}>
            <Image
              src="/images/placeholder.jpg"
              alt="Urban Planning"
              className={styles.cardImage}
              width={800}
              height={600}
            />
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>Urban Planning</h3>
              <p className={styles.cardDescription}>
                Design thriving communities that balance density with livability, fostering growth.
              </p>
            </div>
          </div>

          <div className={`${styles.card} ${styles.digitalIntegration}`}>
            <Image
              src="/images/placeholder.jpg"
              alt="Digital Integration"
              className={styles.cardImage}
              width={800}
              height={600}
            />
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>Digital Integration</h3>
              <p className={styles.cardDescription}>
                Blend smart technology with architectural design, creating responsive spaces for living.
              </p>
            </div>
          </div>

          <div className={`${styles.card} ${styles.bimSolutions}`}>
            <Image
              src="/images/placeholder.jpg"
              alt="BIM Solutions"
              className={styles.cardImage}
              width={800}
              height={600}
            />
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>BIM Solutions</h3>
              <p className={styles.cardDescription}>
                From concept to construction, leverage advanced modeling tools and AI-driven analytics for
                precise and efficient project delivery.
              </p>
            </div>
          </div>

          <div className={`${styles.card} ${styles.heritagePreservation}`}>
            <Image
              src="/images/placeholder.jpg"
              alt="Heritage Preservation"
              className={styles.cardImage}
              width={800}
              height={600}
            />
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>Heritage Preservation</h3>
              <p className={styles.cardDescription}>
                Restore and adapt historical structures while preserving their cultural significance and
                architectural heritage for future generations.
              </p>
            </div>
          </div>

          <div className={`${styles.card} ${styles.interiorInnovation}`}>
            <Image
              src="/images/placeholder.jpg"
              alt="Interior Innovation"
              className={styles.cardImage}
              width={800}
              height={600}
            />
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>Interior Innovation</h3>
              <p className={styles.cardDescription}>
                Transform interior spaces with cutting-edge design solutions for aesthetics functionality.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 