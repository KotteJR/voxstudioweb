'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SplashScreen from '@/components/SplashScreen/SplashScreen';
import HorizontalScroll from '@/components/HorizontalScroll/HorizontalScroll';
import HorizontalScroll2 from '@/components/HorizontalScroll2/HorizontalScroll2';
import About from '@/components/About/About';
import AudioEngineering from '@/components/AudioEngineering/AudioEngineering';
import VoiceProcess2 from '@/components/VoiceProcess/VoiceProcess2';
import ContactUs from '@/components/ContactUs/ContactUs';
import Footer from '@/components/Footer/Footer';
import Hero from '@/components/Hero/Hero';
import AIDemo from '@/components/AIDemo/AIDemo';
import GlobalAccent from '@/components/GlobalAccent/GlobalAccent';
import TotalProcess from '@/components/TotalProcess/TotalProcess';
import Header from '@/components/Header/Header';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleEnter = () => {
    setShowSplash(false);
  };

  const MobileContent = () => (
    <div className="vertical-layout">
      <Header />
      <Hero />
      <AIDemo />
      <GlobalAccent />
      <TotalProcess />
      <VoiceProcess2 />
      <ContactUs />
    </div>
  );

  const DesktopContent = () => (
    <>
      <HorizontalScroll />
      <HorizontalScroll2 />
      <VoiceProcess2 />
      <AudioEngineering />
      <ContactUs />
    </>
  );

  return (
    <main>
      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen onEnter={handleEnter} key="splash" />
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {isMobile ? <MobileContent /> : <DesktopContent />}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
