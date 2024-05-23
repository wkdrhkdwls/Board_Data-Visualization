import { useNavigate } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import { DetailHeaderDTO } from '@/type/PostDetail/PostDetail';

const PostDetailHeader = ({ title }: DetailHeaderDTO) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row font-extrabold justify-between">
      <div className="flex flex-row">
        <button onClick={() => navigate(-1)} className="mb-2 mr-4">
          <LeftOutlined />
        </button>
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
      </div>
    </div>
  );
};

export default PostDetailHeader;
