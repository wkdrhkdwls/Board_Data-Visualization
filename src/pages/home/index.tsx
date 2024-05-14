import Layout from '@/components/layout/layout';
import { DashBoardTable } from '@/utils/DashBoardTable';
import { useQuery } from '@tanstack/react-query';
import DashBoardHeader from '@/components/DashBoard/DashBoardHeader';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/useAuth';
import usePageStore from '@/store/page';
import { fetchPosts } from '@/services/DashBoard/dashBoardAPI';

const pageSize = 10;

function Home() {
  // 현재 페이지 상태관리
  const { currentPage, setCurrentPage } = usePageStore();
  const { accessToken } = useAuth();
  //naviagte
  const navigate = useNavigate();
  //toast 불러오기
  const { toast } = useToast();

  // React Query를 사용하여 데이터 가져오기 및 캐싱
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard', currentPage],
    queryFn: () => fetchPosts(currentPage, pageSize),
    placeholderData: (previousData) => previousData, //이전 데이터 유지
    staleTime: 1000 * 60 * 5, // refresh 5분
    gcTime: 10 * 60 * 1000, //캐시 테이터 10분
  });

  // 전체 페이지 수 계산
  const totalPages = data ? Math.ceil(data.total / pageSize) : 0;

  // 이전 페이지
  const handlePrevious = () => setCurrentPage(Math.max(currentPage - 1, 1));
  // 다음 페이지
  const handleNext = () => setCurrentPage(Math.min(currentPage + 1, totalPages));
  // 글쓰기 페이지 이동
  const handleCreatePost = () => {
    if (!accessToken) {
      toast({
        title: '로그인이 필요합니다.',
        duration: 3000,
      });
      navigate('/login');
    } else {
      navigate('/create-post');
    }
  };
  const goPostDetail = (postId: number) => {
    navigate(`/post/${postId}`);
  };
  return (
    <Layout>
      <div className="my-10">
        <DashBoardHeader />
        <div className="relative mx-[390px] mobile:mx-2 tablet:mx-[20px] flex justify-center flex-col">
          <DashBoardTable
            posts={data?.posts || []}
            totalPages={totalPages}
            currentPage={currentPage}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            setCurrentPage={setCurrentPage}
            goPostDetail={goPostDetail}
            isLoading={isLoading}
          />
          <Button onClick={handleCreatePost} className="absolute -bottom-2 right-5 w-24">
            글쓰기
          </Button>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
