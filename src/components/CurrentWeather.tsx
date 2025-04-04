import React from 'react';
import { Card } from './ui/card';
import Image from 'next/image';

interface CurrentWeatherProps {
  currentData: {
    temp: number;
    feels_like: number;
    humidity: number;
    wind_speed: number;
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
  };
  location: {
    name: string;
    country: string;
  };
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ currentData, location }) => {
  const weather = currentData.weather[0];
  
  return (
    <Card className="p-6 w-full">
      <div className="flex flex-col md:flex-row md:justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">{location.name}, {location.country}</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{weather.description}</p>
          
          <div className="flex items-center">
            <span className="text-4xl font-bold">{Math.round(currentData.temp)}°C</span>
            <Image
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt={weather.description}
              width={80}
              height={80}
            />
          </div>
        </div>
        
        <div className="mt-4 md:mt-0 grid grid-cols-2 gap-x-8 gap-y-2">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">체감 온도</p>
            <p className="font-semibold">{Math.round(currentData.feels_like)}°C</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">습도</p>
            <p className="font-semibold">{currentData.humidity}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">풍속</p>
            <p className="font-semibold">{currentData.wind_speed} m/s</p>
          </div>
        </div>
      </div>
    </Card>
  );
}; 