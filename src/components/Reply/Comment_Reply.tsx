import { CommentReplySectionDTO } from '@/type/Comment/comment';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatDate } from '@/utils/changeDateTime';
import { useAuth } from '@/hooks/useAuth';
import DeleteModal from '@/utils/Modal/DeleteModal';
import { EllipsisVertical, CornerDownRight } from 'lucide-react';
import useCommentStore from '@/store/commentStore';
import { useCommentActions } from '@/hooks/useComment';
import { useForm } from 'react-hook-form';
import { ReplyFormDataDTO } from '@/type/Comment/comment_reply';
import usePostStore from '@/store/postStore';

// 대댓글 작성 및 삭제 컴포넌트
const CommentReplySection = ({ commentId }: CommentReplySectionDTO) => {
  // 현재 로그인한 사용자의 ID 가져오기
  const { userId } = useAuth();
  // 댓글 상태 가져오기
  const { comments } = useCommentStore();

  // 게시글 ID 가져오기
  const { postId } = usePostStore();

  // 옵션 표시 상태를 관리
  const [showOptions, setShowOptions] = useState<Record<number, boolean>>({});

  // useForm 훅을 사용하여 폼 상태를 관리
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReplyFormDataDTO>();

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
  return (
    <div className="ml-4 mt-2 ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row h-[55px] justify-between gap-x-4">
          <Input
            className="w-full mb-4"
            {...register('replyContent', { required: '답글을 입력하세요' })}
          />
          <Button type="submit">답글 작성</Button>
        </div>
        {errors.replyContent && (
          <p className="text-red-500">{String(errors.replyContent.message)}</p>
        )}
      </form>
      <div className="ml-4 mt-2 ">
        {comment?.replies?.map((reply) => (
          <div key={reply.id} className="my-4 py-4 gap-y-2 flex flex-col">
            <p>
              <CornerDownRight />
            </p>
            <div className="flex flex-row justify-between">
              <p className="font-bold">{reply.nickname}</p>
              {reply.user_id === userId && (
                <div className="relative inline-block">
                  <button
                    onClick={() =>
                      setShowOptions((prev) => ({ ...prev, [reply.id]: !prev[reply.id] }))
                    }
                  >
                    <EllipsisVertical />
                  </button>
                  {showOptions[reply.id] && (
                    <ul className="absolute right-0 top-full mt-2 w-[112px] bg-white shadow-lg rounded-lg p-2 z-50">
                      <li className="p-2 cursor-pointer">수정</li>
                      <li className="p-2 cursor-pointer" onClick={() => openDeleteModal(reply.id)}>
                        삭제
                      </li>
                    </ul>
                  )}
                </div>
              )}
            </div>
            <p>{reply.content}</p>
            <p className="text-sm text-gray-500">{formatDate(reply.created_at)}</p>
          </div>
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

export default CommentReplySection;
