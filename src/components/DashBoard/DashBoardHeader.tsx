import { DashBoardHeaderDTO } from '@/type/PostTable/DashBoard';
import { Button } from '../ui/button';

const DashBoardHeader = ({ selectedBoard, onBoardSelect }: DashBoardHeaderDTO) => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="mb-4">
        <p className="text-center flex-grow-0 flex-shrink-0 text-xl font-extrabold text-[#ee3918]">
          board
        </p>
        <h2 className="flex-grow-0 flex-shrink-0 text-[32px] font-bold text-center text-[#040404]">
          {selectedBoard}
        </h2>
      </div>
      <div className="mobile:flex mobile:flex-row mobile:">
        <Button
          className={`py-2 px-4 rounded ${selectedBoard === '자유 게시판' ? 'bg-[#EE3918] text-white' : 'bg-[#eee] text-black'}`}
          onClick={() => onBoardSelect('자유 게시판')}
        >
          자유 게시판
        </Button>
        <Button
          className={`ml-2 py-2 px-4 rounded ${selectedBoard === '질문 게시판' ? 'bg-[#EE3918] text-white' : 'bg-[#eee] text-black'}`}
          onClick={() => onBoardSelect('질문 게시판')}
        >
          질문 게시판
        </Button>
        <Button
          className={`ml-2 py-2 px-4 rounded ${selectedBoard === '기타 게시판' ? 'bg-[#EE3918] text-white' : 'bg-[#eee] text-black'}`}
          onClick={() => onBoardSelect('기타 게시판')}
        >
          기타 게시판
        </Button>
      </div>
    </div>
  );
};

export default DashBoardHeader;
