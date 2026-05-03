import { useState } from 'react';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export const useAIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hi! I am the AI assistant for Sarthaks portfolio. I can answer questions about his experience, skills, and projects. What would you like to know?',
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // STUB: Real implementation would call Gemini API here.
    const stubMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: 'I am currently running in demo mode without an API key, so I cannot answer that right now! Please contact Sarthak directly via email or LinkedIn.',
    };

    setMessages(prev => [...prev, stubMessage]);
    setIsLoading(false);
  };

  return {
    messages,
    isLoading,
    sendMessage,
  };
};
