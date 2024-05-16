import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import useCommentStore from '@/store/commentStore';
import { useAuth } from '@/hooks/useAuth';
import { sendComment, deleteCommentById, fetchComments } from '@/services/Comment/commentAPI';
import {
  sendCommentReply,
  fetchCommentReplies,
  deleteCommentReplyById,
} from '@/services/Comment/commentReplyAPI';
import { CommentType } from '@/type/Comment/comment';

export const useCommentActions = (postId: number) => {
  const { nickname, accessToken, userId } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { comments, setComments, addComment, deleteComment, addReply, deleteReply } =
    useCommentStore();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(null);

  const [showOptions, setShowOptions] = useState<Record<number, boolean>>({});
  const [replyVisibility, setReplyVisibility] = useState<Record<number, boolean>>({});

  const closeModal = () => setModalOpen(false);

  const loadComments = async () => {
    try {
      const data: CommentType[] = await fetchComments(postId);
      for (const comment of data) {
        comment.replies = await fetchCommentReplies(comment.id);
      }
      setComments(data);
    } catch (error: any) {
      console.error('Error fetching comments:', error.message);
    }
  };

  const handleCommentSubmit = async (content: string) => {
    if (!accessToken) {
      toast({
        title: '로그인이 필요합니다.',
        duration: 3000,
      });
      navigate('/login');
      return;
    }
    try {
      const newComment = await sendComment(nickname, content, postId, userId!);
      if (newComment) {
        addComment(newComment);
      }
      loadComments();
    } catch (error: any) {
      console.error('Error sending comment:', error.message);
    }
  };

  const handleReplySubmit = async (commentId: number, content: string) => {
    try {
      const newReply = await sendCommentReply(nickname, content, commentId, userId!);
      if (newReply) {
        addReply(commentId, newReply);
      }
    } catch (error: any) {
      console.error('Error sending reply:', error.message);
    }
  };

  const handleDeleteComment = async () => {
    if (selectedCommentId !== null) {
      try {
        await deleteCommentById(selectedCommentId);
        deleteComment(selectedCommentId);
        setModalOpen(false);
      } catch (error: any) {
        console.error('Error deleting comment:', error.message);
      }
    }
  };

  const handleDeleteReply = async (commentId: number, replyId: number) => {
    try {
      await deleteCommentReplyById(replyId);
      deleteReply(commentId, replyId);
      setModalOpen(false);

      toast({
        title: '대댓글 삭제 성공',
        duration: 3000,
      });
    } catch (error: any) {
      console.error('Error deleting reply:', error.message);
      toast({
        variant: 'destructive',
        title: '대댓글 삭제에 실패했습니다.',
        description: error.message,
        duration: 3000,
      });
    }
  };

  const toggleReplyInput = (commentId: number) => {
    setReplyVisibility((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const toggleOptions = (commentId: number) => {
    setShowOptions((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  return {
    comments,
    isModalOpen,
    closeModal,
    setModalOpen,
    setSelectedCommentId,
    showOptions,
    replyVisibility,
    loadComments,
    handleCommentSubmit,
    handleReplySubmit,
    handleDeleteComment,
    handleDeleteReply,
    toggleReplyInput,
    toggleOptions,
  };
};
