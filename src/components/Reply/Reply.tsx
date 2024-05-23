import { CommentReplySectionDTO } from '@/type/Comment/comment';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import DeleteModal from '@/utils/Modal/DeleteModal';
import useCommentStore from '@/store/commentStore';
import { useCommentActions } from '@/hooks/useComment';
import { useForm } from 'react-hook-form';
import { ReplyFormDataDTO } from '@/type/Comment/comment_reply';
import usePostStore from '@/store/postStore';
import ReplyForm from '@/components/Reply/ReplyForm';
import ReplyItem from '@/components/Reply/ReplyItem';

// 대댓글 작성 및 삭제 컴포넌트
const ReplySection = ({ commentId }: CommentReplySectionDTO) => {
  // 현재 로그인한 사용자의 ID 가져오기
  const { userId } = useAuth();
  // 댓글 상태 가져오기
  const { comments } = useCommentStore();

  // 게시글 ID 가져오기
  const { postId } = usePostStore();

  // 옵션 표시 상태를 관리
  const [showOptions, setShowOptions] = useState<Record<number, boolean>>({});

  // useForm 훅을 사용하여 폼 상태를 관리
  const { reset } = useForm<ReplyFormDataDTO>();

  // 댓글 관련 함수들 가져오기
  const {
    handleReplySubmit,
    handleDeleteReply,
    closeModal,
    setIsModalOpen,
    isModalOpen,
    selectedReplyId,
    setSelectedReplyId,
  } = useCommentActions(postId!);

  // 주어진 commentId에 해당하는 댓글 가져오기
  const comment = comments.find((c) => c.id === commentId);

  // 대댓글 삭제 모달 열기
  const openDeleteModal = (replyId: number) => {
    setSelectedReplyId(replyId);
    setIsModalOpen(true);
  };

  // 대댓글 작성 요청
  const onSubmit = async (data: { replyContent: string }) => {
    await handleReplySubmit(commentId, data.replyContent);
    reset();
  };

  const toggleOptions = (replyId: number) => {
    setShowOptions((prev) => ({ ...prev, [replyId]: !prev[replyId] }));
  };
  return (
    <div className="ml-4 mt-2 ">
      <ReplyForm onSubmit={onSubmit} />
      <div className="ml-4 mt-2 ">
        {comment?.replies?.map((reply) => (
          <ReplyItem
            key={reply.id}
            reply={reply}
            userId={userId}
            showOptions={showOptions}
            toggleOptions={toggleOptions}
            openDeleteModal={openDeleteModal}
          />
        ))}
      </div>

      <DeleteModal
        title="대댓글삭제"
        content="해당 대댓글을 삭제하시겠습니까?"
        modalOpen={isModalOpen}
        setModalOpen={setIsModalOpen}
        onClose={closeModal}
        onDelete={() => handleDeleteReply(commentId, selectedReplyId!)}
      />
    </div>
  );
};

export default ReplySection;
