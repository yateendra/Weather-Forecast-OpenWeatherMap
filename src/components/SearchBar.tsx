import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, X, Clock } from 'lucide-react';
import { GeolocationResult, RecentSearch } from '../types/weather';
import { getGeolocationData } from '../api/weatherService';
import { getRecentSearches, clearRecentSearches } from '../utils/localStorage';

interface SearchBarProps {
  onSearch: (city: string) => void;
  onLocationSearch: () => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  onLocationSearch, 
  isLoading 
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<GeolocationResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showRecent, setShowRecent] = useState(false);
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);
  
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Load recent searches from localStorage
  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, []);
  
  // Fetch suggestions when query changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim().length < 2) {
        setSuggestions([]);
        return;
      }
      
      setIsFetchingSuggestions(true);
      try {
        const results = await getGeolocationData(query);
        setSuggestions(results);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      } finally {
        setIsFetchingSuggestions(false);
      }
    };
    
    // Debounce the search to avoid too many API calls
    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);
  
  // Close suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setShowRecent(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handleSearch = (city: string) => {
    if (!city.trim()) return;
    
    onSearch(city);
    setQuery('');
    setShowSuggestions(false);
    setShowRecent(false);
    
    // Reload recent searches after search
    setTimeout(() => {
      setRecentSearches(getRecentSearches());
    }, 100);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };
  
  const handleSelectSuggestion = (city: string) => {
    handleSearch(city);
  };
  
  const handleSelectRecent = (city: string) => {
    handleSearch(city);
  };
  
  const handleClearRecent = (e: React.MouseEvent) => {
    e.stopPropagation();
    clearRecentSearches();
    setRecentSearches([]);
  };
  
  const handleFocus = () => {
    if (query.trim() === '') {
      setShowRecent(recentSearches.length > 0);
    } else {
      setShowSuggestions(true);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.trim() === '') {
      setSuggestions([]);
      setShowSuggestions(false);
      setShowRecent(recentSearches.length > 0);
    } else {
      setShowRecent(false);
      setShowSuggestions(true);
    }
  };
  
  return (
    <div className="relative w-full max-w-xl mx-auto" ref={searchBoxRef}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={handleFocus}
            placeholder="Search for a city..."
            className="w-full py-3 pl-12 pr-12 bg-white bg-opacity-15 backdrop-blur-sm rounded-full focus:outline-none focus:ring-2 focus:ring-primary-400 text-white placeholder-white placeholder-opacity-70 shadow-md"
            disabled={isLoading}
            aria-label="Search for a city"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-opacity-70" size={20} />
          
          <button
            type="button"
            onClick={onLocationSearch}
            className="absolute right-16 top-1/2 transform -translate-y-1/2 text-white hover:text-primary-200 transition-colors"
            aria-label="Use current location"
            disabled={isLoading}
          >
            <MapPin size={20} />
          </button>
          
          <button
            type="submit"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-primary-500 text-white p-1 rounded-full hover:bg-primary-600 transition-colors disabled:bg-primary-300"
            aria-label="Search"
            disabled={isLoading || !query.trim()}
          >
            <Search size={16} />
          </button>
        </div>
      </form>
      
      {/* Suggestions dropdown */}
      {showSuggestions && (
        <div className="absolute w-full mt-2 bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden z-10 animate-fade-in">
          {isFetchingSuggestions ? (
            <div className="p-3 text-center text-neutral-500">
              Loading suggestions...
            </div>
          ) : suggestions.length > 0 ? (
            <ul>
              {suggestions.map((suggestion, index) => (
                <li key={`${suggestion.lat}-${suggestion.lon}-${index}`}>
                  <button
                    className="w-full px-4 py-3 text-left hover:bg-neutral-100 transition-colors flex items-center"
                    onClick={() => handleSelectSuggestion(suggestion.name)}
                  >
                    <Search size={16} className="text-neutral-500 mr-2" />
                    <span className="text-neutral-800">
                      {suggestion.name}
                      {suggestion.state && `, ${suggestion.state}`}
                      {suggestion.country && ` (${suggestion.country})`}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : query.trim().length > 1 ? (
            <div className="p-3 text-center text-neutral-500">
              No results found for "{query}"
            </div>
          ) : null}
        </div>
      )}
      
      {/* Recent searches dropdown */}
      {showRecent && recentSearches.length > 0 && (
        <div className="absolute w-full mt-2 bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden z-10 animate-fade-in">
          <div className="flex justify-between items-center px-4 py-2 bg-neutral-100">
            <span className="text-sm font-medium text-neutral-600">Recent Searches</span>
            <button
              onClick={handleClearRecent}
              className="text-neutral-500 hover:text-error-500 transition-colors text-sm"
              aria-label="Clear recent searches"
            >
              Clear
            </button>
          </div>
          <ul>
            {recentSearches.map((search) => (
              <li key={search.id}>
                <button
                  className="w-full px-4 py-3 text-left hover:bg-neutral-100 transition-colors flex items-center"
                  onClick={() => handleSelectRecent(search.city)}
                >
                  <Clock size={16} className="text-neutral-500 mr-2" />
                  <span className="text-neutral-800">{search.city}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;