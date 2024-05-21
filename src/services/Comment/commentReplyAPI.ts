import { supabase } from '@/hooks/supabase';

// 대댓글 가져오기
export const getCommentReplies = async (commentId: number) => {
  const { data, error } = await supabase
    .from('comment_reply')
    .select('*')
    .eq('comment_id', commentId);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// 대댓글 추가
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

// 대댓글 삭제
export const removeCommentReplyById = async (replyId: number): Promise<void> => {
  const { error } = await supabase.from('comment_reply').delete().match({ id: replyId });
  if (error) {
    throw new Error(error.message);
  }
};
