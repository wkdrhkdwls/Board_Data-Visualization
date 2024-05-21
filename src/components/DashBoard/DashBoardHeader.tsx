import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

const DashBoardHeader = () => {
  // 선택된 버튼의 상태를 관리하는 state
  const [selected, setSelected] = useState<string>(() => {
    // 페이지가 로드될 때 sessionStorage에서 상태를 복원
    const saved = sessionStorage.getItem('selectedBoard');
    return saved ? saved : '자유 게시판';
  });

  useEffect(() => {
    // 상태가 변경될 때마다 sessionStorage에 저장
    sessionStorage.setItem('selectedBoard', selected);
  }, [selected]);

  // 게시물이 많지 않아 게시판 Type마다 분할하지 않고 하나의 페이지로 구성
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="mb-4">
        <p className="text-center flex-grow-0 flex-shrink-0 text-xl font-extrabold text-[#ee3918]">
          board
        </p>
        <h2 className="flex-grow-0 flex-shrink-0 text-[32px] font-bold text-center text-[#040404]">
          {selected}
        </h2>
      </div>
      <div className="mobile:flex mobile:flex-row mobile:">
        <Button
          className={`py-2 px-4 rounded ${selected === '자유 게시판' ? 'bg-[#EE3918] text-white' : 'bg-[#eee] text-black'}`}
          onClick={() => setSelected('자유 게시판')}
        >
          자유 게시판
        </Button>
        <Button
          className={`ml-2 py-2 px-4 rounded ${selected === '질문 게시판' ? 'bg-[#EE3918] text-white' : 'bg-[#eee] text-black'}`}
          onClick={() => setSelected('질문 게시판')}
        >
          질문 게시판
        </Button>
        <Button
          className={`ml-2 py-2 px-4 rounded ${selected === '기타 게시판' ? 'bg-[#EE3918] text-white' : 'bg-[#eee] text-black'}`}
          onClick={() => setSelected('기타 게시판')}
        >
          기타 게시판
        </Button>
      </div>
    </div>
  );
};

export default DashBoardHeader;
