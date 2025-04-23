"use client";

import React, { useState, useEffect } from 'react';
import styles from './Navigation.module.css';
import Image from 'next/image';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolledUp, setIsScrolledUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Check if at top of page
      setIsAtTop(currentScrollY === 0);
      
      // Check if scrolling up or down
      setIsScrolledUp(currentScrollY < lastScrollY || currentScrollY === 0);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navClass = `${styles.nav} 
    ${!isAtTop ? styles.solid : ''} 
    ${!isScrolledUp ? styles.hidden : ''}`;

  return (
    <nav className={navClass}>
      <div className={styles.container}>
        <a href="#" className={styles.logo} onClick={() => scrollToSection('hero')}>
          <Image 
            src="/images/logo.png" 
            alt="VoxStudios Logo" 
            width={160} 
            height={40} 
            className={styles.logoImage}
          />
        </a>
        <button className={styles.mobileMenuButton} onClick={toggleMenu}>
          ☰
        </button>
        <ul className={`${styles.navLinks} ${isMenuOpen ? styles.open : ''}`}>
          <li>
            <a
              href="#about"
              className={styles.navLink}
              onClick={() => scrollToSection('about')}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#features"
              className={styles.navLink}
              onClick={() => scrollToSection('features')}
            >
              Features
            </a>
          </li>
          <li>
            <a
              href="#demo"
              className={styles.navLink}
              onClick={() => scrollToSection('demo')}
            >
              Demo
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className={styles.navLink}
              onClick={() => scrollToSection('contact')}
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation; 