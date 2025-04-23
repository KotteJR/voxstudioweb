'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SplashScreen from '@/components/SplashScreen/SplashScreen';
import HorizontalScroll from '@/components/HorizontalScroll/HorizontalScroll';
import HorizontalScroll2 from '@/components/HorizontalScroll2/HorizontalScroll2';
import About from '@/components/About/About';
import AudioEngineering from '@/components/AudioEngineering/AudioEngineering';
import VoiceProcess2 from '@/components/VoiceProcess/VoiceProcess2';
import ContactUs from '@/components/ContactUs/ContactUs';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  const handleEnter = () => {
    setShowSplash(false);
  };

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
            <HorizontalScroll />
            <HorizontalScroll2 />
            <VoiceProcess2 />
            <AudioEngineering />
            <ContactUs />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
