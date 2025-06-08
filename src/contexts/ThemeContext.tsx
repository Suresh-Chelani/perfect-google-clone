
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'default' | 'dark' | 'colorful';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>('default');

  useEffect(() => {
    // Apply theme to document root
    const root = document.documentElement;
    root.classList.remove('theme-default', 'theme-dark', 'theme-colorful');
    root.classList.add(`theme-${theme}`);
    
    // Apply dark class for shadcn components when dark theme is selected
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
