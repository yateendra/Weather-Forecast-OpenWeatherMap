import React from 'react';
import { Wind, Droplets, Eye, Sunrise, Sunset, ArrowUp, ArrowDown } from 'lucide-react';
import { CurrentWeatherData, TemperatureUnit } from '../types/weather';
import { formatTemperature, formatWindSpeed, formatTime, capitalizeWords } from '../utils/formatters';
import WeatherIcon from './WeatherIcon';
import { WEATHER_ICON_COLORS } from '../utils/constants';

interface CurrentWeatherProps {
  data: CurrentWeatherData;
  unit: TemperatureUnit;
  className?: string;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, unit, className = '' }) => {
  const weather = data.weather[0];
  const iconColor = WEATHER_ICON_COLORS[weather.icon] || WEATHER_ICON_COLORS.default;
  
  return (
    <div className={`bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 shadow-lg animate-fade-in ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="mb-4 md:mb-0">
          <h2 className="text-3xl font-bold text-white">{data.name}, {data.sys.country}</h2>
          <p className="text-white text-opacity-90">{capitalizeWords(weather.description)}</p>
        </div>
        
        <div className="flex items-center">
          <WeatherIcon iconCode={weather.icon} size={48} className={iconColor} />
          <span className="text-5xl font-bold text-white ml-2">
            {formatTemperature(data.main.temp, unit).split('°')[0]}
            <span className="text-3xl">°</span>
          </span>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="flex items-center bg-white bg-opacity-10 p-3 rounded-lg">
          <div className="mr-3 p-2 bg-white bg-opacity-20 rounded-full">
            <Wind size={18} className="text-white" />
          </div>
          <div>
            <p className="text-xs text-white text-opacity-70">Wind</p>
            <p className="text-sm font-medium text-white">{formatWindSpeed(data.wind.speed)}</p>
          </div>
        </div>
        
        <div className="flex items-center bg-white bg-opacity-10 p-3 rounded-lg">
          <div className="mr-3 p-2 bg-white bg-opacity-20 rounded-full">
            <Droplets size={18} className="text-white" />
          </div>
          <div>
            <p className="text-xs text-white text-opacity-70">Humidity</p>
            <p className="text-sm font-medium text-white">{data.main.humidity}%</p>
          </div>
        </div>
        
        <div className="flex items-center bg-white bg-opacity-10 p-3 rounded-lg">
          <div className="mr-3 p-2 bg-white bg-opacity-20 rounded-full">
            <Eye size={18} className="text-white" />
          </div>
          <div>
            <p className="text-xs text-white text-opacity-70">Visibility</p>
            <p className="text-sm font-medium text-white">{(data.visibility / 1000).toFixed(1)} km</p>
          </div>
        </div>
        
        <div className="flex items-center bg-white bg-opacity-10 p-3 rounded-lg">
          <div className="mr-3 p-2 bg-white bg-opacity-20 rounded-full">
            <Droplets size={18} className="text-white" />
          </div>
          <div>
            <p className="text-xs text-white text-opacity-70">Pressure</p>
            <p className="text-sm font-medium text-white">{data.main.pressure} hPa</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-2 gap-6">
        <div className="bg-white bg-opacity-10 p-3 rounded-lg flex items-center justify-between">
          <div className="flex items-center">
            <Sunrise className="text-yellow-300 mr-2" size={20} />
            <span className="text-white text-opacity-80 text-sm">Sunrise</span>
          </div>
          <span className="text-white font-medium">{formatTime(data.sys.sunrise)}</span>
        </div>
        
        <div className="bg-white bg-opacity-10 p-3 rounded-lg flex items-center justify-between">
          <div className="flex items-center">
            <Sunset className="text-orange-400 mr-2" size={20} />
            <span className="text-white text-opacity-80 text-sm">Sunset</span>
          </div>
          <span className="text-white font-medium">{formatTime(data.sys.sunset)}</span>
        </div>
      </div>
      
      <div className="mt-6 flex justify-center space-x-8">
        <div className="flex items-center">
          <ArrowUp className="text-error-400 mr-1" size={18} />
          <span className="text-white">
            {formatTemperature(data.main.temp_max, unit)}
          </span>
        </div>
        <div className="flex items-center">
          <ArrowDown className="text-primary-400 mr-1" size={18} />
          <span className="text-white">
            {formatTemperature(data.main.temp_min, unit)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;