# 날씨 앱 (Weather App)

Next.js와 React로 개발된, 시간별/주간/월간 날씨 정보를 제공하는 한국어 날씨 애플리케이션입니다.

## 주요 기능

- 현재 날씨 정보 표시 (온도, 체감 온도, 습도, 풍속, 자외선 지수)
- 시간별 날씨 예보 (24시간, 강수 확률 포함)
- 주간 날씨 예보 (7일, 온도 범위 시각화)
- 월간 날씨 예보 (30일, 페이지네이션 지원)
- 도시 및 지역 검색 기능 (한국 주요 도시)
- 현재 위치 기반 날씨 정보
- 낮/밤에 따른 UI 테마 자동 변경

## 기술 스택

- [Next.js 15.2.4](https://nextjs.org/) - React 프레임워크
- [React 19](https://react.dev/) - UI 라이브러리
- [TypeScript](https://www.typescriptlang.org/) - 정적 타입 언어
- [Tailwind CSS](https://tailwindcss.com/) - 스타일링
- [Shadcn UI](https://ui.shadcn.com/) - UI 컴포넌트
- 더미 데이터 - 실제 API 대신 사용

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

3. 개발 서버 실행:
```bash
npm run dev
# or
yarn dev
```

4. 브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

5. 빌드 및 프로덕션 실행:
```bash
npm run build
npm run start
# or
yarn build
yarn start
```

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
- 30일 동안의 날씨 예보 제공 (모의 데이터)
- 페이지네이션으로 편리한 탐색 기능
- 날짜, 요일, 최고/최저 온도 제공

## 더미 데이터 구현 안내

이 앱은 API 대신 로컬에서 생성된 더미 데이터를 사용합니다:

- 현재 시간과, 계절에 따라 적절한 날씨 데이터가 생성됩니다.
- 서울, 부산, 인천, 대구, 대전 등 한국의 주요 도시 정보가 포함되어 있습니다.
- 실제 API 없이도 모든 기능을 확인할 수 있습니다.

## 라이센스

MIT 라이센스
