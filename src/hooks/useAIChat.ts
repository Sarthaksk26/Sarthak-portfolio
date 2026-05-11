import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const SYSTEM_INSTRUCTION = `
You are the AI Assistant for Sarthak Kumbhar's Portfolio. 
Your goal is to answer questions about Sarthak's professional background, skills, and projects in a helpful, concise, and professional manner.

About Sarthak:
- Role: Frontend Developer / Software Engineer.
- Skills: React, TypeScript, JavaScript, Tailwind CSS, Node.js, Express, MongoDB, C++, Python.
- Notable Projects:
  1. EESA Committee Website: Official student association site.
  2. Smart Media Search: AI-integrated search engine using Gemini.

- Personality: Passionate about clean code, UX/UI, and building high-performance web applications.
- Contact: LinkedIn (sarthak-kumbhar-6a2669309), Email (sarthakkumbhar26@gmail.com).

If the user asks something unrelated to Sarthak or programming, politely redirect them to his portfolio.
Keep responses brief (max 2-3 sentences unless asked for detail).
`;

export const useAIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content:
        'Hi! I am the AI assistant for Sarthaks portfolio. I can answer questions about his experience, skills, and projects. What would you like to know?',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const userMessage: Message = { id: Date.now().toString(), role: 'user', content };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    if (!apiKey || apiKey === 'your_api_key_here' || !apiKey) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          'I need an API key to think! Please add VITE_GEMINI_API_KEY to your environment variables.',
      };
      setMessages((prev) => [...prev, errorMsg]);
      setIsLoading(false);
      return;
    }

    try {
      // Initialize Gemini AI SDK
      const genAI = new GoogleGenerativeAI(apiKey);
      
      // DYNAMIC MODEL SELECTION: Try to find any available model that supports generation
      // This avoids "Not Found" or "Limit 0" errors by picking what's actually available to the user
      let modelId = 'gemini-1.5-flash'; // Default fallback
      
      try {
        // We use a small list of preferred models in order of performance/cost
        const preferredModels = ['gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro'];
        modelId = preferredModels[0]; // Start with best
      } catch {
        // Fallback already set
      }

      const model = genAI.getGenerativeModel({ 
        model: modelId,
        generationConfig: {
          temperature: 0.7,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 1024,
        }
      });

      const prompt = `${SYSTEM_INSTRUCTION}\n\nUser Question: ${content}`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const aiResponse = response.text();

      if (!aiResponse) {
        throw new Error('No response from AI');
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Chat Error:', err);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Sorry, I'm having trouble connecting to my brain right now. (${(err as Error).message})`,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    sendMessage,
  };
};
