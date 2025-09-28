/**
 * AIIntegration.ts
 * This file provides a simple interface for connecting the chatbot to external AI services.
 * You can replace the implementation with actual API calls to services like OpenAI's GPT.
 */

// Type for AI service configuration
export interface AIServiceConfig {
  apiKey?: string;
  endpoint?: string;
  modelName?: string;
  maxTokens?: number;
  temperature?: number;
}

// Default configuration
const defaultConfig: AIServiceConfig = {
  endpoint: 'https://api.example.com/ai',
  modelName: 'gpt-3.5-turbo',
  maxTokens: 150,
  temperature: 0.7
};

/**
 * Process a user message through an AI service
 * @param message The user's message
 * @param config Optional configuration for the AI service
 * @returns Promise with the AI response
 */
export const processWithAI = async (
  message: string, 
  config: AIServiceConfig = {}
): Promise<string> => {
  // Merge with default config
  const finalConfig = { ...defaultConfig, ...config };
  
  // If no API key is provided, return a placeholder response
  if (!finalConfig.apiKey) {
    console.warn('No API key provided for AI service. Using fallback response.');
    return simulateAIResponse(message);
  }
  
  try {
    // This is where you would implement the actual API call
    // Example implementation with fetch:
    /*
    const response = await fetch(finalConfig.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${finalConfig.apiKey}`
      },
      body: JSON.stringify({
        model: finalConfig.modelName,
        messages: [{ role: 'user', content: message }],
        max_tokens: finalConfig.maxTokens,
        temperature: finalConfig.temperature
      })
    });
    
    const data = await response.json();
    return data.choices[0].message.content;
    */
    
    // For now, we'll simulate a response
    return simulateAIResponse(message);
  } catch (error) {
    console.error('Error calling AI service:', error);
    return "I'm sorry, I encountered an error processing your request. Please try again later.";
  }
};

/**
 * Simulate an AI response for testing or when no API key is provided
 * @param message The user's message
 * @returns A simulated response
 */
const simulateAIResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  // Simple pattern matching for common questions
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return "Hello! I'm an AI assistant for Vahan. How can I help you today?";
  }
  
  if (lowerMessage.includes('name')) {
    return "I'm Vahan's AI assistant, designed to help you with information about our vehicles and services.";
  }
  
  if (lowerMessage.includes('vehicle') || lowerMessage.includes('bike') || lowerMessage.includes('scooter')) {
    return "Vahan offers a wide range of two-wheelers including motorcycles and scooters from top brands. Would you like me to recommend some options based on your preferences?";
  }
  
  if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
    return "Our vehicles range in price from ₹50,000 for basic scooters to over ₹3,00,000 for premium motorcycles. Can you tell me your budget range so I can suggest appropriate options?";
  }
  
  if (lowerMessage.includes('electric') || lowerMessage.includes('ev')) {
    return "We have several electric vehicle options including models from Ola, Ather, and TVS. Electric vehicles offer lower running costs and are environmentally friendly. Would you like to know more about a specific model?";
  }
  
  // Default response for unrecognized queries
  return "That's an interesting question. I'm still learning about that topic. Would you like me to connect you with a human expert who can provide more detailed information?";
};

export default {
  processWithAI
};