import { CommentType, ReplyType } from '@/type/Comment/comment';
import { CommentStoreDTO } from '@/type/Store/commentStore';
import { create } from 'zustand';

const useCommentStore = create<CommentStoreDTO>((set) => ({
  // 초기 댓글 목록
  comments: [],

  // 댓글 목록을 설정하는 함수
  setComments: (comments: CommentType[]) => set({ comments }),

  // 새로운 댓글을 추가하는 함수 (replies 필드를 빈 배열로 초기화)
  addComment: (comment: CommentType) =>
    set((state) => ({ comments: [...state.comments, { ...comment, replies: [] }] })),

  // 댓글을 업데이트하는 함수
  updateComment: (updatedComment: CommentType) =>
    set((state) => ({
      comments: state.comments.map((comment) =>
        comment.id === updatedComment.id ? updatedComment : comment,
      ),
    })),

  // 댓글을 삭제하는 함수
  deleteComment: (commentId: number) =>
    set((state) => ({
      comments: state.comments.filter((comment) => comment.id !== commentId),
    })),

  // 대댓글을 추가하는 함수
  addReply: (commentId: number, reply: ReplyType) =>
    set((state) => ({
      comments: state.comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, replies: [...(comment.replies || []), reply] }
          : comment,
      ),
    })),

  // 대댓글을 삭제하는 함수
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
