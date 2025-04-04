import React from 'react';
import { format } from 'date-fns';
import { Card } from './ui/card';
import Image from 'next/image';

interface HourlyWeatherProps {
  hourlyData: Array<{
    dt: number;
    temp: number;
    weather: Array<{
      id: number;
      description: string;
      icon: string;
    }>;
  }>;
}

export const HourlyWeather: React.FC<HourlyWeatherProps> = ({ hourlyData }) => {
  // 24시간 데이터만 표시
  const next24Hours = hourlyData.slice(0, 24);

  return (
    <Card className="p-4 w-full">
      <h2 className="text-xl font-bold mb-4">시간별 날씨</h2>
      <div className="flex overflow-x-auto pb-2 gap-4">
        {next24Hours.map((hour) => {
          const weather = hour.weather[0];
          const time = new Date(hour.dt * 1000);
          
          return (
            <div key={hour.dt} className="flex flex-col items-center min-w-[70px]">
              <span className="text-sm font-medium">
                {format(time, 'HH:mm')}
              </span>
              <Image
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt={weather.description}
                width={50}
                height={50}
              />
              <span className="font-bold">{Math.round(hour.temp)}°C</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}; 