import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import usePostStore from '@/store/postStore';
import DeleteModal from '@/utils/Modal/DeleteModal';
import { useCommentActions } from '@/hooks/useComment';
import { useForm } from 'react-hook-form';
import { CommentFormDataDTO } from '@/type/Comment/comment';
import CommentItem from './CommentItem';

// 댓글 컴포넌트
const CommentSection = () => {
  // 게시물 ID 가져오기
  const { postId } = usePostStore();

  // 현재 로그인한 사용자의 ID 가져오기
  const { userId } = useAuth();

  // 댓글관련 함수 가져오기
  const {
    comments, // 댓글 목록
    isModalOpen, // 모달이 열려 있는지 여부
    closeModal, // 모달 닫기 함수
    setIsModalOpen, // 모달 열기 함수
    setSelectedCommentId, // 선택된 댓글 ID 설정 함수
    loadComments, // 댓글 불러오기 함수
    handleCommentSubmit, // 댓글 제출 함수
    handleDeleteComment, // 댓글 삭제 함수
  } = useCommentActions(postId!);

  // useForm 훅을 사용하여 폼 상태를 관리
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormDataDTO>();

  // 댓글 작성
  const onSubmit = async (data: { content: string }) => {
    await handleCommentSubmit(data.content);
    reset();
  };

  // 삭제 모달 열기
  const openDeleteModal = (commentId: number) => {
    setSelectedCommentId(commentId);
    setIsModalOpen(true);
  };

  // 컴포넌트가 마운트되면 댓글 불러오기
  useEffect(() => {
    loadComments();
  }, [postId, loadComments]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row h-[55px] justify-between gap-x-4">
          <Input className="w-full" {...register('content', { required: '댓글을 입력하세요' })} />
          <Button type="submit">댓글작성</Button>
        </div>
        {errors.content && <p className="text-red-500">{errors.content.message}</p>}
      </form>
      <div>
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            userId={userId}
            openDeleteModal={openDeleteModal}
          />
        ))}
      </div>

      <DeleteModal
        title="댓글삭제"
        content="해당 댓글을 삭제하시겠습니까?"
        modalOpen={isModalOpen}
        setModalOpen={setIsModalOpen}
        onClose={closeModal}
        onDelete={handleDeleteComment}
      />
    </div>
  );
};

export default CommentSection;
