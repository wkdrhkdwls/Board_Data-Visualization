import CommentSection from '@/components/Comment/Comment';
import Layout from '@/components/layout/layout';
import { useAuth } from '@/hooks/useAuth';
import { removePost, getPostById } from '@/services/DashBoard/dashBoardAPI';
import usePostStore from '@/store/postStore';
import DeleteModal from '@/utils/Modal/DeleteModal';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostDetailHeader from '@/components/PostDetail/PostDetailHeader';
import PostDetailOptions from '@/components/PostDetail/PostDetailOptions';
import PostDetailContent from '@/components/PostDetail/PostDetailContent';
import PostDetailTags from '@/components/PostDetail/PostDetailTags';

const DetailPostPage = () => {
  // 게시물의 id를 빼온다.
  const { id } = useParams();
  const navigate = useNavigate();
  const { userId } = useAuth();
  // 게시물 수정, 삭제 옵션
  const [showOptions, setShowOptions] = useState<boolean>(false);

  // 모달 옵션
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  // zustand로 data와 postId 전역관리
  const { post, setPost, postId, setPostId, clearPost } = usePostStore();

  // React Query를 사용하여 데이터 가져오기 및 캐싱
  const { data } = useQuery({
    queryKey: ['dashboard', postId],
    queryFn: () => getPostById(postId!),
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
      await removePost(postId!);
      navigate('/');
    } catch (error: any) {
      console.error('Error deleting post:', error.message);
    }
  };

  useEffect(() => {
    if (id) {
      const postId = Number(id);
      setPostId(postId);
    }

    if (data) {
      setPost(data);
    }

    // 페이지 언마운트 시 clearPost 호출
    return () => {
      clearPost();
    };
  }, [id, postId, data, setPostId, setPost, clearPost]);
  return (
    <Layout>
      <>
        {post && (
          <div className="p-4 max-w-5xl mx-auto text-black my-10">
            <div className="flex flex-row justify-between items-center">
              <PostDetailHeader title={post.title} />
              {post.user_id === userId && (
                <PostDetailOptions
                  showOptions={showOptions}
                  toggleOptions={toggleOptions}
                  openModal={openModal}
                />
              )}
            </div>
            <PostDetailContent
              author={post.author}
              createdAt={post.created_at}
              views={post.views}
              content={post.content}
              fileAttachment={post.file_attachment || ''}
            />
            <PostDetailTags hashtags={post.hashtags} />
            <CommentSection />
          </div>
        )}

        <DeleteModal
          title="게시글 삭제"
          content="해당 게시글을 삭제하시겠습니까?"
          modalOpen={isModalOpen}
          setModalOpen={setIsModalOpen}
          onClose={closeModal}
          onDelete={handleDeletePost}
        />
      </>
    </Layout>
  );
};

export default DetailPostPage;
