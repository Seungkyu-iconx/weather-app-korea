// 더미 위치 데이터
export const dummyLocations = [
  {
    name: '서울',
    region: '서울특별시',
    country: '대한민국',
    lat: 37.5665,
    lon: 126.978,
    url: 'seoul-seoul-south-korea',
  },
  {
    name: '부산',
    region: '부산광역시',
    country: '대한민국',
    lat: 35.1796,
    lon: 129.0756,
    url: 'busan-busan-south-korea',
  },
  {
    name: '인천',
    region: '인천광역시',
    country: '대한민국',
    lat: 37.4563,
    lon: 126.7052,
    url: 'incheon-incheon-south-korea',
  },
  {
    name: '대구',
    region: '대구광역시',
    country: '대한민국',
    lat: 35.8714,
    lon: 128.6014,
    url: 'daegu-daegu-south-korea',
  },
  {
    name: '대전',
    region: '대전광역시',
    country: '대한민국',
    lat: 36.3504,
    lon: 127.3845,
    url: 'daejeon-daejeon-south-korea',
  },
];

// 날씨 상태 더미 데이터
const weatherConditions = [
  { text: '맑음', icon: '//cdn.weatherapi.com/weather/64x64/day/113.png', code: 1000 },
  { text: '구름 조금', icon: '//cdn.weatherapi.com/weather/64x64/day/116.png', code: 1003 },
  { text: '흐림', icon: '//cdn.weatherapi.com/weather/64x64/day/119.png', code: 1006 },
  { text: '안개', icon: '//cdn.weatherapi.com/weather/64x64/day/143.png', code: 1030 },
  { text: '가벼운 비', icon: '//cdn.weatherapi.com/weather/64x64/day/296.png', code: 1183 },
  { text: '가벼운 눈', icon: '//cdn.weatherapi.com/weather/64x64/day/326.png', code: 1210 },
];

// 시간별 날씨 더미 데이터 생성 함수
const generateHourlyData = (baseTemp: number, date: string) => {
  const hourlyData = [];
  const today = new Date(date);
  
  // 24시간 데이터 생성
  for (let hour = 0; hour < 24; hour++) {
    const hourTime = new Date(today);
    hourTime.setHours(hour);
    
    // 시간에 따른 온도 변화 (오후에 더 따뜻하고 새벽에 더 추움)
    const hourOffset = hour < 6 ? -2 : (hour > 12 && hour < 18 ? 3 : 1);
    const temp = baseTemp + hourOffset + (Math.random() * 2 - 1);
    
    // 날씨 상태 랜덤 선택 (낮과 밤에 따라 아이콘 변경)
    const conditionIndex = Math.floor(Math.random() * weatherConditions.length);
    const condition = { ...weatherConditions[conditionIndex] };
    if (hour < 6 || hour > 18) {
      condition.icon = condition.icon.replace('/day/', '/night/');
    }
    
    // 강수 확률 (흐림, 비 조건일 때 더 높게)
    const chanceOfRain = condition.code > 1003 ? 
      Math.floor(Math.random() * 60) + 20 : 
      Math.floor(Math.random() * 20);
    
    hourlyData.push({
      time: hourTime.toISOString(),
      time_epoch: Math.floor(hourTime.getTime() / 1000),
      temp_c: temp,
      condition,
      chance_of_rain: chanceOfRain
    });
  }
  
  return hourlyData;
};

// 일별 날씨 더미 데이터 생성
const generateDailyData = (startDate: Date, days: number = 7) => {
  const dailyData = [];
  
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    // 계절에 따른 기본 온도 조정
    const month = date.getMonth(); // 0-11
    let baseTemp;
    if (month >= 5 && month <= 8) { // 여름 (6-9월)
      baseTemp = 25 + (Math.random() * 5);
    } else if (month >= 11 || month <= 1) { // 겨울 (12-2월)
      baseTemp = 0 + (Math.random() * 5);
    } else if (month >= 2 && month <= 4) { // 봄 (3-5월)
      baseTemp = 15 + (Math.random() * 5);
    } else { // 가을 (9-11월)
      baseTemp = 15 + (Math.random() * 5);
    }
    
    // 일간 최고/최저 온도
    const minTemp = baseTemp - (Math.random() * 5) - 2;
    const maxTemp = baseTemp + (Math.random() * 5) + 2;
    
    // 날씨 상태 랜덤 선택
    const conditionIndex = Math.floor(Math.random() * weatherConditions.length);
    
    dailyData.push({
      date: date.toISOString().split('T')[0],
      date_epoch: Math.floor(date.getTime() / 1000),
      day: {
        maxtemp_c: maxTemp,
        mintemp_c: minTemp,
        avgtemp_c: (maxTemp + minTemp) / 2,
        condition: weatherConditions[conditionIndex]
      },
      hour: generateHourlyData((maxTemp + minTemp) / 2, date.toISOString())
    });
  }
  
  return dailyData;
};

// 더미 날씨 데이터
export const generateDummyWeatherData = (locationIndex: number = 0) => {
  const location = dummyLocations[locationIndex];
  const now = new Date();
  const isDay = now.getHours() >= 6 && now.getHours() < 18 ? 1 : 0;
  const conditionIndex = Math.floor(Math.random() * weatherConditions.length);
  
  // 현재 날씨 기본 온도
  const month = now.getMonth();
  let currentTemp;
  if (month >= 5 && month <= 8) { // 여름
    currentTemp = 23 + (Math.random() * 8);
  } else if (month >= 11 || month <= 1) { // 겨울
    currentTemp = -5 + (Math.random() * 10);
  } else { // 봄/가을
    currentTemp = 10 + (Math.random() * 10);
  }
  
  const feelsLike = currentTemp + (Math.random() * 4 - 2);
  
  // 날씨 데이터 생성
  return {
    location: {
      name: location.name,
      region: location.region,
      country: location.country,
      lat: location.lat,
      lon: location.lon,
      localtime: now.toISOString().replace('Z', '')
    },
    current: {
      temp_c: currentTemp,
      condition: weatherConditions[conditionIndex],
      wind_kph: 5 + Math.random() * 20,
      wind_dir: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.floor(Math.random() * 8)],
      humidity: 30 + Math.floor(Math.random() * 50),
      feelslike_c: feelsLike,
      uv: Math.floor(Math.random() * 11),
      is_day: isDay
    },
    forecast: {
      forecastday: generateDailyData(now)
    }
  };
};

// 검색 결과 생성 함수
export const generateSearchResults = (query: string) => {
  // 쿼리가 비어있거나 짧으면 전체 결과 반환
  if (!query || query.length < 2) {
    return dummyLocations;
  }
  
  // 검색어를 포함하는 위치 필터링
  const lowerQuery = query.toLowerCase();
  return dummyLocations.filter(location => 
    location.name.toLowerCase().includes(lowerQuery) || 
    location.region.toLowerCase().includes(lowerQuery) ||
    location.country.toLowerCase().includes(lowerQuery)
  );
}; 