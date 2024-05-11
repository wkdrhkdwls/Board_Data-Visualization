import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useCookies } from 'react-cookie';

const supabaseURL = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseURL, supabaseKey);

const Header = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cookies, setCookies] = useCookies(['access_token']);
  const [nickname, setNickname] = useState('');

  const userId = localStorage.getItem('userId');
  const accessToken = cookies.access_token;
  // 홈으로 이동
  const handleHome = () => {
    navigate('/');
  };
  // 로그인으로 이동
  const handleLogin = () => {
    navigate('/login');
  };

  // 모바일 메뉴 토글
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // 모바일 메뉴 닫기
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    if (accessToken && userId) {
      const fetchNickname = async () => {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('nickname')
            .eq('user_id', userId)
            .single(); // Assumes `userId` uniquely identifies a profile

          if (error) throw error;
          if (data) setNickname(data.nickname);
        } catch (error) {
          console.error('Error fetching nickname:', error);
        }
      };

      fetchNickname();
    }
  }, [accessToken, userId]);

  return (
    <div className="w-full h-auto py-5 bg-white border-b border-gray-200">
      <div className="flex justify-between items-center h-auto px-4">
        <div className="flex items-center">
          {/* 모바일에서만 보이는 메뉴 버튼과 Testsite 버튼 */}
          <div className="mobile:block hidden">
            <button onClick={toggleMobileMenu} className="text-xl font-bold mr-4">
              ☰
            </button>
            <p className="bg-white text-2xl font-bold text-[#ee3918] z-10">Testsite</p>
          </div>
        </div>

        {/* 태블릿 이상의 화면에서만 보이는 전체 메뉴 */}
        <div className="tablet:flex desktop:flex hidden justify-around w-full">
          <div className="flex items-center">
            <p className="bg-white text-2xl font-bold text-[#ee3918] z-10">Testsite</p>
            <Button onClick={handleHome} className="bg-white text-black text-lg mx-2">
              게시판
            </Button>
            <Button onClick={() => {}} className="bg-white text-black text-lg mx-2">
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
              <Button onClick={() => {}} className=" bg-white text-black text-lg my-4">
                게시판
              </Button>
              <Button onClick={() => {}} className=" bg-white text-black text-lg my-4">
                대시보드(모바일 불가)
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
