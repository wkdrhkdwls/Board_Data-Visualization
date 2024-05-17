import LineChart from '@/components/Chart/LineChart';
import BlockChart from '@/components/Chart/BlockChart';
import StackedBarChart from '@/components/Chart/StackChart';
import { fetchPosts, fetchPostsGroupedByDate } from '@/services/DashBoard/dashBoardAPI';
import { groupDataByTag } from '@/utils/GroupByTag';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { stackedData } from '@/fixture/stackData';
import { DatePickerWithRange } from '@/components/ui/dateRangePicker';
import { useQuery } from '@tanstack/react-query';

const ChartPage = () => {
  // useAuth 훅을 사용하여 닉네임 가져오기
  const { nickname } = useAuth();
  const navigate = useNavigate();

  // 날짜별 게시물 수 데이터 쿼리
  const { data: lineData } = useQuery({
    queryKey: ['postsGroupedByDate'],
    queryFn: fetchPostsGroupedByDate,
    staleTime: 1000 * 60 * 5, // 5분 동안 캐싱된 데이터 사용
  });

  // 모든 게시물 가져오기 쿼리
  const { data: allPostsData } = useQuery({
    queryKey: ['allPosts', 1, 100],
    queryFn: () => fetchPosts(1, 100),
    staleTime: 1000 * 60 * 5, // 5분 동안 캐싱된 데이터 사용
  });

  // 태그별 게시물 수 데이터 생성
  const blockData = allPostsData ? groupDataByTag(allPostsData.posts) : [];

  // 홈으로 이동
  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-white">
      <aside className="w-64 bg-white border-r border-gray-200">
        <div className="flex flex-col items-start pl-8 mt-7 py-4">
          <p className="bg-white text-2xl font-bold text-[#ee3918] z-10">Testsite</p>
          <nav className="mt-8">
            <ul>
              <li className="mb-4">
                <button onClick={handleHome} className="text-lg font-medium text-gray-700">
                  테스트 대시보드
                </button>
              </li>
              <li>
                <button className="text-lg font-medium text-[#ee3918]">기본 대시보드</button>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      <div className="flex-1 overflow-hidden">
        <header className="flex justify-between items-center border-b border-gray-200 px-4 py-2">
          <div className="text-xl font-bold">기본 대시보드</div>
          <div>
            {nickname ? (
              <Button className="text-lg bg-white font-bold text-[#272727] pointer-events-none">
                {nickname}
              </Button>
            ) : (
              <Button
                // onClick={handleLogin}
                className="text-lg bg-white font-bold text-[#272727] border-[1px] border-[#E1E1E1]"
              >
                로그인
              </Button>
            )}
          </div>
        </header>
        <div className="p-3">
          <DatePickerWithRange />
        </div>

        <div className="p-4  grid grid-cols-2 gap-4 tablet:flex tablet:flex-col">
          <LineChart campaign={lineData || []} />
          <BlockChart data={blockData} />
          <StackedBarChart data={stackedData} />
        </div>
      </div>
    </div>
  );
};

export default ChartPage;
