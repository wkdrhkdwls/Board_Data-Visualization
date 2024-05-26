import Layout from '@/components/layout/layout';

import { useQuery } from '@tanstack/react-query';
import DashBoardHeader from '@/components/DashBoard/DashBoardHeader';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/useAuth';
import usePageStore from '@/store/pageStore';
import { getDashBoardTypePosts } from '@/services/DashBoard/dashBoardAPI';
import DashBoardTable from '@/components/DashBoard/DashBoardTable';
import { useEffect, useState } from 'react';

const pageSize = 10;

const Home = () => {
  const { currentPage, setCurrentPage } = usePageStore();
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [totalPages, setTotalPages] = useState(0);
  const [selectedBoard, setSelectedBoard] = useState<string>(() => {
    const saved = sessionStorage.getItem('selectedBoard');
    return saved ? saved : '자유 게시판';
  });

  console.log('selectedBoard', selectedBoard);

  const { data, isLoading } = useQuery({
    queryKey: ['dashboard', currentPage, selectedBoard],
    queryFn: () => getDashBoardTypePosts(currentPage, pageSize, selectedBoard),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5,
    gcTime: 10 * 60 * 1000,
  });

  useEffect(() => {
    if (data) {
      setTotalPages(Math.ceil(data.total / pageSize));
    }
  }, [data]);

  const handlePrevious = () => setCurrentPage(Math.max(currentPage - 1, 1));
  const handleNext = () => setCurrentPage(Math.min(currentPage + 1, totalPages));
  const handleCreatePost = () => {
    if (!accessToken) {
      toast({ title: '로그인이 필요합니다.', duration: 3000 });
      navigate('/login');
    } else {
      navigate('/create-post');
    }
  };
  const goPostDetail = (postId: number) => navigate(`/post/${postId}`);

  const handleBoardSelect = (board: string) => {
    setSelectedBoard(board);
    setCurrentPage(1);
  };

  useEffect(() => {
    sessionStorage.setItem('selectedBoard', selectedBoard);
  }, [selectedBoard]);

  return (
    <Layout>
      <div className="my-10">
        <DashBoardHeader selectedBoard={selectedBoard} onBoardSelect={handleBoardSelect} />
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
          <Button
            onClick={handleCreatePost}
            className="absolute -bottom-2 mobile:-bottom-10 right-5 w-24"
          >
            글쓰기
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
