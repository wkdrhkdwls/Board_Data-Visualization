import { CommentReplySectionDTO } from '@/type/Comment/comment';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatDate } from '@/utils/changeDateTime';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '../ui/use-toast';
import { useNavigate } from 'react-router-dom';
import DeleteModal from '@/utils/Modal';
import { deleteCommentReplyById } from '@/services/Comment/commentReplyAPI';
import { EllipsisOutlined } from '@ant-design/icons';

export type ReplyType = {
  id: number;
  nickname: string;
  content: string;
  created_at: string;
  user_id: string;
};

const CommentReplySection = ({
  commentId,
  replies,
  onSubmitReply,
  onDeleteReply,
}: CommentReplySectionDTO) => {
  const { accessToken, userId } = useAuth();
  const navigate = useNavigate();
  const [replyContent, setReplyContent] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedReplyId, setSelectedReplyId] = useState<number | null>(null);
  const [showOptions, setShowOptions] = useState<Record<number, boolean>>({});
  const { toast } = useToast();

  const closeModal = () => setModalOpen(false);

  const handleReplySubmit = async () => {
    if (!accessToken) {
      toast({
        title: '로그인이 필요합니다.',
        duration: 3000,
      });
      navigate('/login');
      return;
    }

    try {
      await onSubmitReply(commentId, replyContent, userId!);
      setReplyContent('');
    } catch (error: any) {
      console.error('Error sending reply:', error.message);
    }
  };

  const openDeleteModal = (replyId: number) => {
    setSelectedReplyId(replyId);
    setModalOpen(true);
  };

  const handleDeleteReply = async () => {
    if (selectedReplyId !== null) {
      try {
        await deleteCommentReplyById(selectedReplyId);
        setModalOpen(false);
        onDeleteReply();
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
    }
  };

  const toggleOptions = (replyId: number) => {
    setShowOptions((prev) => ({ ...prev, [replyId]: !prev[replyId] }));
  };

  return (
    <div className="ml-4 mt-2">
      <div className="mt-2">
        <Input value={replyContent} onChange={(e) => setReplyContent(e.target.value)} />
        <Button onClick={handleReplySubmit}>답글</Button>
      </div>
      <div className="ml-4 mt-2">
        {replies?.map((reply: ReplyType) => (
          <div key={reply.id} className="mb-2">
            <p className="font-bold">{reply.nickname}</p>
            {reply.user_id === userId && (
              <div className="relative inline-block">
                <button onClick={() => toggleOptions(reply.id)}>
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
      {selectedReplyId !== null && (
        <DeleteModal
          title="대댓글삭제"
          content="해당 대댓글을 삭제하시겠습니까?"
          modalOpen={isModalOpen}
          setModalOpen={setModalOpen}
          onClose={closeModal}
          onDelete={handleDeleteReply}
        />
      )}
    </div>
  );
};

export default CommentReplySection;
