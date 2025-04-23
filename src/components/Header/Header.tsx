'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const handleLanguageChange = () => {
    // Force a page reload to reset the splash screen state
    window.location.href = '/';
  };

  const scrollToContactForm = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`${styles.header} ${isVisible ? styles.visible : styles.hidden}`}>
      <div className={styles.blur} />
      <div className={styles.container}>
        <div className={styles.left}>
          <button className={styles.button} onClick={handleLanguageChange}>
            Change Language
          </button>
        </div>

        <div className={styles.right}>
          <button className={styles.button} onClick={scrollToContactForm}>
            Contact Us
          </button>
          <button className={`${styles.button} ${styles.demo}`} onClick={scrollToContactForm}>
            Request Demo
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 