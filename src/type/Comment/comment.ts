export type CommentType = {
  id: number;
  nickname: string;
  content: string;
  created_at: string;
  replies?: ReplyType[];
  user_id: string;
};

type ReplyType = {
  id: number;
  nickname: string;
  content: string;
  created_at: string;
  comment_id: number;
};

export type CommentReplySectionDTO = {
  commentId: number;
  replies: any[];
  onSubmitReply: (commentId: number, content: string, userId: string) => Promise<void>;
  onDeleteReply: () => void;
};
