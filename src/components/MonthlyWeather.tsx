import React, { useState } from 'react';
import { format } from 'date-fns';
import { Card } from './ui/card';
import { ko } from 'date-fns/locale';
import Image from 'next/image';

interface MonthlyWeatherProps {
  monthlyData: Array<{
    date: string;
    date_epoch: number;
    day: {
      maxtemp_c: number;
      mintemp_c: number;
      condition: {
        text: string;
        icon: string;
      };
    };
  }>;
}

export const MonthlyWeather: React.FC<MonthlyWeatherProps> = ({ monthlyData }) => {
  // 데이터가 많으므로 페이지네이션 구현
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(monthlyData.length / itemsPerPage);
  
  // 현재 페이지에 표시할 데이터
  const currentData = monthlyData.slice(
    currentPage * itemsPerPage, 
    (currentPage + 1) * itemsPerPage
  );

  return (
    <Card className="p-4 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
              <path d="M8 14h.01"></path>
              <path d="M12 14h.01"></path>
              <path d="M16 14h.01"></path>
              <path d="M8 18h.01"></path>
              <path d="M12 18h.01"></path>
              <path d="M16 18h.01"></path>
            </svg>
          </div>
          <h2 className="text-lg font-bold">월간 날씨</h2>
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
              currentPage === 0 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            ←
          </button>
          <span className="text-sm text-gray-500">
            {currentPage + 1} / {totalPages}
          </span>
          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={currentPage === totalPages - 1}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
              currentPage === totalPages - 1 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            →
          </button>
        </div>
      </div>
      
      <div className="space-y-2">
        {currentData.map((dayData) => {
          const date = new Date(dayData.date);
          // 아이콘 URL에서 http를 https로 변경
          const iconUrl = dayData.day.condition.icon.replace('http:', 'https:');
          
          // 요일 한글로 표시
          const dayOfWeek = format(date, 'EEE', { locale: ko });
          
          return (
            <div key={dayData.date_epoch} className="flex items-center p-3 rounded-lg transition-all hover:bg-gray-50 dark:hover:bg-gray-800/50">
              <div className="w-24 flex flex-col">
                <span className="font-medium">
                  {format(date, 'M월 d일')}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {dayOfWeek}요일
                </span>
              </div>
              
              <div className="flex items-center flex-1">
                <Image
                  src={iconUrl}
                  alt={dayData.day.condition.text}
                  width={36}
                  height={36}
                />
                <span className="ml-2 text-sm">{dayData.day.condition.text}</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  {Math.round(dayData.day.mintemp_c)}°
                </span>
                <div className="w-16 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full relative">
                  <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-red-400 rounded-full" 
                       style={{
                         width: '100%'
                       }}></div>
                </div>
                <span className="font-medium text-red-600 dark:text-red-400">
                  {Math.round(dayData.day.maxtemp_c)}°
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}; 