<!-- PROJECT LOGO -->
<br />
<div align="center">
  <p align="center">
    <br />
    ~~[배포 페이지]~~
**supabase이슈로 수정중**

<a href="https://github.com/wkdrhkdwls/Board_Data-Visualization/issues/new?assignees=&labels=bug&projects=&template=%EB%B2%84%EA%B7%B8-%EB%A6%AC%ED%8F%AC%ED%8A%B8-%EC%9D%B4%EC%8A%88.md&title=">버그 리포트 작성하기</a>
·
 <a href="https://github.com/wkdrhkdwls/Board_Data-Visualization/issues/new?assignees=&labels=documentation%2C+enhancement&projects=&template=%EA%B8%B0%EB%8A%A5-%EC%9A%94%EC%B2%AD-%EC%9D%B4%EC%8A%88.md&title=">기능 요청사항 작성하기</a>
  ·
   
  </p>
</div>

<!-- ABOUT THE PROJECT -->

## 프로젝트 설명

피그마 및 기능 요청사항에 따른 게시판 CRUD와 D3.js를 사용한 데이터 시각화 그래프를 그리는 프로젝트입니다. DataBase는 Supabase를 사용하여 구현하였습니다.

## 결과물

![1](https://github.com/wkdrhkdwls/MiniIntern_weirdsector/assets/79461880/248890e1-4b26-45ce-9508-050db32ef7c0)
![2](https://github.com/wkdrhkdwls/MiniIntern_weirdsector/assets/79461880/2ad39c4e-7152-4a2f-8517-d5ee695681ae)
![3](https://github.com/wkdrhkdwls/MiniIntern_weirdsector/assets/79461880/304cc7ad-532f-4409-911f-87afcb31b03d)
![4](https://github.com/wkdrhkdwls/MiniIntern_weirdsector/assets/79461880/59c9f1f0-91a5-4489-a36e-11634991835d)
![5](https://github.com/wkdrhkdwls/MiniIntern_weirdsector/assets/79461880/c1294740-08fc-4872-b264-e35870338ccf)

### 주요 기능

- 게시판 CRUD (생성, 읽기, 삭제)
- 사용자 인증 및 권한 관리
- 게시물에 대한 댓글 및 대댓글 기능
- D3.js를 사용한 데이터 시각화 (라인 차트, 바 차트 등)

### 페이지 설명

### 사용된 기술 스택

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

### 피그마 디자인

프로젝트의 디자인 및 UI는 [피그마 디자인](https://www.figma.com/design/ryTkKUa4UaJOi3P4XhJoXT/%EA%B0%9C%EB%B0%9C%EC%9E%90-%EB%AF%B8%EB%8B%88%EC%9D%B8%ED%84%B4?node-id=1-31&t=yFluelPkO8kFenP0-0)을 참조하였습니다.

### 프로젝트 구조

```markdown
### 프로젝트 구조

Mini/
├── public/ # 정적 파일
│ ├── mockServiceWorker.js  
│ ├── routes.json  
│ └── vite.svg  
├── src/ # 소스 코드
│ ├── **test**/ # 테스트 파일
│ ├── assets/ # 이미지, 폰트 등 정적 자원
│ ├── components/ # React 컴포넌트
│ │ ├── Chart/ # 차트 컴포넌트
│ │ ├── Comment/ # 댓글 컴포넌트
│ │ ├── DashBoard/ # 대시보드 컴포넌트
│ │ ├── layout/ # 레이아웃 컴포넌트
│ │ ├── Login/ # 레이아웃 컴포넌트
│ │ ├── PostCreate/ # 게시물 작성 컴포넌트
│ │ ├── PostDetail/ # 게시물 내용 컴포넌트
│ │ ├── Reply/ # 댓글 컴포넌트
│ │ ├── SignUp/ # 회원가입 컴포넌트
│ │ └── ui/ # UI 관련 컴포넌트  
│ ├── hooks/ # 커스텀 훅
│ ├── lib/ # 라이브러리 및 헬퍼 함수
│ ├── mocks/ # 목킹 데이터 및 서버
│ ├── pages/ # 페이지 컴포넌트
│ │ ├── Chart/  
│ │ ├── common/  
│ │ ├── error/  
│ │ ├── home/  
│ │ ├── loading/  
│ │ ├── Login/  
│ │ ├── Post/  
│ │ │ ├── CreatePost/  
│ │ │ └── DetailPost/
│ │ ├── SignUp/  
│ │ └── SignUpComplete/  
│ ├── services/ # 서비스 API
│ │ ├── Comment/  
│ │ ├── DashBoard/  
│ │ └── Login/  
│ ├── store/ # 상태 관리 스토어
│ ├── styles/ # 스타일 파일
│ ├── type/ # 타입 정의
│ └── utils/ # 유틸리티 함수
│  
├── index.css # 전역 스타일 파일
├── main.tsx # 애플리케이션 진입점
├── router.tsx # 라우터 설정 파일
└── vite-env.d.ts # Vite 환경 변수 타입 정의 파일
```

## 설치 및 시작하기

### 1. 프로젝트 클론

```bash
[git clone https://github.com/wkdrhkdwls/MiniIntern_weirdsector.git](https://github.com/wkdrhkdwls/Board_Data-Visualization.git)
cd Mini
```

### 2. 패키지 설치

```bash
yarn install
```

### 3. 개발 서버 시작

```bash
yarn dev
```

### 4. 빌드

```bash
yarn build
```

### 5. 프리뷰

```bash
yarn preview
```

### 6. 테스트

```bash
yarn test
```

### 7. 환경변수 설정

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 8. 로그인 ID,PW

```
- test1@gmail.com
- testtest1
```

```
- test2@gmail.com
- testtest2
```
