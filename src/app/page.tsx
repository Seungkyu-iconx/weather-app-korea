"use client";

import { useState, useEffect } from 'react';
import { getWeatherData, WeatherData } from '@/lib/weather-api';
import { CurrentWeather } from '@/components/CurrentWeather';
import { HourlyWeather } from '@/components/HourlyWeather';
import { WeeklyWeather } from '@/components/WeeklyWeather';
import { MonthlyWeather } from '@/components/MonthlyWeather';
import { LocationSearch } from '@/components/LocationSearch';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState({ name: '서울', country: 'KR' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  
  // 기본 위치 (서울)
  const defaultLat = 37.5665;
  const defaultLon = 126.9780;

  // 위치 기반 날씨 데이터 로드
  const loadWeatherData = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getWeatherData(lat, lon);
      setWeatherData(data);
    } catch (err) {
      setError('날씨 데이터를 불러오는 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 위치 선택 핸들러
  const handleSelectLocation = (lat: number, lon: number, name: string, country: string) => {
    setLocation({ name, country });
    loadWeatherData(lat, lon);
    setShowSearch(false);
  };

  // 컴포넌트 마운트 시 기본 위치 날씨 로드
  useEffect(() => {
    loadWeatherData(defaultLat, defaultLon);
  }, []);

  // 사용자 위치 가져오기
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          loadWeatherData(position.coords.latitude, position.coords.longitude);
          setLocation({ name: '현재 위치', country: '' });
        },
        (err) => {
          console.error('위치 정보를 가져오는 중 오류가 발생했습니다:', err);
          setError('위치 정보를 가져오는 중 오류가 발생했습니다. 기본 위치를 사용합니다.');
          loadWeatherData(defaultLat, defaultLon);
        }
      );
    } else {
      setError('브라우저가 위치 정보를 지원하지 않습니다. 기본 위치를 사용합니다.');
      loadWeatherData(defaultLat, defaultLon);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">날씨 앱</h1>
          <div className="flex gap-2">
            <Button onClick={() => setShowSearch(!showSearch)}>
              {showSearch ? '검색 닫기' : '도시 검색'}
            </Button>
            <Button variant="outline" onClick={getUserLocation}>
              내 위치
            </Button>
          </div>
        </div>

        {showSearch && (
          <LocationSearch onSelectLocation={handleSelectLocation} />
        )}

        {error && (
          <Card className="p-4 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </Card>
        )}

        {loading ? (
          <div className="py-20 text-center">
            <p>날씨 데이터를 불러오는 중...</p>
          </div>
        ) : weatherData ? (
          <div className="space-y-6">
            <CurrentWeather 
              currentData={weatherData.current} 
              location={location} 
            />
            
            <HourlyWeather hourlyData={weatherData.hourly} />
            
            <WeeklyWeather dailyData={weatherData.daily} />
            
            {weatherData.monthly && (
              <MonthlyWeather monthlyData={weatherData.monthly} />
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
