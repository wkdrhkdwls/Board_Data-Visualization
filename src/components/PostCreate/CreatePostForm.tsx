import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';
import { createPost } from '@/services/DashBoard/dashBoardAPI';
import { useQueryClient } from '@tanstack/react-query';
import FileInput from './FileInput';
import { CreatePostFormDataDTO, CreatePostFormProps } from '@/type/PostCreate/PostCreate';

const CreatePostForm = ({ BoardType }: CreatePostFormProps) => {
  const { register, handleSubmit, setValue } = useForm<CreatePostFormDataDTO>();
  const { nickname } = useAuth();
  const [fileLabel, setFileLabel] = useState('');

  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const randomViews = Math.floor(Math.random() * 100) + 1;

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setFileLabel(file.name);
      setValue('fileAttachment', file.name, { shouldValidate: true });
    }
  };

  const handleCreatePost = async (formData: any) => {
    // 실제로 Input에 입력된 데이터
    const { title, content, fileAttachment, hashtags } = formData;

    // 게시글 작성 시 필요한 데이터
    const postData = {
      title,
      content,
      file_attachment: fileAttachment || '',
      author: nickname || '',
      hashtags: hashtags.split(',').map((tag: any) => tag.trim()),
      views: randomViews,

      boardType: BoardType || '',
    };

    // 게시글 작성 요청
    try {
      const data = await createPost(postData);
      console.log('Post created successfully:', data);

      queryClient.invalidateQueries({ queryKey: ['dashboard'] });

      setTimeout(() => {
        toast({
          title: '게시물 등록 성공',
          duration: 500,
          className: 'flex item-center justify-center',
        });
        navigate('/');
      }, 500);
    } catch (error: any) {
      console.error('Error inserting post:', error.message);
      toast({
        variant: 'destructive',
        title: '게시물 등록에 실패했습니다.',
        description: error.message,
        duration: 500,
        className: 'flex item-center justify-center',
      });
    }
  };

  const openFileSelector = () => {
    const fileInput = document.getElementById('fileAttachment') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleCreatePost)}
      className="w-full desktop:max-w-4xl mobile: p-8 mb-4 mobile:text-xs"
    >
      <div className="mb-4 flex flex-row items-center ">
        <label className="w-20 text-right mr-12 font-extrabold" htmlFor="title">
          제목
        </label>
        <Input
          {...register('title', { required: true })}
          id="title"
          className="flex-grow p-2 border rounded"
        />
      </div>
      <div className="mb-4 flex flex-row items-center">
        <label className="w-20 text-right mr-12 font-extrabold" htmlFor="content">
          내용
        </label>
        <Textarea
          {...register('content', { required: true })}
          id="content"
          className="flex-grow p-2 border rounded"
        />
      </div>
      <FileInput
        fileLabel={fileLabel}
        onFileChange={handleFileChange}
        openFileSelector={openFileSelector}
      />
      <div className="mb-4 flex flex-row items-center">
        <label className="w-20 text-right mr-12 font-extrabold" htmlFor="hashtags">
          해시태그
        </label>
        <Input
          {...register('hashtags')}
          id="hashtags"
          className="flex-grow p-2 border rounded"
          placeholder=",로 구분하여 입력하세요. 예) #miniIntern, #weirdSector"
        />
      </div>
      <div className="flex items-center justify-center mt-10">
        <Button type="submit">게시글 작성</Button>
      </div>
    </form>
  );
};

export default CreatePostForm;
