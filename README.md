# 날씨 앱 (Weather App)

이 프로젝트는 Next.js, TypeScript, Tailwind CSS를 사용하여 구현된 날씨 애플리케이션입니다.

## 주요 기능

- 현재 날씨 정보 표시
- 시간별 날씨 예보 (24시간)
- 주간 날씨 예보 (7일)
- 월간 날씨 예보 (30일)
- 도시 및 지역 검색 기능
- 사용자의 현재 위치 기반 날씨 정보

## 기술 스택

- **프레임워크**: Next.js 15.2.4
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **UI 컴포넌트**: Shadcn UI
- **날짜 처리**: date-fns
- **API 통신**: axios

## 시작하기

### 필수 요구사항

- Node.js 20.0.0 이상
- OpenWeatherMap API 키

### 설치 및 실행

1. 저장소 클론하기
   ```bash
   git clone https://github.com/yourusername/weather-app.git
   cd weather-app
   ```

2. 의존성 설치
   ```bash
   npm install
   ```

3. `.env.local` 파일 생성 및 API 키 설정
   ```
   NEXT_PUBLIC_WEATHER_API_KEY=your_openweathermap_api_key
   ```

4. 개발 서버 실행
   ```bash
   npm run dev
   ```

5. 브라우저에서 `http://localhost:3000` 접속

## 빌드 및 배포

프로덕션 빌드:
```bash
npm run build
```

빌드된 앱 실행:
```bash
npm run start
```

## 프로젝트 구조

```
/
├── public/                # 정적 파일
├── src/
│   ├── app/               # Next.js App Router
│   ├── components/        # 리액트 컴포넌트
│   │   ├── CurrentWeather.tsx
│   │   ├── HourlyWeather.tsx
│   │   ├── WeeklyWeather.tsx
│   │   ├── MonthlyWeather.tsx
│   │   └── LocationSearch.tsx
│   └── lib/               # 유틸리티 및 API 서비스
│       └── weather-api.ts # 날씨 API 서비스
└── .env.local             # 환경 변수
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
