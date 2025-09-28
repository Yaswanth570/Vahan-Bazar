import React, { useEffect, useState } from 'react';

interface ChatbotIconProps {
  isOpen: boolean;
  toggleChat: () => void;
}

/**
 * ChatbotIcon - A floating button to open/close the chatbot
 * @param {boolean} isOpen - Current state of the chatbot (open/closed)
 * @param {function} toggleChat - Function to toggle the chatbot state
 */
const ChatbotIcon: React.FC<ChatbotIconProps> = ({ isOpen, toggleChat }) => {
  const [bounce, setBounce] = useState(false);
  const [showHello, setShowHello] = useState(false);

  // Add a bouncing effect every few seconds to attract attention
  useEffect(() => {
    if (!isOpen) {
      const interval = setInterval(() => {
        setBounce(true);
        setTimeout(() => setBounce(false), 1000);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  // Show a friendly "Hello!" bubble once per session when closed
  useEffect(() => {
    if (!isOpen && !localStorage.getItem('chatbot-hello-shown')) {
      setShowHello(true);
      const t = setTimeout(() => {
        setShowHello(false);
        localStorage.setItem('chatbot-hello-shown', '1');
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}>
      {/* Speech bubble shown briefly */}
      {!isOpen && showHello && (
        <div
          style={{
            position: 'absolute',
            right: '78px',
            bottom: '36px',
            background: 'rgba(255,255,255,0.95)',
            color: '#0f172a',
            borderRadius: '16px',
            padding: '8px 12px',
            boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
            border: '1px solid rgba(0,0,0,0.06)'
          }}
        >
          <span style={{ fontWeight: 700, letterSpacing: 0.2, background: 'linear-gradient(135deg, #22d3ee, #34d399)', WebkitBackgroundClip: 'text', color: 'transparent' }}>Hello!</span>
        </div>
      )}

      <button
        className=""
        style={{
          width: '64px',
          height: '64px',
          border: 'none',
          background: 'transparent',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        }}
        onClick={toggleChat}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          // Close icon
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <div style={{ position: 'relative', width: 64, height: 64 }}>
            <style>
              {`
                @keyframes botJump { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
                @keyframes botTilt { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(-3deg); } 75% { transform: rotate(3deg); } }
                @keyframes armSwing { 0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(8deg); } }
                @keyframes shadowPulse { 0%, 100% { transform: translateX(-50%) scaleX(1); opacity: .22; } 50% { transform: translateX(-50%) scaleX(0.8); opacity: .35; } }
              `}
            </style>
            {/* Soft ground shadow */}
            <div style={{ position: 'absolute', left: '50%', bottom: 2, width: 36, height: 8, borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(0,0,0,0.25), rgba(0,0,0,0))', transform: 'translateX(-50%)', animation: 'shadowPulse 2s ease-in-out infinite' }} />
            {/* Dancing robot */}
            <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', left: 0, top: 0, transformOrigin: '50% 60%', animation: 'botJump 2s ease-in-out infinite, botTilt 2s ease-in-out infinite', filter: 'drop-shadow(0 8px 16px rgba(34,211,238,0.28))' }}>
              {/* Head shell */}
              <rect x="14" y="8" width="36" height="24" rx="12" fill="#eef2ff" stroke="#0f172a" strokeWidth="1" />
              {/* Visor */}
              <rect x="17" y="12" width="30" height="16" rx="8" fill="#0b1220" />
              {/* Eyes (smiling) */}
              <path d="M24 20 q4 -4 8 0" stroke="#60f0ff" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M36 20 q4 -4 8 0" stroke="#60f0ff" strokeWidth="2" fill="none" strokeLinecap="round" />
              {/* Mouth */}
              <path d="M30 24 q2 3 4 0" stroke="#67e8f9" strokeWidth="2" fill="none" strokeLinecap="round" />
              {/* Neck */}
              <rect x="28" y="32" width="8" height="4" rx="2" fill="#e5e7eb" stroke="#0f172a" strokeWidth="0.8" />
              {/* Body */}
              <path d="M18 36 q14 10 28 0 v10 q-14 10 -28 0z" fill="#f3f4f6" stroke="#0f172a" strokeWidth="1" />
              <path d="M22 42 h8 v3 h-8z M34 45 h8 v-3 h-8z" fill="#67e8f9" opacity="0.8" />
              {/* Left arm */}
              <g style={{ transformOrigin: '20px 40px', animation: 'armSwing 2s ease-in-out infinite' }}>
                <path d="M18 38 q-6 4 -4 10" fill="#f3f4f6" stroke="#0f172a" strokeWidth="1" />
              </g>
              {/* Right arm */}
              <g style={{ transformOrigin: '44px 40px', animation: 'armSwing 2s ease-in-out infinite', animationDelay: '0.2s' }}>
                <path d="M46 38 q6 4 4 10" fill="#f3f4f6" stroke="#0f172a" strokeWidth="1" />
              </g>
              {/* Highlights */}
              <path d="M18 14 q4 -4 10 -6" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        )}
      </button>
    </div>
  );
};

export default ChatbotIcon;