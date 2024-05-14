import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { fetchComments, sendComment } from '@/services/Comment/commentAPI';
import { fetchCommentReplies, sendCommentReply } from '@/services/Comment/commentReplyAPI';
import { CommentSectionDTO, CommentType } from '@/type/Comment/comment';
import { formatDate } from '@/utils/changeDateTime';
import { useEffect, useState } from 'react';
import CommentReplySection from '@/components/Reply/Comment_Reply';

const CommentSection = ({ postId }: CommentSectionDTO) => {
  const { nickname } = useAuth();
  const [content, setContent] = useState('');
  const [comments, setComments] = useState([] as any[]);
  const [replyVisibility, setReplyVisibility] = useState<Record<number, boolean>>({});

  const loadComments = async () => {
    try {
      const data: CommentType[] = await fetchComments(postId);
      for (const comment of data) {
        comment.replies = await fetchCommentReplies(comment.id);
      }
      setComments(data);
    } catch (error: any) {
      console.error('Error fetching comments:', error.message);
    }
  };

  const handleCommentSubmit = async () => {
    try {
      await sendComment(nickname, content, postId);
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

  useEffect(() => {
    loadComments();
  }, [postId]);

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
    </div>
  );
};

export default CommentSection;
