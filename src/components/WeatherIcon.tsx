import React from 'react';

interface WeatherIconProps {
  code: number;
  isDay?: boolean;
  text?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ 
  code, 
  isDay = true, 
  text = '',
  size = 'md', 
  className = ''
}) => {
  // 아이콘 크기 설정
  const sizeMap = {
    sm: 24,
    md: 40,
    lg: 60,
    xl: 80
  };
  
  const iconSize = sizeMap[size];
  
  // 기본 아이콘 스타일 (애니메이션 추가)
  const baseClass = `inline-block ${className} hover:scale-110 transition-all duration-300`;
  
  // 아이콘 색상 (더 밝고 생동감 있는 색상으로 조정)
  const dayColors = {
    sun: 'text-amber-500',
    cloud: 'text-slate-400',
    rain: 'text-blue-500',
    snow: 'text-slate-200',
    fog: 'text-slate-300'
  };
  
  const nightColors = {
    moon: 'text-amber-200',
    cloud: 'text-slate-500',
    rain: 'text-blue-400',
    snow: 'text-slate-300',
    fog: 'text-slate-500'
  };
  
  // 아이콘별 애니메이션 클래스
  const getAnimationClass = (weatherType: string): string => {
    switch(weatherType) {
      case 'sun': return 'animate-pulse-slow';
      case 'rain': return 'animate-bounce-subtle';
      case 'snow': return 'animate-float';
      default: return '';
    }
  };
  
  // 날씨 코드에 따라 아이콘 반환
  switch (code) {
    // 맑음 (1000)
    case 1000:
      return isDay ? (
        // 맑은 낮 - 해
        <div className={`${baseClass} ${dayColors.sun} ${getAnimationClass('sun')}`} title={text}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width={iconSize} 
            height={iconSize} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        </div>
      ) : (
        // 맑은 밤 - 달
        <div className={`${baseClass} ${nightColors.moon}`} title={text}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width={iconSize} 
            height={iconSize} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </div>
      );
      
    // 구름 조금 (1003)
    case 1003:
      return isDay ? (
        // 구름 조금 낮 - 해+구름
        <div className={`${baseClass} ${dayColors.cloud}`} title={text}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width={iconSize} 
            height={iconSize} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M8 3v2"></path>
            <path d="M16 3v2"></path>
            <path d="M12 3v6"></path>
            <circle cx="12" cy="11" r="3" className={`${dayColors.sun} ${getAnimationClass('sun')}`}></circle>
            <path d="M17.5 17.5c0-2.76-2.24-5-5-5a5 5 0 0 0-5 5"></path>
            <path d="M17.5 17.5a2.5 2.5 0 1 0 0 5h-11a2.5 2.5 0 1 0 0-5"></path>
          </svg>
        </div>
      ) : (
        // 구름 조금 밤 - 달+구름
        <div className={`${baseClass} ${nightColors.cloud}`} title={text}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width={iconSize} 
            height={iconSize} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M13 4c-2.76 0-5 2.24-5 5 0 1.63.78 3.07 2 3.97"></path>
            <path d="M13 4a7 7 0 0 1 6.32 10" className={nightColors.moon}></path>
            <path d="M10 17a3 3 0 1 1 0-6h9.17a2 2 0 1 1 0 4H10"></path>
            <path d="M11 20.8a3 3 0 1 1-6 0c0-1.3.84-2.4 2-2.8"></path>
            <path d="M11 14a5 5 0 0 0-5 5"></path>
          </svg>
        </div>
      );
    
    // 흐림 (1006)
    case 1006:
      return (
        <div className={`${baseClass} ${isDay ? dayColors.cloud : nightColors.cloud}`} title={text}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width={iconSize} 
            height={iconSize}
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M17 8a5 5 0 0 0-10 0"></path>
            <path d="M18 8.4c1.8.8 3 2.6 3 4.6 0 2.8-2.2 5-5 5h-8c-2.8 0-5-2.2-5-5 0-2.4 1.7-4.4 4-4.9"></path>
            <path d="M9 13v.01"></path>
            <path d="M15 13v.01"></path>
          </svg>
        </div>
      );
    
    // 안개 (1030)
    case 1030:
      return (
        <div className={`${baseClass} ${isDay ? dayColors.fog : nightColors.fog}`} title={text}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width={iconSize}
            height={iconSize} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M3 10h18"></path>
            <path d="M3 14h18"></path>
            <path d="M5 18h14"></path>
            <path d="M7 6h10"></path>
          </svg>
        </div>
      );
    
    // 가벼운 비 (1183)
    case 1183:
      return (
        <div className={`${baseClass} ${isDay ? dayColors.rain : nightColors.rain} ${getAnimationClass('rain')}`} title={text}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width={iconSize} 
            height={iconSize} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
            <path d="M16 14v6"></path>
            <path d="M8 14v6"></path>
            <path d="M12 16v6"></path>
          </svg>
        </div>
      );
    
    // 가벼운 눈 (1210)
    case 1210:
      return (
        <div className={`${baseClass} ${isDay ? dayColors.snow : nightColors.snow} ${getAnimationClass('snow')}`} title={text}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width={iconSize} 
            height={iconSize} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
            <path d="M8 15h.01"></path>
            <path d="M8 19h.01"></path>
            <path d="M12 17h.01"></path>
            <path d="M12 21h.01"></path>
            <path d="M16 15h.01"></path>
            <path d="M16 19h.01"></path>
          </svg>
        </div>
      );
    
    // 기본 아이콘 (알 수 없는 코드)
    default:
      return (
        <div className={`${baseClass} text-gray-400`} title={text || '알 수 없는 날씨'}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width={iconSize} 
            height={iconSize} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 16v.01"></path>
            <path d="M12 8v4"></path>
          </svg>
        </div>
      );
  }
}; 