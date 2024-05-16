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

export const sendCommentReply = async (
  nickname: string,
  content: string,
  commentId: number,
  userId: string,
) => {
  const { data, error } = await supabase
    .from('comment_reply')
    .insert([{ nickname, content, comment_id: commentId, user_id: userId }]);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const deleteCommentReplyById = async (replyId: number): Promise<void> => {
  const { error } = await supabase.from('comment_reply').delete().match({ id: replyId });
  if (error) {
    throw new Error(error.message);
  }
};
