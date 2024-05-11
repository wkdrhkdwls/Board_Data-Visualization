import { useState } from 'react';
import Layout from '@/components/layout/layout';
import { useForm } from 'react-hook-form';

import { supabase } from '@/hooks/supabase';
import { useNavigate } from 'react-router-dom';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const CreatePostPage = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { nickname, userId } = useAuth();
  const [fileLabel, setFileLabel] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setFileLabel(file.name);
      setValue('fileAttachment', file.name, { shouldValidate: true });
    }
  };

  const handleCreatePost = async (formData: any) => {
    const { title, content, fileAttachment, hashtags } = formData;
    const randomViews = Math.floor(Math.random() * 100) + 1;
    const postData = {
      title,
      content,
      file_attachment: fileAttachment,
      author: nickname,
      hashtags: hashtags.split(',').map((tag: any) => tag.trim()),
      views: randomViews,
      user_id: userId,
    };

    // Insert data into Supabase
    const { data, error } = await supabase.from('dashboard').insert([postData]);

    if (error) {
      console.error('Error inserting post:', error.message);
      alert('Failed to create post: ' + error.message);
    } else {
      console.log('Post created successfully:', data);
      navigate('/');
      alert('Post created successfully!');
    }
  };

  const openFileSelector = () => {
    const fileInput = document.getElementById('fileAttachment') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center p-4 my-28">
        <form
          onSubmit={handleSubmit(handleCreatePost)}
          className="w-full max-w-xl p-4 border rounded"
        >
          <div className="mb-4">
            <Label htmlFor="title">제목</Label>
            <Input
              {...register('title', { required: true })}
              id="title"
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="content">내용</Label>
            <Textarea
              {...register('content', { required: true })}
              id="content"
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="hashtags">파일 선택</Label>
            <Input
              {...register('fileAttachment')}
              id="fileAttachment"
              type="file"
              onChange={handleFileChange}
              className="w-full p-2 border-[1px] border-black rounded hidden"
            />
            <Input // 클릭 시 파일 입력을 활성화하는 텍스트 입력 필드
              type="text"
              onClick={openFileSelector}
              value={fileLabel || '파일 선택'} // 파일 이름 또는 기본 텍스트 표시
              readOnly
              className="w-full p-2 border-[1px] border-black rounded cursor-pointer"
              placeholder="파일 선택"
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="hashtags">해시태그</Label>
            <Input
              {...register('hashtags')}
              id="hashtags"
              className="w-full p-2 border rounded"
              placeholder=",로 구분하여 입력하세요. 예) #miniIntern, #weirdSector"
            />
          </div>
          <Button type="submit">게시글 작성</Button>
        </form>
      </div>
    </Layout>
  );
};

export default CreatePostPage;
