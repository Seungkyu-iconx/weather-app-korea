import React from 'react';
import { format } from 'date-fns';
import { Card } from './ui/card';

interface MonthlyWeatherProps {
  monthlyData: Array<{
    dt: number;
    temp: {
      min: number;
      max: number;
    };
  }>;
}

export const MonthlyWeather: React.FC<MonthlyWeatherProps> = ({ monthlyData }) => {
  return (
    <Card className="p-4 w-full">
      <h2 className="text-xl font-bold mb-4">월간 날씨</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {monthlyData.map((day) => {
          const date = new Date(day.dt * 1000);
          
          return (
            <div key={day.dt} className="border rounded p-2 text-center">
              <span className="text-sm font-medium block">
                {format(date, 'MMM d')}
              </span>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-blue-500">{Math.round(day.temp.min)}°C</span>
                <span className="text-xs text-red-500">{Math.round(day.temp.max)}°C</span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}; 