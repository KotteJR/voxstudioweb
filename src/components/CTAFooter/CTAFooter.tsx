"use client";

import React, { useEffect, useRef, useState } from 'react';
import styles from './CTAFooter.module.css';

const CTAFooter: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => {
      if (formRef.current) {
        observer.unobserve(formRef.current);
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Email submitted:', email);
    setEmail('');
  };

  return (
    <section className={styles.ctaFooter} id="contact">
      <div className={styles.container}>
        <h2 className={styles.title}>Start Creating Your Voice Today</h2>
        <p className={styles.description}>
          Join thousands of businesses already using VoxStudios to transform their
          voice content. Get started with a free trial.
        </p>
        <form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input
              type="email"
              className={styles.input}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className={styles.button}>
              Get Started
            </button>
          </div>
        </form>
        <footer className={styles.footer}>
          <ul className={styles.footerLinks}>
            <li>
              <a href="#about" className={styles.footerLink}>
                About
              </a>
            </li>
            <li>
              <a href="#features" className={styles.footerLink}>
                Features
              </a>
            </li>
            <li>
              <a href="#demo" className={styles.footerLink}>
                Demo
              </a>
            </li>
            <li>
              <a href="#contact" className={styles.footerLink}>
                Contact
              </a>
            </li>
          </ul>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} VoxStudios. All rights reserved.
          </p>
        </footer>
      </div>
    </section>
  );
};

export default CTAFooter; 