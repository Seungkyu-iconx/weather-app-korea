import React from 'react';
import { format } from 'date-fns';
import { Card } from './ui/card';
import Image from 'next/image';

interface HourlyWeatherProps {
  hourlyData: Array<{
    time: string;
    time_epoch: number;
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    chance_of_rain: number;
  }>;
}

export const HourlyWeather: React.FC<HourlyWeatherProps> = ({ hourlyData }) => {
  // 24시간 데이터
  const next24Hours = hourlyData.slice(0, 24);

  return (
    <Card className="p-4 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm">
      <div className="flex items-center mb-4">
        <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>
        <h2 className="text-lg font-bold">시간별 날씨</h2>
      </div>
      
      <div className="flex overflow-x-auto pb-2 gap-3 scrollbar-thin scrollbar-thumb-gray-300">
        {next24Hours.map((hour) => {
          // 아이콘 URL에서 http를 https로 변경
          const iconUrl = hour.condition.icon.replace('http:', 'https:');
          const time = new Date(hour.time);
          const isNow = new Date().getHours() === time.getHours();
          
          return (
            <div 
              key={hour.time_epoch} 
              className={`flex flex-col items-center min-w-[80px] p-3 rounded-lg transition-all ${
                isNow 
                  ? 'bg-blue-50 dark:bg-blue-900/30 shadow-sm' 
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
              }`}
            >
              <span className="text-sm font-medium mb-1">
                {format(time, 'HH:mm')}
              </span>
              <Image
                src={iconUrl}
                alt={hour.condition.text}
                width={48}
                height={48}
                className="my-1"
              />
              <span className="font-bold text-lg">{Math.round(hour.temp_c)}°</span>
              
              {hour.chance_of_rain > 0 && (
                <div className="flex items-center mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500 mr-1">
                    <path d="M20 16.2A4.5 4.5 0 0 0 17.5 8h-1.8A7 7 0 1 0 4 14.9"></path>
                    <path d="M16 14v6"></path>
                    <path d="M8 14v6"></path>
                    <path d="M12 16v6"></path>
                  </svg>
                  <span className="text-xs text-blue-600 dark:text-blue-400">{hour.chance_of_rain}%</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}; 