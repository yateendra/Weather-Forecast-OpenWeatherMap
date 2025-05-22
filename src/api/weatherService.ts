import axios from 'axios';
import { 
  CurrentWeatherData, 
  ForecastData, 
  GeolocationResult
} from '../types/weather';
import { BASE_URL, GEO_URL, API_KEY } from '../utils/constants';

// Create axios instance with default config
const api = axios.create({
  timeout: 15000,
  params: {
    appid: API_KEY
  }
});

/**
 * Get current weather data for a city
 * @param city - City name
 * @returns Promise with current weather data
 */
export const getCurrentWeather = async (city: string): Promise<CurrentWeatherData> => {
  try {
    const response = await api.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        units: 'standard' // Kelvin
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

/**
 * Get current weather data using coordinates
 * @param lat - Latitude
 * @param lon - Longitude
 * @returns Promise with current weather data
 */
export const getCurrentWeatherByCoords = async (lat: number, lon: number): Promise<CurrentWeatherData> => {
  try {
    const response = await api.get(`${BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        units: 'standard' // Kelvin
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching current weather by coordinates:', error);
    throw error;
  }
};

/**
 * Get 5-day forecast data for a city
 * @param city - City name
 * @returns Promise with forecast data
 */
export const getForecast = async (city: string): Promise<ForecastData> => {
  try {
    const response = await api.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        units: 'standard', // Kelvin
        cnt: 40 // 5 days, 8 forecasts per day (every 3 hours)
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
};

/**
 * Get 5-day forecast data using coordinates
 * @param lat - Latitude
 * @param lon - Longitude
 * @returns Promise with forecast data
 */
export const getForecastByCoords = async (lat: number, lon: number): Promise<ForecastData> => {
  try {
    const response = await api.get(`${BASE_URL}/forecast`, {
      params: {
        lat,
        lon,
        units: 'standard', // Kelvin
        cnt: 40 // 5 days, 8 forecasts per day (every 3 hours)
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast by coordinates:', error);
    throw error;
  }
};

/**
 * Get geolocation data for a city (for autocomplete)
 * @param query - Search query
 * @param limit - Maximum number of results
 * @returns Promise with geolocation results
 */
export const getGeolocationData = async (query: string, limit = 5): Promise<GeolocationResult[]> => {
  if (!query.trim()) return [];
  
  try {
    const response = await api.get(`${GEO_URL}/direct`, {
      params: {
        q: query,
        limit
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching geolocation data:', error);
    throw error;
  }
};

/**
 * Get user's current location weather
 * @returns Promise with current location coordinates
 */
export const getCurrentLocation = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }
    
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    });
  });
};