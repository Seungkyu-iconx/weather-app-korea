# 날씨 앱 (Weather App)

Next.js와 React로 개발된, 시간별/주간/월간 날씨 정보를 제공하는 한국어 날씨 애플리케이션입니다.

## 주요 기능

- 현재 날씨 정보 표시
- 시간별 날씨 예보 (24시간)
- 주간 날씨 예보 (7일)
- 월간 날씨 예보 (30일, 일부 모의 데이터 포함)
- 도시 및 지역 검색 기능
- 현재 위치 기반 날씨 정보

## 기술 스택

- [Next.js 15.2.4](https://nextjs.org/) - React 프레임워크
- [React 19](https://react.dev/) - UI 라이브러리
- [TypeScript](https://www.typescriptlang.org/) - 정적 타입 언어
- [Tailwind CSS](https://tailwindcss.com/) - 스타일링
- [Shadcn UI](https://ui.shadcn.com/) - UI 컴포넌트
- [OpenWeatherMap API](https://openweathermap.org/api) - 날씨 데이터

## 시작하기

### 필수 조건

- Node.js 18 이상
- npm 또는 yarn

### 설치 및 실행

1. 저장소 복제:
```bash
git clone https://github.com/yourusername/weather-app.git
cd weather-app
```

2. 의존성 설치:
```bash
npm install
# or
yarn
```

3. 환경 변수 설정:
`.env.local` 파일을 생성하고 OpenWeatherMap API 키 추가:
```
NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here
```

4. 개발 서버 실행:
```bash
npm run dev
# or
yarn dev
```

5. 브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

## 빌드 및 배포

프로덕션 버전 빌드:
```bash
npm run build
# or
yarn build
```

프로덕션 서버 실행:
```bash
npm run start
# or
yarn start
```

## 라이센스

MIT 라이센스
