import CommentSection from '@/components/Reply/Comment';
import Layout from '@/components/layout/layout';
import { useAuth } from '@/hooks/useAuth';
import { deletePost, fetchPostById } from '@/services/DashBoard/dashBoardAPI';
import usePostStore from '@/store/postStore';
import DeleteModal from '@/utils/Modal/DeleteModal';
import { getTimeDifference } from '@/utils/changeDateTime';
import { LeftOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EllipsisVertical } from 'lucide-react';

const DetailPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userId } = useAuth();
  // 게시물 수정, 삭제 옵션
  const [showOptions, setShowOptions] = useState(false);

  // 모달 옵션
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  // zustand로 data와 postId 전역관리
  const { post, setPost, postId, setPostId } = usePostStore();

  // React Query를 사용하여 데이터 가져오기 및 캐싱
  // main.tsx에서 loading을 하므로 굳이 여기서 할 필요는 없다.
  const { data } = useQuery({
    queryKey: ['dashboard', postId],
    queryFn: () => fetchPostById(postId!),
    placeholderData: (previousData) => previousData, //이전 데이터 유지
    staleTime: 1000 * 60 * 5, // refresh 5분
    gcTime: 10 * 60 * 1000, //캐시 테이터 10분
    enabled: !!postId,
  });

  // 게시물 수정, 삭제 옵션 여닫기
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  // 게시물 삭제
  const handleDeletePost = async () => {
    try {
      await deletePost(postId!);
      navigate('/');
    } catch (error: any) {
      console.error('Error deleting post:', error.message);
    }
  };

  // postId가 변경되면 postId를 업데이트
  useEffect(() => {
    if (id) {
      const postId = Number(id);
      setPostId(postId);
    }
  }, [id, setPostId]);

  // data가 변경되면 post를 업데이트
  useEffect(() => {
    if (data) {
      setPost(data);
    }
  }, [data, setPost]);

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
                    <EllipsisVertical />
                  </button>
                  {showOptions && (
                    <ul className="absolute right-0 top-full mt-2 w-[112px] bg-white shadow-lg rounded-lg p-2 z-50">
                      <li className="p-2 cursor-pointer">수정</li>
                      <li className="p-2 cursor-pointer" onClick={openModal}>
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
              <p>조회수 {post.views}</p>
            </div>

            <p className="mb-4">{post.content}</p>
            <div className="flex flex-row mb-4">
              <span className="font-semibold text-[#ee3918] mr-4">첨부된 파일:</span>
              <p className="font-bold">{post.file_attachment.split('/').pop()}</p>
            </div>
            <div className="mb-4">
              {post.hashtags?.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <CommentSection />
          </div>
        )}

        <DeleteModal
          title="게시글 삭제"
          content="해당 게시글을 삭제하시겠습니까?"
          modalOpen={isModalOpen}
          setModalOpen={setModalOpen}
          onClose={closeModal}
          onDelete={handleDeletePost}
        />
      </>
    </Layout>
  );
};

export default DetailPostPage;
