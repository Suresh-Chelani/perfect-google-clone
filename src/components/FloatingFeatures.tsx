
import React, { useState } from 'react';
import { Settings, Heart, Star, Sparkles } from 'lucide-react';

const FloatingFeatures = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('default');

  const themes = [
    { name: 'Default', value: 'default', color: 'bg-blue-500' },
    { name: 'Dark', value: 'dark', color: 'bg-gray-800' },
    { name: 'Colorful', value: 'colorful', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
  ];

  const easterEggs = [
    '🎮 Try typing "do a barrel roll"',
    '🎯 Search for "Google gravity"',
    '🎪 Type "askew" and see what happens',
    '🎨 Search "color picker" for a surprise',
    '🎵 Try "Google beatbox"',
  ];

  const [currentEasterEgg, setCurrentEasterEgg] = useState(0);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Main FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-google-blue text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
      >
        <Settings className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'group-hover:rotate-90'}`} />
      </button>

      {/* Floating Menu */}
      <div className={`absolute bottom-16 right-0 transition-all duration-300 ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        <div className="bg-white rounded-lg shadow-xl p-4 w-64 border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-3">Google Features</h3>
          
          {/* Theme Selector */}
          <div className="mb-4">
            <label className="text-sm text-gray-600 mb-2 block">Theme</label>
            <div className="flex space-x-2">
              {themes.map((themeOption) => (
                <button
                  key={themeOption.value}
                  onClick={() => setTheme(themeOption.value)}
                  className={`w-8 h-8 rounded-full ${themeOption.color} border-2 transition-all ${
                    theme === themeOption.value ? 'border-gray-800 scale-110' : 'border-gray-300'
                  }`}
                  title={themeOption.name}
                />
              ))}
            </div>
          </div>

          {/* Easter Egg Tip */}
          <div className="mb-4 p-3 bg-yellow-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Sparkles className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-800">Pro Tip</span>
            </div>
            <p className="text-xs text-yellow-700">{easterEggs[currentEasterEgg]}</p>
            <button
              onClick={() => setCurrentEasterEgg((prev) => (prev + 1) % easterEggs.length)}
              className="text-xs text-yellow-600 hover:text-yellow-800 mt-1"
            >
              Next tip →
            </button>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            <button className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-sm text-gray-700">Favorites</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-gray-700">Bookmarks</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingFeatures;
