import React from 'react';

interface NsNLogoProps {
  className?: string;
  size?: number;
}

export function NsNLogo({ className = 'w-9 h-9', size }: NsNLogoProps) {
  const style = size ? { width: size, height: size } : undefined;

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <defs>
        <linearGradient id="nsnLogoBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E3A8A" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        <linearGradient id="nsnLogoAccent" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF7A00" />
          <stop offset="100%" stopColor="#E2725B" />
        </linearGradient>
        <filter id="nsnLogoShadow" x="-10%" y="-10%" width="125%" height="125%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#0F172A" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Rounded squircle badge */}
      <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#nsnLogoBg)" />
      <rect x="2" y="2" width="44" height="44" rx="12" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />

      {/* Paper sheet with folded top-right corner */}
      <path
        d="M 12 11 C 12 9.5 13.2 8.5 14.5 8.5 L 28.5 8.5 L 36 16 L 36 36.5 C 36 38 34.8 39.5 33.5 39.5 L 14.5 39.5 C 13.2 39.5 12 38 12 36.5 Z"
        fill="#FFFFFF"
        filter="url(#nsnLogoShadow)"
      />

      {/* Folded corner (dog-ear flap) */}
      <path
        d="M 28.5 8.5 L 28.5 14.5 C 28.5 15.5 29.5 16 30.5 16 L 36 16 Z"
        fill="#E2E8F0"
      />
      <path d="M 28.5 16 L 36 16" stroke="#CBD5E1" strokeWidth="1" />

      {/* Notebook red/coral vertical margin line */}
      <line x1="18" y1="13" x2="18" y2="35" stroke="#E2725B" strokeWidth="1.5" strokeLinecap="round" />

      {/* Precision millimeter ruling lines */}
      <line x1="22" y1="18" x2="32" y2="18" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="22" y1="23" x2="32" y2="23" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="22" y1="28" x2="30" y2="28" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />

      {/* Mini Coral/Orange Seal with 'N' Monogram */}
      <circle cx="33.5" cy="33.5" r="7" fill="url(#nsnLogoAccent)" />
      <circle cx="33.5" cy="33.5" r="7" stroke="#FFFFFF" strokeWidth="1.2" />
      <path
        d="M 31 36.5 L 31 30.5 L 36 36.5 L 36 30.5"
        stroke="#FFFFFF"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
