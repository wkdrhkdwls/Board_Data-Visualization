import { supabase } from '@/hooks/supabase';
import { CommentType } from '@/type/Comment/comment';

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
export const getComments = async (dashboardId: number): Promise<CommentType[]> => {
  const { data, error } = await supabase
    .from('comment')
    .select('id, nickname, content, created_at, user_id, dashboard_id')
    .eq('dashboard_id', dashboardId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  // `dashboard_id`를 `post_id`로 매핑
  return data.map((comment) => ({
    ...comment,
    post_id: comment.dashboard_id,
  }));
};

// 특정 댓글을 삭제하는 함수
export const removeCommentById = async (commentId: number): Promise<void> => {
  const { error } = await supabase.from('comment').delete().match({ id: commentId });
  if (error) throw new Error(error.message);
};
