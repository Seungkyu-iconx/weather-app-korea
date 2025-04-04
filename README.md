# 날씨 앱 (Weather App)

Next.js와 React로 개발된, 시간별/주간/월간 날씨 정보를 제공하는 한국어 날씨 애플리케이션입니다.

## 주요 기능

- 현재 날씨 정보 표시 (온도, 체감 온도, 습도, 풍속, 자외선 지수)
- 시간별 날씨 예보 (24시간, 강수 확률 포함)
- 주간 날씨 예보 (7일, 온도 범위 시각화)
- 월간 날씨 예보 (30일, 페이지네이션 지원)
- 도시 및 지역 검색 기능 (전 세계 지역 검색)
- 현재 위치 기반 날씨 정보
- 낮/밤에 따른 UI 테마 자동 변경

## 기술 스택

- [Next.js 15.2.4](https://nextjs.org/) - React 프레임워크
- [React 19](https://react.dev/) - UI 라이브러리
- [TypeScript](https://www.typescriptlang.org/) - 정적 타입 언어
- [Tailwind CSS](https://tailwindcss.com/) - 스타일링
- [Shadcn UI](https://ui.shadcn.com/) - UI 컴포넌트
- [WeatherAPI.com](https://www.weatherapi.com/) - 날씨 데이터

## 시작하기

### 필수 조건

- Node.js 18 이상
- npm 또는 yarn

### 설치 및 실행

1. 저장소 복제:
```bash
git clone https://github.com/yourusername/weather-app-korea.git
cd weather-app-korea
```

2. 의존성 설치:
```bash
npm install
# or
yarn
```

3. 환경 변수 설정:
`.env.local` 파일을 생성하고 WeatherAPI.com API 키 추가:
```
NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here
```
API 키는 [WeatherAPI.com](https://www.weatherapi.com/)에서 무료로 발급받을 수 있습니다.

4. 개발 서버 실행:
```bash
npm run dev
# or
yarn dev
```

5. 브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

## 기능 소개

### 현재 날씨
- 도시/지역 이름, 날씨 상태, 온도, 체감 온도 표시
- 습도, 풍속, 풍향, 자외선 지수 등 상세 날씨 정보 제공
- 낮/밤에 따른 다른 디자인 테마 적용

### 시간별 날씨
- 24시간 동안의 시간별 날씨 정보 제공
- 강수 확률, 온도, 날씨 상태 표시
- 현재 시간 하이라이트 표시

### 주간 날씨
- 7일 동안의 날씨 예보 제공
- 온도 범위를 시각적 바 그래프로 표시
- 오늘/내일 표시 및 한글 요일 정보

### 월간 날씨
- 30일 동안의 날씨 예보 제공 (일부 모의 데이터 포함)
- 페이지네이션으로 편리한 탐색 기능
- 날짜, 요일, 최고/최저 온도 제공

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
