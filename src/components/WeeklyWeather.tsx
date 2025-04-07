import React from 'react';
import { format } from 'date-fns';
import { Card } from './ui/card';
import { ko } from 'date-fns/locale';
import { WeatherIcon } from './WeatherIcon';

interface WeeklyWeatherProps {
  dailyData: Array<{
    date: string;
    date_epoch: number;
    day: {
      maxtemp_c: number;
      mintemp_c: number;
      condition: {
        text: string;
        icon: string;
        code: number;
      };
    };
  }>;
}

export const WeeklyWeather: React.FC<WeeklyWeatherProps> = ({ dailyData }) => {
  // 오늘 날짜
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <Card className="p-4 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm">
      <div className="flex items-center mb-4">
        <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </div>
        <h2 className="text-lg font-bold">주간 날씨</h2>
      </div>
      
      <div className="space-y-3">
        {dailyData.map((day) => {
          const date = new Date(day.date);
          
          // 오늘, 내일 표시
          let dayLabel = format(date, 'EEE', { locale: ko });
          if (date.toDateString() === today.toDateString()) {
            dayLabel = '오늘';
          } else if (date.toDateString() === new Date(today.getTime() + 86400000).toDateString()) {
            dayLabel = '내일';
          }
          
          // 온도 범위 계산 (0~100% 정규화)
          const allTemps = dailyData.map(d => [d.day.mintemp_c, d.day.maxtemp_c]).flat();
          const minTemp = Math.min(...allTemps);
          const maxTemp = Math.max(...allTemps);
          const tempRange = maxTemp - minTemp;
          
          const minPos = tempRange ? ((day.day.mintemp_c - minTemp) / tempRange) * 100 : 0;
          const maxPos = tempRange ? ((day.day.maxtemp_c - minTemp) / tempRange) * 100 : 100;
          const rangeWidth = maxPos - minPos;
          
          return (
            <div key={day.date_epoch} className="p-3 rounded-lg transition-all hover:bg-gray-50 dark:hover:bg-gray-800/50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <span className="text-sm font-medium w-[60px]">
                    {dayLabel}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {format(date, 'M/d')}
                  </span>
                </div>
                <div className="flex items-center">
                  <WeatherIcon 
                    code={day.day.condition.code} 
                    isDay={true} 
                    text={day.day.condition.text} 
                    size="sm" 
                  />
                  <span className="ml-2 text-sm">{day.day.condition.text}</span>
                </div>
              </div>
              
              <div className="relative h-6 flex items-center pl-[60px]">
                {/* 온도 범위 표시 바 */}
                <div className="absolute left-[60px] right-0 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <div 
                    className="absolute h-1.5 bg-gradient-to-r from-blue-400 to-red-400 rounded-full"
                    style={{ 
                      left: `${minPos}%`, 
                      width: `${rangeWidth}%` 
                    }}
                  ></div>
                </div>
                
                {/* 최저/최고 온도 */}
                <span className="absolute text-xs font-medium text-blue-600 dark:text-blue-400" style={{ left: `calc(${minPos}% + 60px - 10px)` }}>
                  {Math.round(day.day.mintemp_c)}°
                </span>
                <span className="absolute text-xs font-medium text-red-600 dark:text-red-400" style={{ left: `calc(${maxPos}% + 60px - 10px)` }}>
                  {Math.round(day.day.maxtemp_c)}°
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}; 