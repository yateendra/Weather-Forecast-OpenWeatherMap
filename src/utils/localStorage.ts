import { RecentSearch, TemperatureUnit } from '../types/weather';
import { RECENT_SEARCHES_KEY, MAX_RECENT_SEARCHES, TEMPERATURE_UNIT_KEY } from './constants';

/**
 * Save a search to local storage
 * @param city - The city that was searched
 */
export const saveSearch = (city: string): void => {
  try {
    // Get existing searches
    const searches = getRecentSearches();
    
    // Check if this city already exists in searches
    const existingIndex = searches.findIndex(search => 
      search.city.toLowerCase() === city.toLowerCase()
    );
    
    // Create new search object
    const newSearch: RecentSearch = {
      id: crypto.randomUUID(), // Generate a unique ID
      city: city,
      timestamp: Date.now()
    };
    
    // If city exists, remove it (we'll add it back at the beginning)
    if (existingIndex !== -1) {
      searches.splice(existingIndex, 1);
    }
    
    // Add new search to beginning of array
    searches.unshift(newSearch);
    
    // Limit to max number of searches
    const limitedSearches = searches.slice(0, MAX_RECENT_SEARCHES);
    
    // Save to local storage
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(limitedSearches));
  } catch (error) {
    console.error('Error saving search to local storage:', error);
  }
};

/**
 * Get recent searches from local storage
 * @returns Array of recent searches
 */
export const getRecentSearches = (): RecentSearch[] => {
  try {
    const searches = localStorage.getItem(RECENT_SEARCHES_KEY);
    return searches ? JSON.parse(searches) : [];
  } catch (error) {
    console.error('Error getting recent searches from local storage:', error);
    return [];
  }
};

/**
 * Clear all recent searches from local storage
 */
export const clearRecentSearches = (): void => {
  try {
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  } catch (error) {
    console.error('Error clearing recent searches from local storage:', error);
  }
};

/**
 * Save temperature unit preference
 * @param unit - 'celsius' or 'fahrenheit'
 */
export const saveTemperatureUnit = (unit: TemperatureUnit): void => {
  try {
    localStorage.setItem(TEMPERATURE_UNIT_KEY, unit);
  } catch (error) {
    console.error('Error saving temperature unit to local storage:', error);
  }
};

/**
 * Get temperature unit preference
 * @returns 'celsius' or 'fahrenheit'
 */
export const getTemperatureUnit = (): TemperatureUnit => {
  try {
    const unit = localStorage.getItem(TEMPERATURE_UNIT_KEY) as TemperatureUnit;
    return unit || 'celsius'; // Default to celsius
  } catch (error) {
    console.error('Error getting temperature unit from local storage:', error);
    return 'celsius'; // Default to celsius
  }
};