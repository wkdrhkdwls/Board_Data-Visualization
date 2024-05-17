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

const CommentReplySection = ({ commentId }: CommentReplySectionDTO) => {
  const { userId } = useAuth();
  const { comments } = useCommentStore();
  const { postId } = usePostStore();

  const [showOptions, setShowOptions] = useState<Record<number, boolean>>({});

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReplyFormDataDTO>();

  const {
    handleReplySubmit,
    handleDeleteReply,
    closeModal,
    setModalOpen,
    isModalOpen,
    selectedReplyId,
    setSelectedReplyId,
  } = useCommentActions(postId!);

  const comment = comments.find((c) => c.id === commentId);
  const openDeleteModal = (replyId: number) => {
    setSelectedReplyId(replyId);
    setModalOpen(true);
  };

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
        setModalOpen={setModalOpen}
        onClose={closeModal}
        onDelete={() => handleDeleteReply(commentId, selectedReplyId!)}
      />
    </div>
  );
};

export default CommentReplySection;
