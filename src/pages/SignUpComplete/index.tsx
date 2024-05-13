import Layout from '@/components/layout/layout';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import CheckIcon from '@/assets/Icon/CheckIcon.svg';

const SignUpCompletePage = () => {
  // 페이지 이동
  const navigate = useNavigate();

  // 로그인 페이지로 이동
  const handleLogin = () => {
    navigate('/login');
  };
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center p-4 my-28 gap-2">
        <img src={CheckIcon} alt="회원가입 완료" className="w-10 h-10 mx-auto " />
        <p className="flex-grow-0 flex-shrink-0 text-2xl font-bold text-left text-[#040404]">
          회원가입이 완료되었습니다.
        </p>
        <p className="flex-grow-0 flex-shrink-0 text-xl text-left text-[#808080]">축하드려요!</p>
        <Button className="text-lg w-[240px] mt-5" onClick={handleLogin}>
          로그인
        </Button>
      </div>
    </Layout>
  );
};

export default SignUpCompletePage;
