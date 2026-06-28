import React, { useEffect } from 'react';

import { ThemeContext } from './ThemeContextCore';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Dark-only portfolio — toggleTheme is intentionally a no-op.
  return (
    <ThemeContext.Provider value={{ theme: 'dark', toggleTheme: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
};
