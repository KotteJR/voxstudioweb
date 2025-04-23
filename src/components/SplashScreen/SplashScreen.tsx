'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import styles from './SplashScreen.module.css';
import HeroCanvas from '../HeroCanvas';
import * as THREE from 'three';
import CLOUDS from 'vanta/dist/vanta.clouds.min';

interface SplashScreenProps {
  onEnter: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onEnter }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const vantaRef = useRef<any>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!vantaRef.current && backgroundRef.current) {
      vantaRef.current = CLOUDS({
        el: backgroundRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        skyColor: 0x4966ff,
        cloudColor: 0x89,
        speed: 1.0
      });
    }

    return () => {
      if (vantaRef.current) {
        vantaRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const languages = [
    { lang: 'English', code: 'gb' },
    { lang: 'Serbian', code: 'rs' },
    { lang: 'Macedonian', code: 'mk' },
    { lang: 'Croatian', code: 'hr' },
    { lang: 'Bulgarian', code: 'bg' },
    { lang: 'Swedish', code: 'se' }
  ];

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    setIsDropdownOpen(false);
  };

  const handleEnter = () => {
    if (selectedLanguage) {
      onEnter();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className={styles.splashScreen}
    >
      <div className={styles.grainOverlay} />
      <motion.div 
        ref={backgroundRef}
        className={styles.background}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className={styles.overlay} />
      </motion.div>
      
      <div className={styles.content}>
        <motion.div 
          className={styles.canvasWrapper}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <HeroCanvas />
        </motion.div>
        
        <AnimatePresence>
          {isLoaded && (
            <motion.div 
              className={styles.enterSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className={styles.languageSelector}>
                <div className={styles.dropdownContainer}>
                  <button 
                    className={styles.dropdownButton}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    {selectedLanguage || 'Language'}
                    <span className={styles.dropdownArrow}>▼</span>
                  </button>
                  
                  {isDropdownOpen && (
                    <motion.div 
                      className={styles.dropdownList}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.2 }}
                    >
                      {languages.map((item) => (
                        <button
                          key={item.code}
                          className={styles.dropdownItem}
                          onClick={() => handleLanguageSelect(item.lang)}
                        >
                          {item.lang}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
                
                <motion.button
                  className={`${styles.enterButton} ${selectedLanguage ? styles.active : ''}`}
                  onClick={handleEnter}
                  disabled={!selectedLanguage}
                  whileHover={selectedLanguage ? { scale: 1.05 } : {}}
                  whileTap={selectedLanguage ? { scale: 0.95 } : {}}
                >
                  Enter
                </motion.button>
              </div>
              
              <motion.div
                className={styles.poweredBy}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <Image
                  src="/images/boksy.png"
                  alt="Powered by Boksy"
                  width={100}
                  height={30}
                  className={styles.boksyLogo}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SplashScreen; 