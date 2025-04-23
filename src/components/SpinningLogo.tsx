'use client';
import { FC } from 'react';
import Image from 'next/image';
import styles from './SpinningLogo.module.css';

interface SpinningLogoProps {
  isVisible: boolean;
}

const SpinningLogo: FC<SpinningLogoProps> = ({ isVisible }) => {
  return (
    <div className={`${styles.container} ${isVisible ? styles.visible : styles.hidden}`}>
      <Image
        src="/images/logo.png"
        alt="Loading..."
        width={100}
        height={100}
        className={styles.logo}
        priority
      />
    </div>
  );
};

export default SpinningLogo; 