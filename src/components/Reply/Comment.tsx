import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { fetchComments, sendComment } from '@/services/commentAPI';
import { CommentSectionDTO } from '@/type/Comment/comment';
import { formatDate } from '@/utils/changeDateTime';
import { useEffect, useState } from 'react';

const CommentSection = ({ postId }: CommentSectionDTO) => {
  const { nickname } = useAuth();
  const [content, setContent] = useState('');
  const [comments, setComments] = useState([] as any[]);

  const loadComments = async () => {
    try {
      const data = await fetchComments(postId);
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

  useEffect(() => {
    loadComments();
  }, []);
  return (
    <div>
      <div className="flex flex-row justify-between">
        <Input value={content} onChange={(e) => setContent(e.target.value)} />
        <Button onClick={handleCommentSubmit}>버튼</Button>
      </div>
      <div>
        {comments.map((comment) => (
          <div key={comment.id} className="mb-2">
            <p className="font-bold">{comment.nickname}</p>
            <p>{comment.content}</p>
            <p className="text-sm text-gray-500">{formatDate(comment.created_at)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
