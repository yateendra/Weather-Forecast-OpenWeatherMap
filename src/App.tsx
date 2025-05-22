import React, { useState, useEffect, useMemo } from 'react';
import { Cloud, RefreshCw } from 'lucide-react';

// Components
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import ForecastList from './components/ForecastList';
import WeatherSkeleton from './components/WeatherSkeleton';
import UnitToggle from './components/UnitToggle';
import ErrorMessage from './components/ErrorMessage';

// Services & Utils
import { 
  getCurrentWeather, 
  getForecast, 
  getCurrentLocation,
  getCurrentWeatherByCoords,
  getForecastByCoords
} from './api/weatherService';
import {
  saveSearch,
  saveTemperatureUnit,
  getTemperatureUnit
} from './utils/localStorage';
import {
  groupForecastByDay,
  formatCurrentDateTime,
  getTimeBasedGreeting
} from './utils/formatters';
import { DEFAULT_CITY, WEATHER_BACKGROUNDS } from './utils/constants';

// Types
import { 
  CurrentWeatherData, 
  ForecastData, 
  DailyForecast,
  TemperatureUnit
} from './types/weather';

function App() {
  // State
  const [city, setCity] = useState<string>(DEFAULT_CITY);
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>('celsius');
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  
  // Background style based on weather condition
  const backgroundClass = useMemo(() => {
    if (!currentWeather) return WEATHER_BACKGROUNDS.default;
    const weatherCode = currentWeather.weather[0].icon;
    return WEATHER_BACKGROUNDS[weatherCode] || WEATHER_BACKGROUNDS.default;
  }, [currentWeather]);
  
  // Process forecast data
  const dailyForecasts = useMemo<DailyForecast[]>(() => {
    if (!forecast) return [];
    return groupForecastByDay(forecast.list, temperatureUnit);
  }, [forecast, temperatureUnit]);
  
  // Load saved temperature unit from localStorage
  useEffect(() => {
    const savedUnit = getTemperatureUnit();
    setTemperatureUnit(savedUnit);
  }, []);
  
  // Fetch weather data for the default city on first load
  useEffect(() => {
    fetchWeatherData(city);
  }, []);
  
  // Fetch weather data for a city
  const fetchWeatherData = async (cityName: string) => {
    setIsLoading(true);
    setError(null);
    setIsRefreshing(false);
    
    try {
      const [weatherData, forecastData] = await Promise.all([
        getCurrentWeather(cityName),
        getForecast(cityName)
      ]);
      
      setCurrentWeather(weatherData);
      setForecast(forecastData);
      setCity(cityName);
      saveSearch(cityName);
      setLastUpdated(formatCurrentDateTime());
    } catch (error) {
      console.error('Error fetching weather data:', error);
      if (error instanceof Error) {
        setError(`Failed to fetch weather data for "${cityName}". Please try another city.`);
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch weather data for current location
  const fetchWeatherByLocation = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const position = await getCurrentLocation();
      const { latitude, longitude } = position.coords;
      
      const [weatherData, forecastData] = await Promise.all([
        getCurrentWeatherByCoords(latitude, longitude),
        getForecastByCoords(latitude, longitude)
      ]);
      
      setCurrentWeather(weatherData);
      setForecast(forecastData);
      setCity(weatherData.name);
      saveSearch(weatherData.name);
      setLastUpdated(formatCurrentDateTime());
    } catch (error) {
      console.error('Error fetching location weather:', error);
      if (error instanceof Error && error.message.includes('permission')) {
        setError('Location access denied. Please enable location services and try again.');
      } else {
        setError('Could not retrieve current location. Please try searching for a city instead.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle search for a city
  const handleCitySearch = (cityName: string) => {
    fetchWeatherData(cityName);
  };
  
  // Handle temperature unit toggle
  const handleUnitToggle = (unit: TemperatureUnit) => {
    setTemperatureUnit(unit);
    saveTemperatureUnit(unit);
  };
  
  // Refresh weather data
  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchWeatherData(city);
  };
  
  return (
    <div className={`min-h-screen transition-all duration-500 ${backgroundClass}`}>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="flex flex-col items-center mb-8">
          <div className="flex items-center mb-4">
            <Cloud className="text-white mr-2" size={32} />
            <h1 className="text-3xl font-bold text-white">Weather Forecast</h1>
          </div>
          
          <SearchBar 
            onSearch={handleCitySearch} 
            onLocationSearch={fetchWeatherByLocation}
            isLoading={isLoading}
          />
        </header>
        
        {/* Main content */}
        <main>
          {error ? (
            <ErrorMessage message={error} onRetry={() => fetchWeatherData(DEFAULT_CITY)} />
          ) : (
            <>
              {/* Controls */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <div>
                  <h2 className="text-white text-2xl font-semibold mb-1">
                    {getTimeBasedGreeting()}
                  </h2>
                  <p className="text-white text-opacity-80 text-sm">
                    Last updated: {lastUpdated || 'Loading...'}
                  </p>
                </div>
                
                <div className="flex items-center mt-4 sm:mt-0 space-x-4">
                  <UnitToggle unit={temperatureUnit} onToggle={handleUnitToggle} />
                  
                  <button
                    onClick={handleRefresh}
                    disabled={isLoading || isRefreshing}
                    className="bg-white bg-opacity-10 hover:bg-opacity-20 text-white p-2 rounded-full transition-colors disabled:opacity-50"
                    aria-label="Refresh weather data"
                  >
                    <RefreshCw 
                      size={20} 
                      className={`${isRefreshing ? 'animate-spin' : ''}`} 
                    />
                  </button>
                </div>
              </div>
              
              {isLoading ? (
                <WeatherSkeleton />
              ) : (
                currentWeather && (
                  <>
                    <CurrentWeather data={currentWeather} unit={temperatureUnit} />
                    
                    {dailyForecasts.length > 0 && (
                      <ForecastList forecasts={dailyForecasts} unit={temperatureUnit} />
                    )}
                  </>
                )
              )}
            </>
          )}
        </main>
        
        {/* Footer */}
        <footer className="mt-12 text-center text-white text-opacity-70 text-sm">
          <p>
            Weather data provided by{' '}
            <a 
              href="https://openweathermap.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-white transition-colors"
            >
              OpenWeatherMap
            </a>
          </p>
          <p className="mt-1">
            Please replace the API key in constants.ts with your own key from{' '}
            <a 
              href="https://openweathermap.org/api" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-white transition-colors"
            >
              OpenWeather API
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;