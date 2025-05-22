import React from 'react';
import { TemperatureUnit } from '../types/weather';

interface UnitToggleProps {
  unit: TemperatureUnit;
  onToggle: (unit: TemperatureUnit) => void;
}

const UnitToggle: React.FC<UnitToggleProps> = ({ unit, onToggle }) => {
  const handleToggle = () => {
    onToggle(unit === 'celsius' ? 'fahrenheit' : 'celsius');
  };

  return (
    <div className="inline-flex items-center bg-white bg-opacity-10 backdrop-blur-sm rounded-full p-1 shadow-md">
      <button
        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
          unit === 'celsius' 
            ? 'bg-white text-primary-700' 
            : 'text-white hover:bg-white hover:bg-opacity-20'
        }`}
        onClick={() => onToggle('celsius')}
        aria-pressed={unit === 'celsius'}
        aria-label="Display temperature in Celsius"
      >
        °C
      </button>
      <button
        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
          unit === 'fahrenheit' 
            ? 'bg-white text-primary-700' 
            : 'text-white hover:bg-white hover:bg-opacity-20'
        }`}
        onClick={() => onToggle('fahrenheit')}
        aria-pressed={unit === 'fahrenheit'}
        aria-label="Display temperature in Fahrenheit"
      >
        °F
      </button>
    </div>
  );
};

export default UnitToggle;