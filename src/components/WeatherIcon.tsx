import React from 'react';
import { 
  Sun, 
  Cloud, 
  CloudDrizzle, 
  CloudRain, 
  CloudSnow, 
  CloudFog, 
  CloudLightning,
  Moon
} from 'lucide-react';

interface WeatherIconProps {
  iconCode: string;
  size?: number;
  className?: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ 
  iconCode, 
  size = 24, 
  className = ''
}) => {
  // Determine which icon to display based on OpenWeatherMap icon code
  const getIcon = () => {
    // Extract the main code (without day/night)
    const mainCode = iconCode.substring(0, 2);
    const isDay = iconCode.endsWith('d');
    
    switch (mainCode) {
      case '01': // Clear sky
        return isDay ? <Sun size={size} /> : <Moon size={size} />;
      case '02': // Few clouds
        return isDay ? 
          <div className="relative">
            <Sun size={size} className="absolute right-0" />
            <Cloud size={size} />
          </div> : 
          <div className="relative">
            <Moon size={size} className="absolute right-0" />
            <Cloud size={size} />
          </div>;
      case '03': // Scattered clouds
      case '04': // Broken clouds
        return <Cloud size={size} />;
      case '09': // Shower rain
        return <CloudDrizzle size={size} />;
      case '10': // Rain
        return <CloudRain size={size} />;
      case '11': // Thunderstorm
        return <CloudLightning size={size} />;
      case '13': // Snow
        return <CloudSnow size={size} />;
      case '50': // Mist
        return <CloudFog size={size} />;
      default:
        return <Cloud size={size} />;
    }
  };

  return (
    <div className={`inline-flex ${className}`} aria-hidden="true">
      {getIcon()}
    </div>
  );
};

export default WeatherIcon;