import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { deleteCommentById, fetchComments, sendComment } from '@/services/Comment/commentAPI';
import {
  deleteCommentReplies,
  fetchCommentReplies,
  sendCommentReply,
} from '@/services/Comment/commentReplyAPI';
import { CommentType } from '@/type/Comment/comment';
import { formatDate } from '@/utils/changeDateTime';
import { useEffect, useState } from 'react';
import CommentReplySection from '@/components/Reply/Comment_Reply';
import usePostStore from '@/store/postStore';
import { useToast } from '../ui/use-toast';
import { useNavigate } from 'react-router-dom';
import DeleteModal from '@/utils/Modal';
import { EllipsisOutlined } from '@ant-design/icons';

const CommentSection = () => {
  const { nickname, accessToken, userId } = useAuth();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [comments, setComments] = useState([] as any[]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(null);
  const [showOptions, setShowOptions] = useState<Record<number, boolean>>({});
  const [replyVisibility, setReplyVisibility] = useState<Record<number, boolean>>({});
  const { postId } = usePostStore();
  const { toast } = useToast();

  const closeModal = () => setModalOpen(false);

  const loadComments = async () => {
    try {
      const data: CommentType[] = await fetchComments(postId!);
      for (const comment of data) {
        comment.replies = await fetchCommentReplies(comment.id);
      }
      setComments(data);
    } catch (error: any) {
      console.error('Error fetching comments:', error.message);
    }
  };

  const handleCommentSubmit = async () => {
    // Check if the user is authenticated
    if (!accessToken) {
      toast({
        title: '로그인이 필요합니다.',
        duration: 3000,
      });
      navigate('/login');
      return;
    }

    // If authenticated, proceed with the comment submission
    try {
      await sendComment(nickname, content, postId!, userId!);
      console.log('Comment added successfully');

      setContent('');
      loadComments();
    } catch (error: any) {
      console.error('Error sending comment:', error.message);
    }
  };

  const handleReplySubmit = async (commentId: number, content: string) => {
    try {
      await sendCommentReply(nickname, content, commentId);

      loadComments();
    } catch (error: any) {
      console.error('Error sending reply:', error.message);
    }
  };

  const toggleReplyInput = (commentId: number) => {
    setReplyVisibility((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const toggleOptions = (commentId: number) => {
    setShowOptions((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const openDeleteModal = (commentId: number) => {
    setSelectedCommentId(commentId); // Set selected comment ID
    setModalOpen(true);
  };

  const handleDeleteComment = async () => {
    if (selectedCommentId !== null) {
      try {
        await deleteCommentReplies(selectedCommentId);
        await deleteCommentById(selectedCommentId);
        loadComments();
        setModalOpen(false);
      } catch (error: any) {
        console.error('Error deleting comment:', error.message);
      }
    }
  };

  useEffect(() => {
    loadComments();
  }, [postId]);
  console.log(comments);
  return (
    <div>
      <div className="flex flex-row justify-between">
        <Input value={content} onChange={(e) => setContent(e.target.value)} />
        <Button onClick={handleCommentSubmit}>댓글작성</Button>
      </div>
      <div>
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="my-4 py-4 flex flex-col border-t-[1px] border-b-[1px] border-[#E1E1E1]"
          >
            <p className="font-bold">{comment.nickname}</p>
            {comment.user_id === userId && (
              <div className="relative inline-block">
                <button onClick={() => toggleOptions(comment.id)}>
                  <EllipsisOutlined />
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

            <p>{comment.content}</p>
            <div className="flex flex-row">
              <p className="text-sm text-gray-500">{formatDate(comment.created_at)}</p>
              <button className="cursor-pointer" onClick={() => toggleReplyInput(comment.id)}>
                답글
              </button>
            </div>
            {replyVisibility[comment.id] && (
              <CommentReplySection
                commentId={comment.id}
                replies={comment.replies || []}
                onSubmitReply={handleReplySubmit}
              />
            )}
          </div>
        ))}
      </div>
      {selectedCommentId !== null && (
        <DeleteModal
          title="댓글삭제"
          content="해당 댓글을 삭제하시겠습니까?"
          modalOpen={isModalOpen}
          setModalOpen={setModalOpen}
          onClose={closeModal}
          onDelete={handleDeleteComment}
        />
      )}
    </div>
  );
};

export default CommentSection;
