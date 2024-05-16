export type CommentType = {
  id: number;
  nickname: string;
  content: string;
  created_at: string;
  replies?: ReplyType[];
  user_id: string;
};

export type ReplyType = {
  id: number;
  nickname: string;
  content: string;
  created_at: string;
  comment_id: number;
  user_id: string;
};

export type CommentReplySectionDTO = {
  commentId: number;
};

export type CommentFormDataDTO = {
  content: string;
};
