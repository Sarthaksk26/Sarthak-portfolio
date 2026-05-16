import React, { useEffect, useState } from 'react';

import { ThemeContext } from './ThemeContextCore';
import type { Theme } from './ThemeContextCore';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme: Theme = 'dark';

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add('dark');
  }, []);

  const toggleTheme = () => {
    // No-op to prevent errors if called
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
