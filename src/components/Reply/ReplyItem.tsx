import { formatDate } from '@/utils/changeDateTime';
import { EllipsisVertical, CornerDownRight } from 'lucide-react';
import { ReplyItemProps } from '@/type/Comment/comment_reply';

const ReplyItem = ({
  reply,
  userId,
  showOptions,
  toggleOptions,
  openDeleteModal,
}: ReplyItemProps) => {
  return (
    <div className="my-4 py-4 gap-y-2 flex flex-col">
      <p>
        <CornerDownRight />
      </p>
      <div className="flex flex-row justify-between">
        <p className="font-bold">{reply.nickname}</p>
        {reply.user_id === userId && (
          <div className="relative inline-block">
            <button onClick={() => toggleOptions(reply.id)}>
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
  );
};

export default ReplyItem;
