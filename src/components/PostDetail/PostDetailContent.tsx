import { PostContentDTO } from '@/type/PostDetail/PostDetail';
import { getTimeDifference } from '@/utils/changeDateTime';

const PostDetailContent = ({
  author,
  createdAt,
  views,
  content,
  fileAttachment,
}: PostContentDTO) => {
  return (
    <>
      <div className="flex flex-row  flex-grow-0 flex-shrink-0  gap-2 mb-4 text-sm">
        <p>{author}</p> <p className="text-[#808080]">|</p>
        <p>{getTimeDifference(createdAt)}</p> <p className="text-[#808080]">|</p>
        <p>조회수 {views}</p>
      </div>
      <p className="mb-4">{content}</p>
      <div className="flex flex-row mb-4">
        <span className="font-semibold text-[#ee3918] mr-4">첨부된 파일:</span>
        <p className="font-bold">
          {fileAttachment && fileAttachment !== '{}' ? fileAttachment.split('/').pop() : null}
        </p>
      </div>
    </>
  );
};

export default PostDetailContent;
