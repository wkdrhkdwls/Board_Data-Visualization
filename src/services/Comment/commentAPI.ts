import { supabase } from '@/hooks/supabase';

export const sendComment = async (nickname: string, content: string, dashboardId: number) => {
  const { data, error } = await supabase
    .from('comment')
    .insert([{ nickname, content, dashboard_id: dashboardId }]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const fetchComments = async (dashboardId: number) => {
  const { data, error } = await supabase
    .from('comment')
    .select('id, nickname, content, created_at')
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
