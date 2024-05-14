import { supabase } from '@/hooks/supabase';

export const sendComment = async (
  nickname: string,
  content: string,
  dashboardId: number,
  userId: string,
) => {
  const { data, error } = await supabase
    .from('comment')
    .insert([{ nickname, content, dashboard_id: dashboardId, user_id: userId }]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const fetchComments = async (dashboardId: number) => {
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

export const deleteCommentById = async (commentId: number): Promise<void> => {
  const { error } = await supabase.from('comment').delete().match({ id: commentId });
  if (error) throw new Error(error.message);
};
