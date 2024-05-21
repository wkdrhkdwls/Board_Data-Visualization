import { PostDTO } from '@/type/PostTable/DashBoard';
import { TagDataDTO } from '@/type/Utils/GroupByTag';

// 게시물 데이터를 태그별로 그룹화하는 함수
export const groupDataByTag = (posts: PostDTO[]): TagDataDTO[] => {
  // 태그별 게시물 수를 저장할 객체
  const groupedData: Record<string, number> = {};

  // 각 게시물의 태그를 순회하며 그룹화
  posts.forEach((post) => {
    post.hashtags.forEach((tag) => {
      if (groupedData[tag]) {
        // 태그가 이미 존재하면 카운트 증가
        groupedData[tag]++;
      } else {
        // 태그가 존재하지 않으면 초기값 1로 설정
        groupedData[tag] = 1;
      }
    });
  });

  // 그룹화된 데이터를 태그와 카운트를 포함한 배열로 변환하여 반환
  return Object.keys(groupedData).map((tag) => ({
    tag,
    count: groupedData[tag],
  }));
};
