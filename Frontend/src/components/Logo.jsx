import React from 'react'

const Logo = ({ size = 40, showText = true }) => (
  <div className="brand-logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1"/>
          <stop offset="50%" stopColor="#c084fc"/>
          <stop offset="100%" stopColor="#2dd4bf"/>
        </linearGradient>
        <linearGradient id="logoShine" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.25)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </linearGradient>
        <filter id="logoGlow">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <rect x="2" y="2" width="36" height="36" rx="10" fill="url(#logoBg)" />
      <rect x="2" y="2" width="36" height="36" rx="10" fill="url(#logoShine)" />
      <text x="20" y="29" fontFamily="Inter, -apple-system, sans-serif" fontSize="26" fontWeight="800" fill="#fff" textAnchor="middle">R</text>
      <circle cx="30" cy="8" r="3" fill="#2dd4bf" filter="url(#logoGlow)" />
    </svg>
    {showText && (
      <span className="brand-logo__text">
        Resu<span className="brand-logo__accent">Nova</span>
      </span>
    )}
  </div>
)

export default Logo
