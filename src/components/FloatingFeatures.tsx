
import React, { useState } from 'react';
import { Settings, Heart, Star, Sparkles } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const FloatingFeatures = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const themes = [
    { name: 'Default', value: 'default' as const, color: 'bg-primary' },
    { name: 'Dark', value: 'dark' as const, color: 'bg-foreground' },
    { name: 'Colorful', value: 'colorful' as const, color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
  ];

  const easterEggs = [
    '🎮 Try typing "do a barrel roll"',
    '🎯 Search for "Google gravity"',
    '🎪 Type "askew" and see what happens',
    '🎨 Search "color picker" for a surprise',
    '🎵 Try "Google beatbox"',
  ];

  const [currentEasterEgg, setCurrentEasterEgg] = useState(0);

  const handleThemeChange = (newTheme: typeof theme) => {
    console.log('Theme button clicked:', newTheme);
    setTheme(newTheme);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Main FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
      >
        <Settings className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'group-hover:rotate-90'}`} />
      </button>

      {/* Floating Menu */}
      <div className={`absolute bottom-16 right-0 transition-all duration-300 ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        <div className="bg-background border border-border rounded-lg shadow-xl p-4 w-64">
          <h3 className="font-semibold text-foreground mb-3">Google Features</h3>
          
          {/* Theme Selector */}
          <div className="mb-4">
            <label className="text-sm text-muted-foreground mb-2 block">
              Theme (Current: {theme})
            </label>
            <div className="flex space-x-2">
              {themes.map((themeOption) => (
                <button
                  key={themeOption.value}
                  onClick={() => handleThemeChange(themeOption.value)}
                  className={`w-8 h-8 rounded-full ${themeOption.color} border-2 transition-all ${
                    theme === themeOption.value ? 'border-primary scale-110' : 'border-border'
                  }`}
                  title={themeOption.name}
                />
              ))}
            </div>
          </div>

          {/* Easter Egg Tip */}
          <div className="mb-4 p-3 bg-accent rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Sparkles className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-medium text-accent-foreground">Pro Tip</span>
            </div>
            <p className="text-xs text-muted-foreground">{easterEggs[currentEasterEgg]}</p>
            <button
              onClick={() => setCurrentEasterEgg((prev) => (prev + 1) % easterEggs.length)}
              className="text-xs text-primary hover:text-primary/80 mt-1"
            >
              Next tip →
            </button>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            <button className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-accent transition-colors">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-sm text-foreground">Favorites</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-accent transition-colors">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-foreground">Bookmarks</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingFeatures;
