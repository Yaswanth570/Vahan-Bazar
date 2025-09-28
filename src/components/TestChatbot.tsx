import React, { useState } from 'react';

const TestChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          backgroundColor: '#020e20ff',
          color: 'white',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          zIndex: 9999,
          cursor: 'pointer'
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </div>
      
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '90px',
          right: '20px',
          width: '300px',
          height: '400px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 9998,
          padding: '16px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            fontWeight: 'bold',
            fontSize: '18px',
            marginBottom: '12px',
            borderBottom: '1px solid #664591ff',
            paddingBottom: '8px'
          }}>
            Chat Support
          </div>
          <div style={{
            flex: 1,
            overflowY: 'auto',
            marginBottom: '12px',
            backgroundColor: '#f9f9f9',
            padding: '8px',
            borderRadius: '4px'
          }}>
            <div style={{
              backgroundColor: '#e1f5fe',
              padding: '8px 12px',
              borderRadius: '18px',
              marginBottom: '8px',
              maxWidth: '80%',
              alignSelf: 'flex-start'
            }}>
              Hello! How can I help you today?
            </div>
          </div>
          <div style={{
            display: 'flex',
            gap: '8px'
          }}>
            <input 
              type="text" 
              placeholder="Type your message..."
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}
            />
            <button style={{
              backgroundColor: '#ff0000',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '0 12px'
            }}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TestChatbot;