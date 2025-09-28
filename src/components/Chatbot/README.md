# Mini Chatbot for Vahan

A lightweight, customizable chatbot component for the Vahan platform.

## Features

- Basic chat interface with open/close functionality
- Predefined FAQ responses for common questions
- Customer care escalation option
- Local storage for chat history
- Responsive design for web and mobile
- Optional AI integration capability

## Integration

### Basic Usage

```jsx
import Chatbot from './components/Chatbot';

function App() {
  return (
    <div className="App">
      {/* Your app content */}
      <Chatbot />
    </div>
  );
}
```

### With AI Integration

```jsx
import Chatbot from './components/Chatbot';

function App() {
  return (
    <div className="App">
      {/* Your app content */}
      <Chatbot 
        useAI={true}
        aiConfig={{
          apiKey: 'your-api-key',
          modelName: 'gpt-3.5-turbo'
        }}
      />
    </div>
  );
}
```

## Customizing FAQ Responses

To add or modify FAQ responses, edit the `faqResponses` object in `ChatbotData.ts`:

```typescript
// Add new responses
export const faqResponses: Record<string, string> = {
  // Existing responses...
  "new question": "New answer",
  "another question": "Another answer"
};
```

## Styling

The chatbot uses Tailwind CSS classes for styling. You can customize the appearance by modifying the class names in the component files.

## Local Storage

Chat history is automatically saved to localStorage. To clear the history, users can click the trash icon in the chat window, or you can programmatically clear it with:

```javascript
localStorage.removeItem('chatHistory');
```

## AI Integration

The chatbot includes a placeholder AI integration that can be replaced with actual API calls to services like OpenAI's GPT. See `AIIntegration.ts` for implementation details.