import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { formatDate } from '@/utils/changeDateTime';
import { useEffect } from 'react';
import CommentReplySection from '@/components/Reply/Comment_Reply';
import usePostStore from '@/store/postStore';
import DeleteModal from '@/utils/Modal';
import { useCommentActions } from '@/hooks/useComment';
import { useForm } from 'react-hook-form';
import { CommentFormDataDTO } from '@/type/Comment/comment';
import { EllipsisVertical } from 'lucide-react';

const CommentSection = () => {
  const { postId } = usePostStore();
  const { userId } = useAuth();
  const {
    comments,
    isModalOpen,
    closeModal,
    setModalOpen,
    setSelectedCommentId,
    showOptions,
    replyVisibility,
    loadComments,
    handleCommentSubmit,
    handleDeleteComment,
    toggleReplyInput,
    toggleOptions,
  } = useCommentActions(postId!);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormDataDTO>();

  const onSubmit = async (data: { content: string }) => {
    await handleCommentSubmit(data.content);
    reset();
  };

  const openDeleteModal = (commentId: number) => {
    setSelectedCommentId(commentId);
    setModalOpen(true);
  };

  useEffect(() => {
    loadComments();
  }, [postId]);

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
          <div
            key={comment.id}
            className="my-4 py-4 gap-y-3 flex flex-col border-t-[1px] border-[#E1E1E1]"
          >
            <div className="flex flex-row justify-between">
              <p className="font-bold">{comment.nickname}</p>
              {comment.user_id === userId && (
                <div className="relative inline-block">
                  <button onClick={() => toggleOptions(comment.id)}>
                    <EllipsisVertical />
                  </button>
                  {showOptions[comment.id] && (
                    <ul className="absolute right-0 top-full mt-2 w-[112px] bg-white shadow-lg rounded-lg p-2 z-50">
                      <li className="p-2 cursor-pointer">수정</li>
                      <li
                        className="p-2 cursor-pointer"
                        onClick={() => openDeleteModal(comment.id)}
                      >
                        삭제
                      </li>
                    </ul>
                  )}
                </div>
              )}
            </div>

            <p>{comment.content}</p>
            <div className="flex flex-row gap-x-2">
              <p className="text-sm text-gray-500">{formatDate(comment.created_at)}</p>
              <button className="cursor-pointer" onClick={() => toggleReplyInput(comment.id)}>
                답글
              </button>
            </div>
            {replyVisibility[comment.id] && <CommentReplySection commentId={comment.id} />}
          </div>
        ))}
      </div>

      <DeleteModal
        title="댓글삭제"
        content="해당 댓글을 삭제하시겠습니까?"
        modalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        onClose={closeModal}
        onDelete={handleDeleteComment}
      />
    </div>
  );
};

export default CommentSection;
