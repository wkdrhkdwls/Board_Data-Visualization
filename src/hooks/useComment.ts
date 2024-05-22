import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import useCommentStore from '@/store/commentStore';
import { useAuth } from '@/hooks/useAuth';
import { sendComment, getComments, removeCommentById } from '@/services/Comment/commentAPI';
import {
  sendCommentReply,
  getCommentReplies,
  removeCommentReplyById,
} from '@/services/Comment/commentReplyAPI';
import { CommentType } from '@/type/Comment/comment';
import { useQuery } from '@tanstack/react-query';

// 댓글 관련 훅
export const useCommentActions = (postId: number) => {
  // 현재 로그인한 사용자 정보 가져오기
  const { nickname, accessToken } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // 댓글 상태와 액션을 zusCommentStore에서 가져오기
  const { comments, setComments, addComment, deleteComment, addReply, deleteReply } =
    useCommentStore();
  // 모달 상태와 선택된 댓글, 대댓글의 ID 상태
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(null);
  const [selectedReplyId, setSelectedReplyId] = useState<number | null>(null);

  // 대댓글 입력창 표시 상태와 대댓글 옵션 표시 상태
  const [showOptions, setShowOptions] = useState<Record<number, boolean>>({});
  const [replyVisibility, setReplyVisibility] = useState<Record<number, boolean>>({});

  // 모달 닫기
  const closeModal = () => {
    setModalOpen(false);
    setSelectedReplyId(null);
  };

  // 댓글, 대댓글 데이터를 가져오기 위한 쿼리 설정
  const { data, refetch } = useQuery({
    queryKey: ['comments', postId],
    queryFn: async () => {
      const commentsData: CommentType[] = await getComments(postId);
      for (const comment of commentsData) {
        comment.replies = await getCommentReplies(comment.id);
      }
      return commentsData;
    },
    enabled: !!postId,
    staleTime: 1000 * 60 * 5, // refresh 5분
    gcTime: 10 * 60 * 1000, // 캐시 데이터 10분
  });

  // 댓글 데이터가 변경될 때 상태를 업데이트
  useEffect(() => {
    if (data) {
      setComments(data);
    }
  }, [data, setComments]);

  // 댓글 작성
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
      const newComment = await sendComment(nickname, content, postId);
      if (newComment) {
        addComment(newComment);
      }
      refetch();
    } catch (error: any) {
      console.error('Error sending comment:', error.message);
    }
  };

  // 대댓글 작성
  const handleReplySubmit = async (commentId: number, content: string) => {
    if (!accessToken) {
      toast({
        title: '로그인이 필요합니다.',
        duration: 3000,
      });
      navigate('/login');
      return;
    }
    try {
      const newReply = await sendCommentReply(nickname, content, commentId);
      if (newReply) {
        addReply(commentId, newReply);
      }
      refetch();
    } catch (error: any) {
      console.error('Error sending reply:', error.message);
    }
  };

  // 댓글 삭제
  const handleDeleteComment = async () => {
    if (selectedCommentId !== null) {
      try {
        await removeCommentById(selectedCommentId);
        deleteComment(selectedCommentId);
        setModalOpen(false);
        refetch();
      } catch (error: any) {
        console.error('Error deleting comment:', error.message);
      }
    }
  };

  // 대댓글 삭제
  const handleDeleteReply = async (commentId: number, replyId: number) => {
    try {
      await removeCommentReplyById(replyId);
      deleteReply(commentId, replyId);
      setModalOpen(false);
      refetch();

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

  // 대댓글 입력창 토글
  const toggleReplyInput = (commentId: number) => {
    setReplyVisibility((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  // 대댓글 옵션 토글
  const toggleOptions = (commentId: number) => {
    setShowOptions((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  return {
    comments,
    isModalOpen,
    closeModal,
    setModalOpen,
    setSelectedCommentId,
    setSelectedReplyId,
    selectedReplyId,
    showOptions,
    replyVisibility,
    loadComments: refetch,
    handleCommentSubmit,
    handleReplySubmit,
    handleDeleteComment,
    handleDeleteReply,
    toggleReplyInput,
    toggleOptions,
  };
};
