import React, { useState, useRef, useEffect } from 'react';
import ChatMessage, { Message } from './ChatMessage';
import { findFaqResponse, getRandomDefaultResponse } from './ChatbotData';
import { processWithAI } from './AIIntegration';

interface ChatbotWindowProps {
  isOpen: boolean;
  onClose: () => void;
  useAI?: boolean;
  aiConfig?: {
    apiKey?: string;
    modelName?: string;
  };
}

/**
 * ChatbotWindow - The main chatbot interface component
 * @param {boolean} isOpen - Whether the chatbot is open
 * @param {function} onClose - Function to close the chatbot
 */
const ChatbotWindow: React.FC<ChatbotWindowProps> = ({ isOpen, onClose, useAI = false, aiConfig = {} }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [showEscalation, setShowEscalation] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load chat history from localStorage on initial render
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatHistory');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // Add welcome message if no history exists
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: "Hello! I'm your Vahan assistant. How can I help you today?",
        sender: 'bot',
        timestamp: Date.now()
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(messages));
    }
  }, [messages]);

  // Scroll to bottom of chat when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input field when chat opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: Date.now()
    };

    const userInput = input;
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Process user input and generate response
    setTimeout(async () => {
      // Check for FAQ match first
      const faqResponse = findFaqResponse(userInput);
      
      if (faqResponse) {
        // If FAQ match found, use that
        const botResponse: Message = {
          id: Date.now().toString(),
          text: faqResponse,
          sender: 'bot',
          timestamp: Date.now()
        };
        setMessages(prev => [...prev, botResponse]);
        setShowEscalation(false);
      } else if (useAI) {
        // Use AI integration if enabled and no FAQ match
        try {
          const aiResponse = await processWithAI(userInput, aiConfig);
          const botResponse: Message = {
            id: Date.now().toString(),
            text: aiResponse,
            sender: 'bot',
            timestamp: Date.now()
          };
          setMessages(prev => [...prev, botResponse]);
          // Only show escalation if AI response suggests it can't help
          setShowEscalation(aiResponse.includes("connect you with") || 
                           aiResponse.includes("human expert") ||
                           aiResponse.includes("I'm sorry"));
        } catch (error) {
          console.error("AI processing error:", error);
          // Fallback to default response on error
          const botResponse: Message = {
            id: Date.now().toString(),
            text: "I'm having trouble connecting to my AI service. Let me connect you with customer support.",
            sender: 'bot',
            timestamp: Date.now()
          };
          setMessages(prev => [...prev, botResponse]);
          setShowEscalation(true);
        }
      } else {
        // No match found and AI not enabled, show default response and escalation option
        const botResponse: Message = {
          id: Date.now().toString(),
          text: getRandomDefaultResponse(),
          sender: 'bot',
          timestamp: Date.now()
        };
        setMessages(prev => [...prev, botResponse]);
        setShowEscalation(true);
      }
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const clearChat = () => {
    localStorage.removeItem('chatHistory');
    setMessages([{
      id: Date.now().toString(),
      text: "Hello! I'm your Vahan assistant. How can I help you today?",
      sender: 'bot',
      timestamp: Date.now()
    }]);
    setShowEscalation(false);
  };

  const contactCustomerCare = () => {
    const escalationMessage: Message = {
      id: Date.now().toString(),
      text: "I'm connecting you with our customer care team. Please provide your contact details and a brief description of your query.",
      sender: 'bot',
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, escalationMessage]);
    setShowEscalation(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col z-40 border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 to-emerald-400 flex items-center justify-center text-white mr-2 shadow">
            <svg width="22" height="22" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <rect x="16" y="20" width="32" height="16" rx="8" fill="#0b1220" />
              <circle cx="26" cy="28" r="5" fill="#111827" />
              <circle cx="38" cy="28" r="5" fill="#111827" />
              <circle cx="24.5" cy="26.5" r="1.6" fill="#ffffff" opacity="0.95" />
              <circle cx="36.5" cy="26.5" r="1.6" fill="#ffffff" opacity="0.95" />
            </svg>
          </div>
          <h3 className="font-medium">Vahan Assistant</h3>
        </div>
        <div className="flex">
          <button 
            onClick={clearChat} 
            className="text-gray-500 hover:text-gray-700 mr-2"
            aria-label="Clear chat"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18"></path>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
            </svg>
          </button>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close chat"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
        
        {/* Customer Care Escalation */}
        {showEscalation && (
          <div className="mt-4 p-3 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-700 mb-2">
              Would you like to speak with our customer care team?
            </p>
            <button 
              onClick={contactCustomerCare}
              className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Contact Customer Care
            </button>
          </div>
        )}
      </div>
      
      {/* Input */}
      <div className="p-4 border-t bg-gray-50/60">
        <div className="flex">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotWindow;