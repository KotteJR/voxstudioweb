'use client';
import { useEffect, useState } from 'react';

export default function SpinningLogo() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set visible after component mounts to ensure it renders
    setIsVisible(true);
  }, []);

  return (
    <div 
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
      style={{ 
        width: '200px', 
        height: '200px',
        border: '4px solid red', // Temporary border for visibility
        display: isVisible ? 'block' : 'none',
      }}
    >
      <div 
        className="w-full h-full"
        style={{
          animation: 'spin 15s linear infinite',
        }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 200 200" 
          className="w-full h-full"
        >
          <circle cx="100" cy="100" r="90" fill="none" stroke="white" strokeWidth="4"/>
          <text x="100" y="110" fontFamily="Arial" fontSize="24" fontWeight="bold" textAnchor="middle" fill="white">VOKS</text>
          <text x="100" y="140" fontFamily="Arial" fontSize="24" fontWeight="bold" textAnchor="middle" fill="white">STUDIOS</text>
        </svg>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
} 