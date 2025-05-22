// API configuration
export const API_KEY = "9c5e4a148430e2b82a7f4260b0bd4be0";
export const BASE_URL = "https://api.openweathermap.org/data/2.5";
export const GEO_URL = "https://api.openweathermap.org/geo/1.0";

// Local storage keys
export const RECENT_SEARCHES_KEY = "weather_app_recent_searches";
export const TEMPERATURE_UNIT_KEY = "weather_app_temperature_unit";

// Maximum number of recent searches to store
export const MAX_RECENT_SEARCHES = 5;

// Default city
export const DEFAULT_CITY = "London";

// Weather condition mappings to background classes
export const WEATHER_BACKGROUNDS: Record<string, string> = {
  // Clear
  "01d": "bg-gradient-to-br from-blue-400 to-blue-600", // clear sky day
  "01n": "bg-gradient-to-br from-blue-900 to-indigo-950", // clear sky night
  
  // Few clouds
  "02d": "bg-gradient-to-br from-blue-300 to-blue-500", // few clouds day
  "02n": "bg-gradient-to-br from-blue-800 to-indigo-900", // few clouds night
  
  // Scattered clouds
  "03d": "bg-gradient-to-br from-blue-200 to-blue-400", // scattered clouds day
  "03n": "bg-gradient-to-br from-blue-700 to-indigo-800", // scattered clouds night
  
  // Broken clouds
  "04d": "bg-gradient-to-br from-blue-200 to-gray-400", // broken clouds day
  "04n": "bg-gradient-to-br from-blue-700 to-gray-800", // broken clouds night
  
  // Shower rain
  "09d": "bg-gradient-to-br from-blue-400 to-gray-500", // shower rain day
  "09n": "bg-gradient-to-br from-blue-800 to-gray-900", // shower rain night
  
  // Rain
  "10d": "bg-gradient-to-br from-blue-500 to-gray-600", // rain day
  "10n": "bg-gradient-to-br from-blue-900 to-gray-950", // rain night
  
  // Thunderstorm
  "11d": "bg-gradient-to-br from-gray-600 to-gray-800", // thunderstorm day
  "11n": "bg-gradient-to-br from-gray-800 to-gray-950", // thunderstorm night
  
  // Snow
  "13d": "bg-gradient-to-br from-blue-100 to-gray-200", // snow day
  "13n": "bg-gradient-to-br from-blue-200 to-gray-700", // snow night
  
  // Mist
  "50d": "bg-gradient-to-br from-gray-300 to-gray-500", // mist day
  "50n": "bg-gradient-to-br from-gray-600 to-gray-800", // mist night
  
  // Default
  "default": "bg-gradient-to-br from-blue-400 to-blue-600",
};

// WeatherIcon colors based on condition
export const WEATHER_ICON_COLORS: Record<string, string> = {
  // Clear
  "01d": "text-yellow-400", // clear sky day
  "01n": "text-gray-200", // clear sky night
  
  // Few clouds
  "02d": "text-gray-200", // few clouds day
  "02n": "text-gray-400", // few clouds night
  
  // Scattered clouds
  "03d": "text-gray-300", // scattered clouds day
  "03n": "text-gray-500", // scattered clouds night
  
  // Broken clouds
  "04d": "text-gray-400", // broken clouds day
  "04n": "text-gray-600", // broken clouds night
  
  // Shower rain
  "09d": "text-blue-400", // shower rain day
  "09n": "text-blue-600", // shower rain night
  
  // Rain
  "10d": "text-blue-500", // rain day
  "10n": "text-blue-700", // rain night
  
  // Thunderstorm
  "11d": "text-purple-500", // thunderstorm day
  "11n": "text-purple-700", // thunderstorm night
  
  // Snow
  "13d": "text-white", // snow day
  "13n": "text-gray-200", // snow night
  
  // Mist
  "50d": "text-gray-400", // mist day
  "50n": "text-gray-600", // mist night
  
  // Default
  "default": "text-blue-500",
};