import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { formatDate } from '@/utils/changeDateTime';
import { useEffect, useState } from 'react';
import CommentReplySection from '@/components/Reply/Comment_Reply';
import usePostStore from '@/store/postStore';
import DeleteModal from '@/utils/Modal';
import { EllipsisOutlined } from '@ant-design/icons';
import { useCommentActions } from '@/hooks/useComment';

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
  const [content, setContent] = useState('');

  useEffect(() => {
    loadComments();
  }, [postId]);

  const openDeleteModal = (commentId: number) => {
    setSelectedCommentId(commentId);
    setModalOpen(true);
  };

  return (
    <div>
      <div className="flex flex-row justify-between">
        <Input value={content} onChange={(e) => setContent(e.target.value)} />
        <Button onClick={() => handleCommentSubmit(content)}>댓글작성</Button>
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
