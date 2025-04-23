import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image 
            src="/images/logo.png" 
            alt="VoxStudios Logo" 
            width={180} 
            height={160} 
            style={{ width: 'auto', height: '40px' }}
          />
        </div>
        <nav className={styles.nav}>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/store">Store</Link>
          <Link href="/careers">Careers</Link>
        </nav>
        <div className={styles.social}>
          <a href="https://twitter.com/voxstudios" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a href="https://youtube.com/voxstudios" target="_blank" rel="noopener noreferrer">
            <FaYoutube />
          </a>
          <a href="https://instagram.com/voxstudios" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 