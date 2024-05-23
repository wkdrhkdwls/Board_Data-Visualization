import { EllipsisVertical } from 'lucide-react';

interface PostOptionsDTO {
  showOptions: boolean;
  toggleOptions: () => void;
  openModal: () => void;
}

const PostDetailOptions = ({ showOptions, toggleOptions, openModal }: PostOptionsDTO) => {
  return (
    <div className="relative inline-block">
      <button onClick={toggleOptions}>
        <EllipsisVertical />
      </button>
      {showOptions && (
        <ul className="absolute flex flex-col text-left right-0 top-full mt-2 w-[112px] bg-white shadow-lg rounded-lg p-2 z-50">
          <button className="p-2 cursor-pointer">수정</button>
          <button className="p-2 cursor-pointer" onClick={openModal}>
            삭제
          </button>
        </ul>
      )}
    </div>
  );
};

export default PostDetailOptions;
