import { CommentReplySectionDTO } from '@/type/Comment/comment';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatDate } from '@/utils/changeDateTime';
import { useAuth } from '@/hooks/useAuth';
import DeleteModal from '@/utils/Modal';
import { EllipsisOutlined } from '@ant-design/icons';
import useCommentStore from '@/store/commentStore';
import { useCommentActions } from '@/hooks/useComment';

const CommentReplySection = ({ commentId }: CommentReplySectionDTO) => {
  const { userId } = useAuth();
  const { comments } = useCommentStore();

  const [replyContent, setReplyContent] = useState('');
  const [showOptions, setShowOptions] = useState<Record<number, boolean>>({});
  const {
    handleReplySubmit,
    handleDeleteReply,
    closeModal,
    setModalOpen,
    isModalOpen,
    selectedReplyId,
    setSelectedReplyId,
  } = useCommentActions(commentId);

  const comment = comments.find((c) => c.id === commentId);
  const openDeleteModal = (replyId: number) => {
    setSelectedReplyId(replyId);
    setModalOpen(true);
  };
  return (
    <div className="ml-4 mt-2">
      <div className="mt-2">
        <Input value={replyContent} onChange={(e) => setReplyContent(e.target.value)} />
        <Button onClick={() => handleReplySubmit(commentId, replyContent)}>답글</Button>
      </div>
      <div className="ml-4 mt-2">
        {comment?.replies?.map((reply) => (
          <div key={reply.id} className="mb-2">
            <p className="font-bold">{reply.nickname}</p>
            {reply.user_id === userId && (
              <div className="relative inline-block">
                <button
                  onClick={() =>
                    setShowOptions((prev) => ({ ...prev, [reply.id]: !prev[reply.id] }))
                  }
                >
                  <EllipsisOutlined />
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
