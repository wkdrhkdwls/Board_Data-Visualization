import BlockChart from '@/components/Chart/TagPostChart';
import StackedBarChart from '@/components/Chart/StackChart';
import { getPosts, getPostsGroupedByDate } from '@/services/DashBoard/dashBoardAPI';
import { groupDataByTag } from '@/utils/GroupByTag';
import { DatePickerWithRange } from '@/components/ui/dateRangePicker';
import { useQuery } from '@tanstack/react-query';
import { transformData } from '@/utils/transformData';
import { PostStackChartDTO } from '@/type/Chart/Chart';
import DatePostsLineChart from '@/components/Chart/DatePostChart';
import ChartSideBar from '@/components/Chart/ChartSidebar';
import ChartHeader from '@/components/Chart/ChartHeader';

const ChartPage: React.FC = () => {
  // 날짜별 게시물 수 데이터 쿼리
  const { data: lineData } = useQuery({
    queryKey: ['postsGroupedByDate'],
    queryFn: getPostsGroupedByDate,
    staleTime: 1000 * 60 * 5,
  });

  // 모든 게시물 데이터 쿼리
  const { data: allPostsData } = useQuery({
    queryKey: ['allPosts', 1, 100],
    queryFn: () => getPosts(1, 100),
    staleTime: 1000 * 60 * 5,
  });

  // 게시물 데이터를 태그별로 그룹화
  const { data: stackedData } = useQuery({
    queryKey: ['stackedData', allPostsData],
    queryFn: () => {
      const posts: PostStackChartDTO[] =
        allPostsData?.posts.map((post) => ({
          created_at: new Date(post.created_at),
          boardType: post.boardType,
        })) || [];
      return transformData(posts);
    },
    enabled: !!allPostsData,
    staleTime: 1000 * 60 * 5,
  });

  // 태그별로 그룹화된 데이터를 차트에 맞게 변환
  const blockData = allPostsData ? groupDataByTag(allPostsData.posts) : [];

  return (
    <div className="flex min-h-screen bg-white">
      <ChartSideBar />

      <div className="flex-1 overflow-hidden">
        <ChartHeader />
        <div className="p-3">
          <DatePickerWithRange />
        </div>

        <div className="p-4  grid grid-cols-2 gap-4 tablet:flex tablet:flex-col">
          <DatePostsLineChart dateData={lineData || []} />
          <BlockChart data={blockData} />
          <StackedBarChart data={stackedData || []} />
        </div>
      </div>
    </div>
  );
};

export default ChartPage;
