import React from 'react';
import { Card } from './ui/card';
import { cn } from '@/lib/utils';
import { WeatherIcon } from './WeatherIcon';

interface CurrentWeatherProps {
  currentData: {
    temp_c: number;
    feelslike_c: number;
    humidity: number;
    wind_kph: number;
    wind_dir: string;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    uv: number;
    is_day: number;
  };
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;
  };
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ currentData, location }) => {
  // 낮/밤 상태에 따른 배경 및 텍스트 색상 조정
  const isDay = currentData.is_day === 1;
  
  // 풍향 표시 함수
  const getWindDirection = (dir: string) => {
    const directions: {[key: string]: string} = {
      'N': '북', 'NNE': '북북동', 'NE': '북동', 'ENE': '동북동',
      'E': '동', 'ESE': '동남동', 'SE': '남동', 'SSE': '남남동',
      'S': '남', 'SSW': '남남서', 'SW': '남서', 'WSW': '서남서',
      'W': '서', 'WNW': '서북서', 'NW': '북서', 'NNW': '북북서'
    };
    return directions[dir] || dir;
  };
  
  // UV 지수를 텍스트로 변환
  const getUvLevel = (uv: number) => {
    if (uv < 3) return '낮음';
    if (uv < 6) return '보통';
    if (uv < 8) return '높음';
    if (uv < 11) return '매우 높음';
    return '극도로 높음';
  };
  
  return (
    <Card className={cn(
      "p-6 w-full overflow-hidden relative",
      isDay 
        ? "bg-gradient-to-br from-blue-200 to-blue-400 text-blue-900" 
        : "bg-gradient-to-br from-indigo-900 to-purple-900 text-white"
    )}>
      {/* 장식용 원 */}
      <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full bg-white/10 backdrop-blur-sm" />
      <div className="absolute -left-12 -bottom-12 w-32 h-32 rounded-full bg-white/5 backdrop-blur-sm" />
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">{location.name}</h1>
            <p className="text-sm opacity-80 mb-3">
              {location.region && `${location.region}, `}{location.country}
              <span className="ml-2">{location.localtime.split(' ')[1]}</span>
            </p>
            
            <div className="flex items-center">
              <span className="text-5xl font-bold">{Math.round(currentData.temp_c)}°</span>
              <div className="flex flex-col ml-2">
                <span className="text-sm font-medium">{currentData.condition.text}</span>
                <span className="text-xs opacity-75">체감온도: {Math.round(currentData.feelslike_c)}°</span>
              </div>
              <div className="ml-4">
                <WeatherIcon 
                  code={currentData.condition.code} 
                  isDay={isDay} 
                  text={currentData.condition.text} 
                  size="lg" 
                />
              </div>
            </div>
          </div>
          
          <div className="mt-6 md:mt-0 grid grid-cols-2 gap-x-8 gap-y-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/20 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v2"></path>
                  <path d="M12 8v8"></path>
                  <circle cx="12" cy="18" r="2"></circle>
                  <path d="M6 10a6 6 0 0 0 12 0"></path>
                </svg>
              </div>
              <div>
                <p className="text-xs opacity-75">습도</p>
                <p className="font-semibold">{currentData.humidity}%</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/20 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"></path>
                  <path d="M9.6 4.6A2 2 0 1 1 11 8H2"></path>
                  <path d="M12.6 19.4A2 2 0 1 0 14 16H2"></path>
                </svg>
              </div>
              <div>
                <p className="text-xs opacity-75">바람</p>
                <p className="font-semibold">{Math.round(currentData.wind_kph * 0.277778)} m/s</p>
                <p className="text-xs">{getWindDirection(currentData.wind_dir)}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/20 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <path d="M12 1v2"></path>
                  <path d="M12 21v2"></path>
                  <path d="M4.2 4.2l1.4 1.4"></path>
                  <path d="M18.4 18.4l1.4 1.4"></path>
                  <path d="M1 12h2"></path>
                  <path d="M21 12h2"></path>
                  <path d="M4.2 19.8l1.4-1.4"></path>
                  <path d="M18.4 5.6l1.4-1.4"></path>
                </svg>
              </div>
              <div>
                <p className="text-xs opacity-75">자외선</p>
                <p className="font-semibold">{getUvLevel(currentData.uv)}</p>
                <p className="text-xs">UV {currentData.uv}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}; 