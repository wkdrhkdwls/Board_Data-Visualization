import { PostStackChartDTO, StackedData, StackedDataDTO } from '@/type/Chart/Chart';

export const transformData = (posts: PostStackChartDTO[]): StackedDataDTO[] => {
  const result: Record<string, StackedData> = {};

  posts.forEach((post) => {
    const date = post.created_at.toISOString().split('T')[0];
    if (!result[date]) {
      result[date] = { date, 자유게시판: 0, 질문게시판: 0, 기타게시판: 0 };
    }

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

  // 날짜순으로 정렬
  return Object.values(result).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
};
