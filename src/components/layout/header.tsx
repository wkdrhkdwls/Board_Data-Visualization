import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useState } from 'react';

import { useAuth } from '@/hooks/useAuth';
import ConfirmModal from '@/utils/Modal/ConfirmModal';

const Header = () => {
  const navigate = useNavigate();

  // useAuth 훅을 사용하여 닉네임 가져오기
  const { nickname } = useAuth();
  // 모바일 메뉴 열기 여부 상태
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 모달 열림 여부 상태
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 홈으로 이동
  const handleHome = () => {
    navigate('/');
  };
  // 로그인으로 이동
  const handleLogin = () => {
    navigate('/login');
  };
  // 차트로 이동
  const handleChart = () => {
    navigate('/chart');
  };

  // 모바일 메뉴 토글
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // 모바일 메뉴 닫기
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // 모달 열기
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full h-auto py-5 bg-white border-b border-gray-200">
      <div className="flex justify-between items-center h-auto px-4">
        <div className="flex items-center">
          {/* 모바일에서만 보이는 메뉴 버튼과 Testsite 버튼 */}
          <div className="mobile:flex mobile:flex-row hidden">
            <button onClick={toggleMobileMenu} className="text-xl font-bold mr-4">
              ☰
            </button>
            <p className="bg-white text-2xl font-bold text-[#ee3918] z-10 mobile:text-center">
              Testsite
            </p>
          </div>
        </div>

        {/* 태블릿 이상의 화면에서만 보이는 전체 메뉴 */}
        <div className="tablet:flex desktop:flex hidden justify-around w-full">
          <div className="flex items-center">
            <p className="bg-white text-2xl font-bold text-[#ee3918] z-10">Testsite</p>
            <Button onClick={handleHome} className="bg-white text-black text-lg mx-2">
              게시판
            </Button>
            <Button onClick={handleChart} className="bg-white text-black text-lg mx-2">
              대시보드
            </Button>
          </div>
          <div>
            {nickname ? (
              <Button className="text-lg  bg-white font-bold text-[#272727]  mx-2 pointer-events-none">
                {nickname}
              </Button>
            ) : (
              <Button
                onClick={handleLogin}
                className="text-lg bg-white font-bold text-[#272727] border-[1px] border-[#E1E1E1] mx-2"
              >
                로그인
              </Button>
            )}
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-40" onClick={closeMobileMenu}>
          <div className="bg-white h-full w-2/3 p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col font-bold text-black">
              {nickname ? (
                <Button className="text-lg bg-white font-bold text-[#272727]  mx-2 pointer-events-none">
                  {nickname}
                </Button>
              ) : (
                <Button
                  onClick={handleLogin}
                  className="text-lg bg-white font-bold text-[#272727] border-[1px] border-[#E1E1E1] mx-2"
                >
                  로그인
                </Button>
              )}
              <Button onClick={handleHome} className=" bg-white text-black text-lg my-4">
                게시판
              </Button>
              <Button onClick={openModal} className=" bg-white text-black text-lg my-4">
                대시보드(모바일 불가)
              </Button>
            </div>
          </div>
        </div>
      )}
      <ConfirmModal
        title="모바일에서 사용이 불가합니다."
        content="대시보드는 모바일에서 사용이 불가하므로 PC환경에서 접속해주세요. 감사합니다."
        isOpen={isModalOpen}
        onRequestClose={closeModal}
      />
    </div>
  );
};

export default Header;
