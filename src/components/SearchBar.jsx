import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('All');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Searching for ${searchTerm} in ${searchType}`);
    // Implement your search logic here
  };

  return (
      <form onSubmit={handleSearch} className="relative w-96">
        <div className="relative flex items-center backdrop-blur-md bg-white bg-opacity-20 rounded-lg shadow-lg border border-white border-opacity-30">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="w-full py-2 pl-4 pr-10 rounded-l-lg bg-transparent text-white placeholder-white placeholder-opacity-70 focus:outline-none"
          />
          <button
            type="submit"
            className="absolute right-16 text-white hover:text-gray-200"
          >
            <Search size={20} />
          </button>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center justify-center w-12 h-full text-white hover:text-gray-200 focus:outline-none"
            >
              <ChevronDown size={20} />
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg backdrop-blur-md bg-white bg-opacity-20 ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  {['All', 'Asteroids', 'Comets'].map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSearchType(option);
                        setIsMenuOpen(false);
                      }}
                      className="block w-full px-4 py-2 text-sm text-white hover:bg-white hover:bg-opacity-10"
                      role="menuitem"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
  );
};

export default SearchBar;