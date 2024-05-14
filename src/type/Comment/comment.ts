export type CommentType = {
  id: number;
  nickname: string;
  content: string;
  created_at: string;
  replies?: ReplyType[];
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
  onSubmitReply: (commentId: number, content: string) => Promise<void>;
};
