import React, { useState } from 'react';
import ChatbotIcon from './ChatbotIcon';
import ChatbotWindow from './ChatbotWindow';

interface ChatbotProps {
  useAI?: boolean;
  aiConfig?: {
    apiKey?: string;
    modelName?: string;
  };
}

/**
 * Chatbot - Main component that combines the chatbot icon and window
 * This is the component you should import and use in your application
 * 
 * @param {boolean} useAI - Whether to use AI integration (optional)
 * @param {object} aiConfig - Configuration for AI service (optional)
 */
const Chatbot: React.FC<ChatbotProps> = ({ 
  useAI = false, 
  aiConfig = {} 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-0 right-0 z-[9999]">
      <ChatbotIcon isOpen={isOpen} toggleChat={toggleChat} />
      <ChatbotWindow 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        useAI={useAI}
        aiConfig={aiConfig}
      />
    </div>
  );
};

export default Chatbot;