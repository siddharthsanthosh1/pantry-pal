/**
 * Dark mode toggle — follows system by default, user can override.
 */

import React, { createContext, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const system = useColorScheme();
  const [override, setOverride] = useState(null);

  const isDark = override !== null ? override === 'dark' : system === 'dark';

  const toggleTheme = () => {
    setOverride(isDark ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
