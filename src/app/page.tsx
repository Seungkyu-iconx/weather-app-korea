"use client";

import { useState, useEffect } from 'react';
import { getWeatherData, WeatherData, generateMonthlyData } from '@/lib/weather-api';
import { CurrentWeather } from '@/components/CurrentWeather';
import { HourlyWeather } from '@/components/HourlyWeather';
import { WeeklyWeather } from '@/components/WeeklyWeather';
import { MonthlyWeather } from '@/components/MonthlyWeather';
import { LocationSearch } from '@/components/LocationSearch';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// 월간 데이터 타입
interface MonthlyForecast {
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
}

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [monthlyData, setMonthlyData] = useState<MonthlyForecast[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  
  // 기본 위치 (서울)
  const defaultQuery = 'Seoul';

  // 위치 기반 날씨 데이터 로드
  const loadWeatherData = async (query: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getWeatherData(query);
      setWeatherData(data);
      
      // 월간 데이터 생성
      const monthly = generateMonthlyData(data.forecast.forecastday);
      setMonthlyData(monthly);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : '날씨 데이터를 불러오는 중 오류가 발생했습니다.';
      setError(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 위치 선택 핸들러
  const handleSelectLocation = (query: string) => {
    loadWeatherData(query);
    setShowSearch(false);
  };

  // 컴포넌트 마운트 시 기본 위치 날씨 로드
  useEffect(() => {
    loadWeatherData(defaultQuery);
  }, []);

  // 사용자 위치 가져오기
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          loadWeatherData(`${latitude},${longitude}`);
        },
        (err) => {
          console.error('위치 정보를 가져오는 중 오류가 발생했습니다:', err);
          setError('위치 정보를 가져오는 중 오류가 발생했습니다. 기본 위치를 사용합니다.');
          loadWeatherData(defaultQuery);
        }
      );
    } else {
      setError('브라우저가 위치 정보를 지원하지 않습니다. 기본 위치를 사용합니다.');
      loadWeatherData(defaultQuery);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 dark:from-gray-900 dark:to-indigo-950 py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="flex justify-between items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-xl shadow-sm">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 5v14l11-7z"></path>
              </svg>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
              날씨 앱
            </h1>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setShowSearch(!showSearch)}
              className="rounded-lg flex items-center gap-1"
              variant={showSearch ? "destructive" : "default"}
            >
              {showSearch ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                  닫기
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  도시 검색
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              onClick={getUserLocation}
              className="rounded-lg flex items-center gap-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
              </svg>
              내 위치
            </Button>
          </div>
        </header>

        {showSearch && (
          <LocationSearch onSelectLocation={handleSelectLocation} />
        )}

        {error && (
          <Card className="p-4 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </Card>
        )}

        {loading ? (
          <div className="py-20 text-center flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-blue-400 border-t-blue-200 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">날씨 데이터를 불러오는 중...</p>
          </div>
        ) : weatherData ? (
          <div className="space-y-6">
            <CurrentWeather 
              currentData={weatherData.current} 
              location={weatherData.location} 
            />
            
            <HourlyWeather hourlyData={weatherData.forecast.forecastday[0].hour} />
            
            <WeeklyWeather dailyData={weatherData.forecast.forecastday} />
            
            {monthlyData.length > 0 && (
              <MonthlyWeather monthlyData={monthlyData} />
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
