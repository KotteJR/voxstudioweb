'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import styles from './SplashScreen.module.css';
import HeroCanvas from '../HeroCanvas';

interface SplashScreenProps {
  onEnter: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onEnter }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const languages = [
    { lang: 'English', code: 'gb', available: true },
    { lang: 'Serbian', code: 'rs', available: false },
    { lang: 'Macedonian', code: 'mk', available: false },
    { lang: 'Croatian', code: 'hr', available: false },
    { lang: 'Bulgarian', code: 'bg', available: false },
    { lang: 'Swedish', code: 'se', available: false }
  ];

  const handleLanguageSelect = (language: string, available: boolean) => {
    if (available) {
      setSelectedLanguage(language);
      setIsDropdownOpen(false);
    }
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
                          className={`${styles.dropdownItem} ${!item.available ? styles.disabled : ''}`}
                          onClick={() => handleLanguageSelect(item.lang, item.available)}
                        >
                          {item.lang}
                          {!item.available && <span className={styles.comingSoon}>Coming Soon</span>}
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