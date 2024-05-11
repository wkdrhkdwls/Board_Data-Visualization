import { useEffect, useState } from 'react';
import Layout from '@/components/layout/layout';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import { supabase } from '@/hooks/supabase';

const CreatePostPage = () => {
  const { register, handleSubmit, reset } = useForm();

  const [cookies] = useCookies(['access_token']);
  const [nickname, setNickname] = useState('');
  const accessToken = cookies.access_token;
  const userId = localStorage.getItem('userId');

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
      alert('Post created successfully!');
      reset();
    }
  };

  useEffect(() => {
    if (accessToken && userId) {
      const fetchNickname = async () => {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('nickname')
            .eq('user_id', userId)
            .single();

          if (error) throw error;
          if (data) setNickname(data.nickname);
        } catch (error) {
          console.error('Error fetching nickname:', error);
        }
      };

      fetchNickname();
    }
  }, [accessToken, userId]);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center p-4 my-28">
        <form
          onSubmit={handleSubmit(handleCreatePost)}
          className="w-full max-w-xl p-4 border rounded"
        >
          <div className="mb-4">
            <label htmlFor="title">제목</label>
            <input
              {...register('title', { required: true })}
              id="title"
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content">내용</label>
            <textarea
              {...register('content', { required: true })}
              id="content"
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fileAttachment">파일첨부</label>
            <input
              {...register('fileAttachment')}
              id="fileAttachment"
              type="text"
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="hashtags">해시태그</label>
            <input
              {...register('hashtags')}
              id="hashtags"
              className="w-full p-2 border rounded"
              placeholder=",로 구분하여 입력하세요. 예) #miniIntern, #weirdSector"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            게시글 작성
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default CreatePostPage;
