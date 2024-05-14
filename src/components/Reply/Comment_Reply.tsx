import { CommentReplySectionDTO } from '@/type/Comment/comment';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatDate } from '@/utils/changeDateTime';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '../ui/use-toast';
import { useNavigate } from 'react-router-dom';

const CommentReplySection = ({ commentId, replies, onSubmitReply }: CommentReplySectionDTO) => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const [replyContent, setReplyContent] = useState('');
  const { toast } = useToast();

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
      await onSubmitReply(commentId, replyContent);
      setReplyContent('');
    } catch (error: any) {
      console.error('Error sending reply:', error.message);
    }
  };

  return (
    <div className="ml-4 mt-2">
      <div className="mt-2">
        <Input value={replyContent} onChange={(e) => setReplyContent(e.target.value)} />
        <Button onClick={handleReplySubmit}>답글</Button>
      </div>
      <div className="ml-4 mt-2">
        {replies?.map((reply) => (
          <div key={reply.id} className="mb-2">
            <p className="font-bold">{reply.nickname}</p>
            <p>{reply.content}</p>
            <p className="text-sm text-gray-500">{formatDate(reply.created_at)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentReplySection;
