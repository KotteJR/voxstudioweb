'use client';

import React from 'react';
import styles from './Banner.module.css';

interface BannerProps {
  title?: string;
  description?: string;
  linkText?: string;
  linkUrl?: string;
  onClose?: () => void;
}

const Banner: React.FC<BannerProps> = ({
  title = "Currently we only",
  description = "accept 20 clients per month.",
  linkText,
  linkUrl,
  onClose
}) => {
  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        <span className={styles.title}>{title}</span>{' '}
        <span className={styles.description}>
          {description}{' '}
          {linkText && linkUrl && (
            <a href={linkUrl} className={styles.link}>
              {linkText}
            </a>
          )}
        </span>
      </div>
      {onClose && (
        <button 
          className={styles.closeButton}
          onClick={onClose}
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default Banner; 