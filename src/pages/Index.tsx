
import React, { useState } from 'react';
import EnhancedSearchBar from '../components/EnhancedSearchBar';
import AnimatedGoogleLogo from '../components/AnimatedGoogleLogo';
import NavigationButtons from '../components/NavigationButtons';
import Footer from '../components/Footer';
import DynamicBackground from '../components/DynamicBackground';
import FloatingFeatures from '../components/FloatingFeatures';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // In a real implementation, this would redirect to Google search results
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
  };

  const handleLuckySearch = () => {
    console.log('Feeling lucky search');
    // In a real implementation, this would redirect to the first search result
    if (searchQuery.trim()) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}&btnI=1`, '_blank');
    } else {
      // Random fun searches for when there's no query
      const funSearches = [
        'funny cat videos',
        'amazing nature facts',
        'interesting science experiments',
        'cool art galleries',
        'delicious recipes'
      ];
      const randomSearch = funSearches[Math.floor(Math.random() * funSearches.length)];
      window.open(`https://www.google.com/search?q=${encodeURIComponent(randomSearch)}&btnI=1`, '_blank');
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Dynamic Background */}
      <DynamicBackground />
      
      {/* Header Navigation */}
      <NavigationButtons />
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 relative z-10">
        <div className="w-full max-w-2xl flex flex-col items-center space-y-8">
          {/* Animated Google Logo */}
          <AnimatedGoogleLogo />
          
          {/* Enhanced Search Section */}
          <div className="w-full max-w-lg">
            <EnhancedSearchBar 
              value={searchQuery}
              onChange={setSearchQuery}
              onSearch={handleSearch}
              onLuckySearch={handleLuckySearch}
            />
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Floating Features */}
      <FloatingFeatures />
    </div>
  );
};

export default Index;
