import axios from 'axios';

// WeatherAPI.com API 설정 (실제 API 키는 환경 변수로 관리하는 것이 좋습니다)
const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY || 'YOUR_API_KEY';
const BASE_URL = 'https://api.weatherapi.com/v1';

// 날씨 데이터 타입 정의
export interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    localtime: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_kph: number;
    wind_dir: string;
    humidity: number;
    feelslike_c: number;
    uv: number;
    is_day: number;
  };
  forecast: {
    forecastday: Array<{
      date: string;
      date_epoch: number;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        avgtemp_c: number;
        condition: {
          text: string;
          icon: string;
          code: number;
        };
      };
      hour: Array<{
        time: string;
        time_epoch: number;
        temp_c: number;
        condition: {
          text: string;
          icon: string;
          code: number;
        };
        chance_of_rain: number;
      }>;
    }>;
  };
}

// 위치 정보 타입
export interface LocationData {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}

// 날씨 API 호출 함수
export const getWeatherData = async (
  query: string
): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast.json`, {
      params: {
        key: API_KEY,
        q: query,
        days: 7,
        aqi: 'no',
        alerts: 'no',
      },
    });

    return response.data;
  } catch (error) {
    console.error('날씨 데이터를 가져오는 중 오류가 발생했습니다:', error);
    throw error;
  }
};

// 위치 검색 함수
export const searchLocation = async (query: string): Promise<LocationData[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/search.json`, {
      params: {
        key: API_KEY,
        q: query,
      },
    });

    return response.data;
  } catch (error) {
    console.error('위치 데이터를 가져오는 중 오류가 발생했습니다:', error);
    throw error;
  }
};

// 월간 날씨 데이터 생성 (API가 제공하지 않으므로 모의 데이터 생성)
export const generateMonthlyData = (forecastData: WeatherData['forecast']['forecastday']) => {
  // 월간 데이터를 위한 배열 (30일)
  const monthlyData = [];
  
  // 가지고 있는 예보 데이터를 사용
  for (let i = 0; i < forecastData.length; i++) {
    monthlyData.push({
      date: forecastData[i].date,
      date_epoch: forecastData[i].date_epoch,
      day: {
        maxtemp_c: forecastData[i].day.maxtemp_c,
        mintemp_c: forecastData[i].day.mintemp_c,
        condition: forecastData[i].day.condition,
      }
    });
  }
  
  // 나머지 날짜는 모의 데이터 생성 (30일까지)
  const daysToGenerate = 30 - forecastData.length;
  if (daysToGenerate > 0) {
    const lastDay = new Date(forecastData[forecastData.length - 1].date);
    
    for (let i = 1; i <= daysToGenerate; i++) {
      const newDate = new Date(lastDay);
      newDate.setDate(lastDay.getDate() + i);
      
      // 무작위로 기존 데이터에서 날씨 조건 선택
      const randomIndex = Math.floor(Math.random() * forecastData.length);
      const randomCondition = forecastData[randomIndex].day.condition;
      
      // 온도 범위 무작위 생성 (기존 데이터 기반으로 약간의 변동)
      const baseTemp = forecastData[randomIndex].day.avgtemp_c;
      const randomVariation = Math.random() * 5 - 2.5; // -2.5~2.5 사이 변동
      
      monthlyData.push({
        date: newDate.toISOString().split('T')[0],
        date_epoch: Math.floor(newDate.getTime() / 1000),
        day: {
          maxtemp_c: baseTemp + 3 + randomVariation,
          mintemp_c: baseTemp - 3 + randomVariation,
          condition: randomCondition,
        }
      });
    }
  }
  
  return monthlyData;
}; 