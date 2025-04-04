import axios from 'axios';

// 날씨 API의 기본 URL (실제 API 키는 환경 변수로 관리하는 것이 좋습니다)
const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY || 'YOUR_API_KEY';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// 날씨 데이터 타입
export interface WeatherData {
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    wind_speed: number;
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
  };
  hourly: Array<{
    dt: number;
    temp: number;
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
  }>;
  daily: Array<{
    dt: number;
    temp: {
      min: number;
      max: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
  }>;
  monthly?: Array<{
    dt: number;
    temp: {
      min: number;
      max: number;
    };
  }>;
}

// 위치 정보 타입
export interface LocationData {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

// 위치 API 응답 타입
interface LocationApiResponse {
  name: string;
  country: string;
  lat: number;
  lon: number;
  [key: string]: unknown;
}

// 날씨 API 호출 함수
export const getWeatherData = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${BASE_URL}/onecall`, {
      params: {
        lat,
        lon,
        units: 'metric', // 섭씨 온도 단위 사용
        exclude: 'minutely,alerts',
        appid: API_KEY,
      },
    });
    
    // 실제 API에서는 월간 데이터를 제공하지 않으므로 일일 데이터를 가공하여 월간 데이터 생성
    const monthlyData = generateMonthlyData(response.data.daily);
    
    return {
      ...response.data,
      monthly: monthlyData,
    };
  } catch (error) {
    console.error('날씨 데이터를 가져오는 중 오류가 발생했습니다:', error);
    throw error;
  }
};

// 위치 검색 함수
export const searchLocation = async (query: string): Promise<LocationData[]> => {
  try {
    const response = await axios.get('https://api.openweathermap.org/geo/1.0/direct', {
      params: {
        q: query,
        limit: 5,
        appid: API_KEY,
      },
    });
    
    return response.data.map((location: LocationApiResponse) => ({
      name: location.name,
      country: location.country,
      lat: location.lat,
      lon: location.lon,
    }));
  } catch (error) {
    console.error('위치 데이터를 가져오는 중 오류가 발생했습니다:', error);
    throw error;
  }
};

// 일일 날씨 데이터 타입
interface DailyWeatherData {
  temp: {
    min: number;
    max: number;
  };
  [key: string]: unknown;
}

// 월간 데이터 생성 (실제 API가 제공하지 않으므로 모의 데이터 생성)
const generateMonthlyData = (dailyData: DailyWeatherData[]) => {
  // 현재 날짜로부터 한 달간의 날씨 데이터 생성 (실제로는 7일치만 있으므로 모의 데이터 생성)
  const today = new Date();
  const monthlyData = [];
  
  // 30일간의 데이터 생성
  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);
    
    // 7일치 데이터는 API에서 가져온 것 사용, 나머지는 모의 데이터 생성
    if (i < dailyData.length) {
      monthlyData.push({
        dt: Math.floor(date.getTime() / 1000),
        temp: {
          min: dailyData[i].temp.min,
          max: dailyData[i].temp.max,
        },
      });
    } else {
      // 모의 데이터 생성 (실제 날씨 앱에서는 사용하지 않음)
      const randomIndex = Math.floor(Math.random() * dailyData.length);
      monthlyData.push({
        dt: Math.floor(date.getTime() / 1000),
        temp: {
          min: dailyData[randomIndex].temp.min,
          max: dailyData[randomIndex].temp.max,
        },
      });
    }
  }
  
  return monthlyData;
}; 