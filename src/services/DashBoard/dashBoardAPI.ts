import { supabase } from '@/hooks/supabase';
import { FetchDataDTo, PostDTO } from '@/type/PostTable/DashBoard';

export type PostCreateDTO = Omit<PostDTO, 'id' | 'created_at'>;

export const fetchPostById = async (postId: number): Promise<PostDTO> => {
  const { data, error } = await supabase.from('dashboard').select('*').eq('id', postId).single();

  if (error) throw new Error(error.message);
  return data;
};

export const deletePost = async (postId: number): Promise<void> => {
  const { error } = await supabase.from('dashboard').delete().match({ id: postId });
  if (error) throw new Error(error.message);
};

export const createPost = async (postData: PostCreateDTO): Promise<PostDTO> => {
  const { data, error } = await supabase.from('dashboard').insert([postData]).single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const fetchPosts = async (page: number, pageSize: number): Promise<FetchDataDTo> => {
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
