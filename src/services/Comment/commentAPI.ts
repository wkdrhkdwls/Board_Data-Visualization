import { supabase } from '@/hooks/supabase';

// 댓글을 추가하는 함수
export const sendComment = async (nickname: string, content: string, dashboardId: number) => {
  const { data, error } = await supabase
    .from('comment')
    .insert([{ nickname, content, dashboard_id: dashboardId }]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// 특정 대시보드의 댓글을 가져오는 함수
export const getComments = async (dashboardId: number) => {
  const { data, error } = await supabase
    .from('comment')
    .select('id, nickname, content, created_at, user_id')
    .eq('dashboard_id', dashboardId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// 특정 댓글을 삭제하는 함수
export const removeCommentById = async (commentId: number): Promise<void> => {
  const { error } = await supabase.from('comment').delete().match({ id: commentId });
  if (error) throw new Error(error.message);
};
