import { useState } from 'react';

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

    if (!apiKey || apiKey === 'your_api_key_here') {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I need an API key to think! Please add VITE_GEMINI_API_KEY to your .env file.',
      };
      setMessages((prev) => [...prev, errorMsg]);
      setIsLoading(false);
      return;
    }

    try {
      // Direct call to Gemini API
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: SYSTEM_INSTRUCTION + '\n\nUser Question: ' + content }],
              },
            ],
          }),
        }
      );

      const data = await response.json();

      if (data.error) {
        console.error('Gemini API Error:', data.error);
        throw new Error(data.error.message || 'API Error');
      }

      const aiResponse =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I'm sorry, I encountered an error processing your request. Please check your API key or try again later.";

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
