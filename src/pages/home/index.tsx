import { useState } from 'react';
import Layout from '@/components/layout/layout';
import { DashBoardTable } from '@/utils/DashBoardTable';
import { createClient } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';
import { FetchDataDTo } from '@/type/PostTable/DashBoard';

// Supabase 연결 설정
const supabaseURL = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseURL, supabaseKey);
const pageSize = 10;

function Home() {
  // 현재 페이지 상태관리
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Supabase에서 posts 데이터를 가져오는 함수
  const fetchPosts = async (page: number): Promise<FetchDataDTo> => {
    const from = (page - 1) * pageSize;
    const to = page * pageSize - 1;
    const { data, error, count } = await supabase
      .from('post')
      .select('*', { count: 'exact' })
      .range(from, to);

    if (error) throw new Error(error.message);
    return { posts: data || [], total: count || 0 };
  };

  // React Query를 사용하여 데이터 가져오기 및 캐싱
  const { data } = useQuery({
    queryKey: ['posts', currentPage],
    queryFn: () => fetchPosts(currentPage),
  });

  // 전체 페이지 수 계산
  const totalPages = data ? Math.ceil(data.total / pageSize) : 0;

  // 이전 페이지
  const handlePrevious = () => setCurrentPage((old) => Math.max(old - 1, 1));
  // 다음 페이지
  const handleNext = () => setCurrentPage((old) => Math.min(old + 1, totalPages));

  return (
    <Layout>
      <div className="mx-[390px] mobile:mx-2 tablet:mx-[20px] flex justify-center flex-col">
        <DashBoardTable
          posts={data?.posts || []}
          totalPages={totalPages}
          currentPage={currentPage}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </Layout>
  );
}

export default Home;
