import React from 'react';
import { format } from 'date-fns';
import { Card } from './ui/card';
import Image from 'next/image';

interface WeeklyWeatherProps {
  dailyData: Array<{
    dt: number;
    temp: {
      min: number;
      max: number;
    };
    weather: Array<{
      id: number;
      description: string;
      icon: string;
    }>;
  }>;
}

export const WeeklyWeather: React.FC<WeeklyWeatherProps> = ({ dailyData }) => {
  return (
    <Card className="p-4 w-full">
      <h2 className="text-xl font-bold mb-4">주간 날씨</h2>
      <div className="space-y-3">
        {dailyData.map((day) => {
          const weather = day.weather[0];
          const date = new Date(day.dt * 1000);
          
          return (
            <div key={day.dt} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium w-[100px]">
                  {format(date, 'EEE, MMM d')}
                </span>
                <Image
                  src={`https://openweathermap.org/img/wn/${weather.icon}.png`}
                  alt={weather.description}
                  width={40}
                  height={40}
                />
                <span className="text-sm">{weather.description}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-blue-500">{Math.round(day.temp.min)}°C</span>
                <span className="font-bold text-red-500">{Math.round(day.temp.max)}°C</span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}; 