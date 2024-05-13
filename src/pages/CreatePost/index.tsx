import { useState } from 'react';
import Layout from '@/components/layout/layout';
import { useForm } from 'react-hook-form';

import { supabase } from '@/hooks/supabase';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';

const CreatePostPage = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { nickname, userId } = useAuth();
  const [fileLabel, setFileLabel] = useState('');

  const { toast } = useToast();
  const navigate = useNavigate();
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
      file_attachment: fileAttachment,
      author: nickname,
      hashtags: hashtags.split(',').map((tag: any) => tag.trim()),
      views: randomViews,
      user_id: userId,
    };

    // 게시글 작성 요청
    const { data, error } = await supabase.from('dashboard').insert([postData]);

    // 게시글 작성 결과에 따른 처리(실패, 성공)
    if (error) {
      console.error('Error inserting post:', error.message);
      toast({
        variant: 'destructive',
        title: '게시물 등록에 실패했습니다.',
        description: error.message,
        duration: 2000,
        className: 'flex item-center justify-center',
      });
    } else {
      console.log('Post created successfully:', data);
      setTimeout(() => {
        toast({
          title: '게시물 등록 성공',
          duration: 2000,
          className: 'flex item-center justify-center',
        });
        navigate('/');
      }, 2000); // supabase에 등록되는 시간이 걸려 2초 뒤에 메인 페이지로 이동
    }
  };

  // 파일 선택 버튼 클릭 시 파일 선택 창 열기
  const openFileSelector = () => {
    const fileInput = document.getElementById('fileAttachment') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center px-8 py-28">
        <h2 className="text-center text-[32px] font-bold">게시글 작성</h2>
        <form onSubmit={handleSubmit(handleCreatePost)} className="w-full max-w-4xl p-8 mb-4">
          <div className="flex flex-row mb-4">
            <label className="w-10 mr-48" htmlFor="title">
              제목
            </label>
            <Input
              {...register('title', { required: true })}
              id="title"
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex flex-row mb-4">
            <label className="w-20 mr-48" htmlFor="content">
              내용
            </label>
            <Textarea
              {...register('content', { required: true })}
              id="content"
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex flex-row mb-4">
            <label className="w-20 mr-48" htmlFor="hashtags">
              파일 선택
            </label>
            <Input
              {...register('fileAttachment')}
              id="fileAttachment"
              type="file"
              onChange={handleFileChange}
              className="w-full p-2 border-[1px] border-black rounded hidden"
            />
            <Input
              type="text"
              onClick={openFileSelector}
              value={fileLabel || '파일 선택'}
              readOnly
              className="w-full p-2 border-[1px] border-black rounded cursor-pointer"
              placeholder="파일 선택"
            />
          </div>
          <div className="flex flex-row mb-4">
            <label className="w-20 mr-48" htmlFor="hashtags">
              해시태그
            </label>
            <Input
              {...register('hashtags')}
              id="hashtags"
              className="w-full p-2 border rounded"
              placeholder=",로 구분하여 입력하세요. 예) #miniIntern, #weirdSector"
            />
          </div>
          <div className="flex items-center justify-center mt-10">
            <Button type="submit">게시글 작성</Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreatePostPage;
