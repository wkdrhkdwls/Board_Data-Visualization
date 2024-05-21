import { PostStackChartDTO, StackedData, StackedDataDTO } from '@/type/Chart/Chart';

// 게시물 데이터를 변환하여 스택형 차트 데이터 형식으로 변환하는 함수
export const transformData = (posts: PostStackChartDTO[]): StackedDataDTO[] => {
  // 결과를 저장할 객체 생성
  const result: Record<string, StackedData> = {};

  // 각 게시물을 순회하며 날짜별로 그룹화
  posts.forEach((post) => {
    const date = post.created_at.toISOString().split('T')[0];

    // 날짜가 존재하지 않으면 초기값 설정
    if (!result[date]) {
      result[date] = { date, 자유게시판: 0, 질문게시판: 0, 기타게시판: 0 };
    }

    // 게시물의 게시판 유형에 따라 카운트 증가
    switch (post.boardType.trim()) {
      case '자유 게시판':
        result[date].자유게시판 += 1;
        break;
      case '질문 게시판':
        result[date].질문게시판 += 1;
        break;
      default:
        result[date].기타게시판 += 1;
        break;
    }
  });

  // 결과를 날짜순으로 정렬하여 반환
  return Object.values(result).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
};
