import { CommentType, ReplyType } from '@/type/Comment/comment';

export type CommentStoreDTO = {
  comments: CommentType[];
  setComments: (comments: CommentType[]) => void;
  addComment: (comment: CommentType) => void;
  updateComment: (updatedComment: CommentType) => void;
  deleteComment: (commentId: number) => void;
  addReply: (commentId: number, reply: ReplyType) => void; // 여기서 reply 타입을 ReplyType으로 변경
  deleteReply: (commentId: number, replyId: number) => void;
};
