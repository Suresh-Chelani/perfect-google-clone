
import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import GoogleLogo from '../components/GoogleLogo';
import NavigationButtons from '../components/NavigationButtons';
import Footer from '../components/Footer';

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
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header Navigation */}
      <NavigationButtons />
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-2xl flex flex-col items-center space-y-8">
          {/* Google Logo */}
          <GoogleLogo />
          
          {/* Search Section */}
          <div className="w-full max-w-lg">
            <SearchBar 
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
    </div>
  );
};

export default Index;
