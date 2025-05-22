import React from 'react';
import { DailyForecast, TemperatureUnit } from '../types/weather';
import ForecastCard from './ForecastCard';

interface ForecastListProps {
  forecasts: DailyForecast[];
  unit: TemperatureUnit;
}

const ForecastList: React.FC<ForecastListProps> = ({ forecasts, unit }) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-white mb-4">5-Day Forecast</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {forecasts.map((forecast, index) => (
          <ForecastCard 
            key={`${forecast.date.toISOString()}-${index}`} 
            forecast={forecast} 
            unit={unit} 
          />
        ))}
      </div>
    </div>
  );
};

export default ForecastList;