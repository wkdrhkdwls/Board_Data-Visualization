import Layout from '@/components/layout/layout';
import CreatePostForm from '@/components/PostCreate/CreatePostForm';

const CreatePostPage = () => {
  // 게시판 타입을 세션 스토리지에서 가져옴
  const BoardType = sessionStorage.getItem('selectedBoard') || '';

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center px-8 py-28 mobile:py-10 mx-10 mobile:mx-0 mobile:px-0">
        <h2 className="text-center text-[32px] font-bold">게시글 작성</h2>
        <CreatePostForm BoardType={BoardType} />
      </div>
    </Layout>
  );
};

export default CreatePostPage;
