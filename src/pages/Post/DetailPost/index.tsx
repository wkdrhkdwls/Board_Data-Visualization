import Layout from '@/components/layout/layout';
import { supabase } from '@/hooks/supabase';
import { useAuth } from '@/hooks/useAuth';
import { PostDTO } from '@/type/PostTable/DashBoard';
import { EllipsisOutlined, LeftOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const DetailPostPage = () => {
  const { id } = useParams();
  const postId = Number(id);
  const navigate = useNavigate();
  const { userId } = useAuth();
  const [showOptions, setShowOptions] = useState(false);

  // 나중에 fetch, delete 전부 /service폴더로 이동
  const fetchPosts = async (postId: number): Promise<PostDTO> => {
    const { data, error } = await supabase.from('dashboard').select('*').eq('id', postId).single();

    if (error) throw new Error(error.message);
    return data;
  };

  const deletePost = async () => {
    const { error } = await supabase.from('dashboard').delete().match({ id: postId });
    if (error) throw new Error(error.message);
    else navigate('/');
  };

  // React Query를 사용하여 데이터 가져오기 및 캐싱
  // main.tsx에서 loading을 하므로 굳이 여기서 할 필요는 없다.
  const { data: post } = useQuery({
    queryKey: ['dashboard', postId],
    queryFn: () => fetchPosts(postId),
    placeholderData: (previousData) => previousData, //이전 데이터 유지
    staleTime: 1000 * 60 * 5, // refresh 5분
    gcTime: 10 * 60 * 1000, //캐시 테이터 10분
  });

  const getTimeDifference = (createdAt: any) => {
    const postDate = new Date(createdAt).getTime();
    const now = new Date().getTime();
    const differenceInMilliseconds = now - postDate;
    const minutes = Math.floor(differenceInMilliseconds / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) {
      return `${minutes}분 전`;
    } else if (hours < 24) {
      return `${hours}시간 전`;
    } else {
      return `${days}일 전`;
    }
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const sendComment = async (nickname: string, content: string, dashboardId: number) => {
    const { data, error } = await supabase
      .from('comment')
      .insert([{ nickname: nickname, content: content, dashboard_id: dashboardId }]);

    if (error) {
      console.error('Error sending comment:', error.message);
      // Optionally handle the error, e.g., show a notification
    } else {
      console.log('Comment added successfully:', data);
      // Optionally clear form, update UI, etc.
    }
  };

  const handleCommentSubmit = async () => {
    const nickname = 'UserNickname'; // this should come from user input or auth context
    const content = 'This is a comment content.'; // this should come from form input
    const dashboardId = postId; // postId obtained from useParams as shown in your code

    await sendComment(nickname, content, dashboardId);
  };

  return (
    <Layout>
      <>
        {post && (
          <div className="p-4 max-w-5xl mx-auto text-black my-10">
            <div className="flex flex-row font-extrabold justify-between">
              <div className="flex flex-row">
                <button onClick={() => navigate(-1)} className="mb-2 mr-2">
                  <LeftOutlined />
                </button>
                <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
              </div>
              {post.user_id === userId && (
                <div className="relative inline-block">
                  <button onClick={toggleOptions}>
                    <EllipsisOutlined />
                  </button>
                  {showOptions && (
                    <ul className="absolute right-0 top-full mt-2 w-[112px] bg-white shadow-lg rounded-lg p-2 z-50">
                      <li
                        className="p-2 cursor-pointer"
                        onClick={() => navigate(`/edit/${post.id}`)}
                      >
                        수정
                      </li>
                      <li className="p-2 cursor-pointer" onClick={deletePost}>
                        삭제
                      </li>
                    </ul>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-row  flex-grow-0 flex-shrink-0  gap-2 mb-4 text-sm">
              <p>{post.author}</p> <p className="text-[#808080]">|</p>
              <p>{getTimeDifference(post?.created_at)}</p> <p className="text-[#808080]">|</p>
              <p>{post.views}</p>
            </div>

            <p className="mb-4">{post.content}</p>
            <div className="flex flex-row mb-4">
              <span className="font-semibold text-[#ee3918] mr-4">첨부된 파일:</span>
              <p className="font-bold">{post.file_attachment.split('/').pop()}</p>
            </div>
            <div className="mb-4">
              {post.hashtags?.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
        <div>
          <button onClick={handleCommentSubmit}>버튼</button>
        </div>
      </>
    </Layout>
  );
};

export default DetailPostPage;
