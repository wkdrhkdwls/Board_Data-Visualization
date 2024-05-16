import { CommentType, ReplyType } from '@/type/Comment/comment';
import { CommentStoreDTO } from '@/type/Store/commentStore';
import { create } from 'zustand';

const useCommentStore = create<CommentStoreDTO>((set) => ({
  comments: [],
  setComments: (comments: CommentType[]) => set({ comments }),
  addComment: (comment: CommentType) =>
    set((state) => ({ comments: [...state.comments, { ...comment, replies: [] }] })), // replies 필드를 빈 배열로 초기화
  updateComment: (updatedComment: CommentType) =>
    set((state) => ({
      comments: state.comments.map((comment) =>
        comment.id === updatedComment.id ? updatedComment : comment,
      ),
    })),
  deleteComment: (commentId: number) =>
    set((state) => ({
      comments: state.comments.filter((comment) => comment.id !== commentId),
    })),
  addReply: (commentId: number, reply: ReplyType) =>
    set((state) => ({
      comments: state.comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, replies: [...(comment.replies || []), reply] }
          : comment,
      ),
    })),
  deleteReply: (commentId: number, replyId: number) =>
    set((state) => ({
      comments: state.comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, replies: comment.replies?.filter((reply) => reply.id !== replyId) || [] }
          : comment,
      ),
    })),
}));

export default useCommentStore;
