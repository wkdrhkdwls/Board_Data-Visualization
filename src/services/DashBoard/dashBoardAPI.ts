import { supabase } from '@/hooks/supabase';
import { FetchDataDTo, PostCountByDateDTO, PostDTO } from '@/type/PostTable/DashBoard';

export type PostCreateDTO = Omit<PostDTO, 'id' | 'created_at' | 'user_id'>;

// 특정 ID의 게시물을 불러오는 함수
export const getPostById = async (postId: number): Promise<PostDTO> => {
  const { data, error } = await supabase.from('dashboard').select('*').eq('id', postId).single();

  if (error) throw new Error(error.message);
  return data;
};

// 특정 ID의 게시물을 삭제하는 함수
export const removePost = async (postId: number): Promise<void> => {
  const { error } = await supabase.from('dashboard').delete().match({ id: postId });
  if (error) throw new Error(error.message);
};

// 게시물을 생성하는 함수
export const createPost = async (postData: PostCreateDTO): Promise<PostDTO> => {
  const { data, error } = await supabase.from('dashboard').insert([postData]).single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// 페이지 번호화 페이지 크기에 따라 게시물을 가져오는 함수
export const getPosts = async (page: number, pageSize: number): Promise<FetchDataDTo> => {
  const from = (page - 1) * pageSize;
  const to = page * pageSize - 1;
  const { data, error, count } = await supabase
    .from('dashboard')
    .select('*', { count: 'exact' })
    .order('id', { ascending: false })
    .range(from, to);

  if (error) throw new Error(error.message);
  return { posts: data || [], total: count || 0 };
};

// 날짜별로 그룹화된 게시물 데이터를 가져오는 함수
export const getPostsGroupedByDate = async (): Promise<PostCountByDateDTO[]> => {
  const { data, error } = await supabase.from('dashboard').select('created_at');

  if (error) throw new Error(error.message);

  // 클라이언트 측에서 데이터 그룹화 및 집계 수행
  const groupedData: Record<string, number> = {};

  data.forEach((item: { created_at: string }) => {
    const date = item.created_at.split('T')[0];
    if (groupedData[date]) {
      groupedData[date]++;
    } else {
      groupedData[date] = 1;
    }
  });

  return Object.keys(groupedData).map((date) => ({
    date,
    count: groupedData[date],
  }));
};
