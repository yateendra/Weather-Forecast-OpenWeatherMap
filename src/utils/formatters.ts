import { TemperatureUnit, DailyForecast, ForecastItem } from '../types/weather';

/**
 * Convert kelvin to celsius
 * @param kelvin - Temperature in kelvin
 * @returns Temperature in celsius
 */
export const kelvinToCelsius = (kelvin: number): number => {
  return kelvin - 273.15;
};

/**
 * Convert kelvin to fahrenheit
 * @param kelvin - Temperature in kelvin
 * @returns Temperature in fahrenheit
 */
export const kelvinToFahrenheit = (kelvin: number): number => {
  return (kelvin - 273.15) * 9/5 + 32;
};

/**
 * Format temperature based on unit
 * @param kelvin - Temperature in kelvin
 * @param unit - Temperature unit ('celsius' or 'fahrenheit')
 * @returns Formatted temperature string with unit
 */
export const formatTemperature = (kelvin: number, unit: TemperatureUnit): string => {
  if (unit === 'celsius') {
    return `${Math.round(kelvinToCelsius(kelvin))}°C`;
  } else {
    return `${Math.round(kelvinToFahrenheit(kelvin))}°F`;
  }
};

/**
 * Format temperature without unit
 * @param kelvin - Temperature in kelvin
 * @param unit - Temperature unit ('celsius' or 'fahrenheit')
 * @returns Formatted temperature number
 */
export const formatTemperatureValue = (kelvin: number, unit: TemperatureUnit): number => {
  if (unit === 'celsius') {
    return Math.round(kelvinToCelsius(kelvin));
  } else {
    return Math.round(kelvinToFahrenheit(kelvin));
  }
};

/**
 * Format wind speed
 * @param speed - Wind speed in m/s
 * @returns Formatted wind speed string
 */
export const formatWindSpeed = (speed: number): string => {
  return `${speed.toFixed(1)} m/s`;
};

/**
 * Format date from Unix timestamp
 * @param timestamp - Unix timestamp
 * @returns Formatted date string
 */
export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Format time from Unix timestamp
 * @param timestamp - Unix timestamp
 * @returns Formatted time string
 */
export const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

/**
 * Capitalize first letter of each word in a string
 * @param str - String to capitalize
 * @returns Capitalized string
 */
export const capitalizeWords = (str: string): string => {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Group forecast items by day
 * @param forecastItems - List of forecast items
 * @param unit - Temperature unit
 * @returns Array of daily forecasts
 */
export const groupForecastByDay = (forecastItems: ForecastItem[], unit: TemperatureUnit): DailyForecast[] => {
  // Group forecasts by day
  const dailyForecasts: { [key: string]: ForecastItem[] } = {};
  
  forecastItems.forEach(item => {
    const date = new Date(item.dt * 1000);
    const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD
    
    if (!dailyForecasts[dateStr]) {
      dailyForecasts[dateStr] = [];
    }
    
    dailyForecasts[dateStr].push(item);
  });
  
  // Convert grouped forecasts to DailyForecast objects
  return Object.entries(dailyForecasts)
    .map(([dateStr, items]) => {
      // Get min and max temperatures for the day
      const temps = items.map(item => item.main.temp);
      const minTemp = Math.min(...temps);
      const maxTemp = Math.max(...temps);
      
      // Get the weather condition for mid-day (around noon) or the first one
      const midDayItem = items.find(item => {
        const hour = new Date(item.dt * 1000).getHours();
        return hour >= 11 && hour <= 13;
      }) || items[0];
      
      const date = new Date(dateStr);
      
      return {
        date,
        dayOfWeek: date.toLocaleDateString('en-US', { weekday: 'short' }),
        minTemp: unit === 'celsius' ? kelvinToCelsius(minTemp) : kelvinToFahrenheit(minTemp),
        maxTemp: unit === 'celsius' ? kelvinToCelsius(maxTemp) : kelvinToFahrenheit(maxTemp),
        weather: midDayItem.weather[0]
      };
    })
    .slice(0, 5); // Limit to 5 days
};

/**
 * Format the current date and time
 * @returns Current date and time string
 */
export const formatCurrentDateTime = (): string => {
  const now = new Date();
  return now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

/**
 * Get appropriate greeting based on time of day
 * @returns Greeting message
 */
export const getTimeBasedGreeting = (): string => {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 12) {
    return 'Good morning';
  } else if (hour >= 12 && hour < 18) {
    return 'Good afternoon';
  } else {
    return 'Good evening';
  }
};