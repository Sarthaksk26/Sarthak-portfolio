import { useState, useEffect } from 'react';

interface VisitorContext {
  city: string | null;
  country: string | null;
  greeting: string;
  emoji: string;
  loading: boolean;
}

export const useVisitorContext = (): VisitorContext => {
  const [context, setContext] = useState<VisitorContext>({
    city: null,
    country: null,
    greeting: 'Welcome',
    emoji: '👋',
    loading: true,
  });

  useEffect(() => {
    const fetchContext = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        if (!res.ok) throw new Error('Location fetch failed');
        const data = await res.json();

        const city = data.city;
        const country = data.country_name;
        const timezone = data.timezone;

        // Calculate local time for the visitor to give correct greeting
        const visitorTime = new Date(new Date().toLocaleString('en-US', { timeZone: timezone }));
        const hour = visitorTime.getHours();

        let greeting = 'Good evening';
        let emoji = '🌙';

        if (hour >= 5 && hour < 12) {
          greeting = 'Good morning';
          emoji = '☀️';
        } else if (hour >= 12 && hour < 17) {
          greeting = 'Good afternoon';
          emoji = '☕';
        }

        setContext({
          city,
          country,
          greeting,
          emoji,
          loading: false,
        });
      } catch {
        // Fallback to generic greeting if API fails or adblock blocks it
        const hour = new Date().getHours();
        let greeting = 'Welcome';
        let emoji = '👋';
        
        if (hour >= 5 && hour < 12) {
          greeting = 'Good morning';
          emoji = '☀️';
        } else if (hour >= 12 && hour < 17) {
          greeting = 'Good afternoon';
          emoji = '☕';
        } else if (hour >= 17 || hour < 5) {
          greeting = 'Good evening';
          emoji = '🌙';
        }

        setContext({
          city: null,
          country: null,
          greeting,
          emoji,
          loading: false,
        });
      }
    };

    fetchContext();
  }, []);

  return context;
};
