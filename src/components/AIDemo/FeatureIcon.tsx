'use client';

import React from 'react';

interface FeatureIconProps {
  type: 'language' | 'workflow' | 'agency';
  style?: React.CSSProperties;
}

const FeatureIcon: React.FC<FeatureIconProps> = ({ type, style }) => {
  const renderIcon = () => {
    switch (type) {
      case 'language':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M4 5h7" />
            <path d="M9 3v2c0 4.418 -2.239 8 -5 8" />
            <path d="M5 9c0 2.144 2.952 3.908 6.7 4" />
            <path d="M12 20l4 -9l4 9" />
            <path d="M19.1 18h-6.2" />
          </svg>
        );
      case 'workflow':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8" />
            <path d="M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8" />
            <path d="M17.5 16a3.5 3.5 0 0 0 0 -7h-.5" />
            <path d="M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0" />
            <path d="M6.5 16a3.5 3.5 0 0 1 0 -7h.5" />
            <path d="M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10" />
          </svg>
        );
      case 'agency':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
            <path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" />
            <path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
            <path d="M17 10h2a2 2 0 0 1 2 2v1" />
            <path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
            <path d="M3 13v-1a2 2 0 0 1 2 -2h2" />
          </svg>
        );
      default:
        return null;
    }
  };

  const iconStyle: React.CSSProperties = {
    width: '70px',
    height: '70px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    ...style,
  };

  return (
    <div style={iconStyle}>
      {renderIcon()}
    </div>
  );
};

export default FeatureIcon;