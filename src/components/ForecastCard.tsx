import React from 'react';
import { DailyForecast, TemperatureUnit } from '../types/weather';
import WeatherIcon from './WeatherIcon';
import { WEATHER_ICON_COLORS } from '../utils/constants';

interface ForecastCardProps {
  forecast: DailyForecast;
  unit: TemperatureUnit;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecast, unit }) => {
  const iconColor = WEATHER_ICON_COLORS[forecast.weather.icon] || WEATHER_ICON_COLORS.default;
  const unitSymbol = unit === 'celsius' ? '°C' : '°F';
  
  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 transition-transform hover:transform hover:scale-105 animate-fade-in">
      <div className="text-center">
        <h3 className="font-medium text-white">{forecast.dayOfWeek}</h3>
        <div className="my-3 flex justify-center">
          <WeatherIcon iconCode={forecast.weather.icon} size={36} className={iconColor} />
        </div>
        <p className="text-xs text-white text-opacity-80 mb-2">
          {forecast.weather.description}
        </p>
        <div className="flex justify-between items-center mt-3">
          <span className="text-primary-300 font-medium">
            {Math.round(forecast.minTemp)}{unitSymbol}
          </span>
          <span className="text-white font-bold">
            {Math.round(forecast.maxTemp)}{unitSymbol}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForecastCard;