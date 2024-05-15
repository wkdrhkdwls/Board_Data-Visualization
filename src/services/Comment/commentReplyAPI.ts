import { supabase } from '@/hooks/supabase';

export const fetchCommentReplies = async (commentId: number) => {
  const { data, error } = await supabase
    .from('comment_reply')
    .select('*')
    .eq('comment_id', commentId);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const sendCommentReply = async (nickname: string, content: string, commentId: number) => {
  const { data, error } = await supabase
    .from('comment_reply')
    .insert([{ nickname, content, comment_id: commentId }]);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const deleteCommentReplies = async (commentId: number): Promise<void> => {
  const { error } = await supabase.from('comment_reply').delete().match({ comment_id: commentId });
  if (error) throw new Error(error.message);
};
