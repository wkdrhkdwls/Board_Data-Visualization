import { PostDTO } from '@/type/PostTable/DashBoard';
import { TagDataDTO } from '@/type/Utils/GroupByTag';

export const groupDataByTag = (posts: PostDTO[]): TagDataDTO[] => {
  const groupedData: Record<string, number> = {};

  posts.forEach((post) => {
    post.hashtags.forEach((tag) => {
      if (groupedData[tag]) {
        groupedData[tag]++;
      } else {
        groupedData[tag] = 1;
      }
    });
  });

  return Object.keys(groupedData).map((tag) => ({
    tag,
    count: groupedData[tag],
  }));
};
