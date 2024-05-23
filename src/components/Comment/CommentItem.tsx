import { formatDate } from '@/utils/changeDateTime';
import { EllipsisVertical } from 'lucide-react';
import { CommentItemDTO } from '@/type/Comment/comment';
import { useCommentActions } from '@/hooks/useComment';
import ReplySection from '@/components/Reply/Reply';

const CommentItem = ({ comment, userId, openDeleteModal }: CommentItemDTO) => {
  const { showOptions, toggleReplyInput, toggleOptions, replyVisibility } = useCommentActions(
    comment.post_id,
  ); // post_id 사용

  return (
    <div className="my-4 py-4 gap-y-3 flex flex-col border-t-[1px] border-[#E1E1E1]">
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
                <li className="p-2 cursor-pointer" onClick={() => openDeleteModal(comment.id)}>
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
          답글({comment.replies?.length || 0})
        </button>
      </div>
      {replyVisibility[comment.id] && <ReplySection commentId={comment.id} />}
    </div>
  );
};

export default CommentItem;
