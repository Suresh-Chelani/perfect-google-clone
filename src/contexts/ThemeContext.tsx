
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
    console.log('Theme changing to:', theme);
    
    // Apply theme to document root
    const root = document.documentElement;
    
    // Remove all theme classes first
    root.classList.remove('theme-default', 'theme-dark', 'theme-colorful', 'dark');
    
    // Add the new theme class
    if (theme === 'default') {
      // For default theme, don't add any theme class
      console.log('Applied default theme');
    } else if (theme === 'dark') {
      root.classList.add('dark');
      console.log('Applied dark theme');
    } else if (theme === 'colorful') {
      root.classList.add('theme-colorful');
      console.log('Applied colorful theme');
    }
    
    // Force a repaint to ensure styles are applied
    root.style.display = 'none';
    root.offsetHeight; // Trigger reflow
    root.style.display = '';
    
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
