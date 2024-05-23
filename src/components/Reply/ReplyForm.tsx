import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { ReplyFormDataDTO } from '@/type/Comment/comment_reply';

type ReplyFormProps = {
  onSubmit: (data: { replyContent: string }) => void;
};

const ReplyForm = ({ onSubmit }: ReplyFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReplyFormDataDTO>();

  const handleFormSubmit = async (data: { replyContent: string }) => {
    await onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="flex flex-row h-[55px] justify-between gap-x-4">
        <Input
          className="w-full mb-4"
          {...register('replyContent', { required: '답글을 입력하세요' })}
        />
        <Button type="submit">답글 작성</Button>
      </div>
      {errors.replyContent && <p className="text-red-500">{String(errors.replyContent.message)}</p>}
    </form>
  );
};

export default ReplyForm;
