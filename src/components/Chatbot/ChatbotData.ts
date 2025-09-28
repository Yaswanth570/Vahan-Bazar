// Predefined FAQ responses for the chatbot
export const faqResponses: Record<string, string> = {
  "hello": "Hello! How can I help you today?",
  "hi": "Hi there! How can I assist you?",
  "help": "I'm here to help! You can ask about our vehicles, services, or account information.",
  "account": "To manage your account, please go to the profile section after logging in. You can update your details, change password, or manage your preferences there.",
  "vehicles": "We offer a wide range of two-wheelers including motorcycles and scooters. You can browse our collection in the 'Browse' section.",
  "pricing": "Our vehicle prices vary based on model and specifications. You can find detailed pricing information on each vehicle's page.",
  "payment": "We accept various payment methods including credit/debit cards, net banking, and EMI options. All transactions are secure and encrypted.",
  "delivery": "Delivery times depend on your location and vehicle availability. Typically, it takes 3-7 business days after purchase confirmation.",
  "warranty": "All our vehicles come with a standard warranty. The warranty period varies by model, typically ranging from 1-3 years.",
  "service": "We have service centers across major cities. You can book a service appointment through our 'Mechanics' section.",
  "contact": "You can reach our customer support team at support@vahan.com or call us at 1800-123-4567.",
  "location": "We have showrooms in major cities across India. You can find the nearest one using the 'Locate Us' feature.",
  "cancel order": "To cancel an order, please contact our customer support with your order details.",
  "return policy": "Our return policy allows returns within 7 days of delivery, subject to vehicle condition inspection.",
  "test ride": "You can book a test ride through our website or by visiting any of our showrooms.",
};

// Function to find the best matching FAQ response
export const findFaqResponse = (userInput: string): string | null => {
  const normalizedInput = userInput.toLowerCase().trim();
  
  // Direct match
  if (faqResponses[normalizedInput]) {
    return faqResponses[normalizedInput];
  }
  
  // Partial match
  for (const [key, value] of Object.entries(faqResponses)) {
    if (normalizedInput.includes(key)) {
      return value;
    }
  }
  
  return null;
};

// Default responses when no match is found
export const defaultResponses = [
  "I'm not sure I understand. Could you rephrase that?",
  "I don't have information on that topic yet. Would you like to connect with customer support?",
  "I'm still learning! That question is a bit outside my knowledge area.",
  "I couldn't find an answer to that. Would you like me to connect you with a human agent?",
];

// Get a random default response
export const getRandomDefaultResponse = (): string => {
  const randomIndex = Math.floor(Math.random() * defaultResponses.length);
  return defaultResponses[randomIndex];
};