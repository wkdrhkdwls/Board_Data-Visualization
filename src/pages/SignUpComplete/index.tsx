import Layout from '@/components/layout/layout';
import { useNavigate } from 'react-router-dom';

const SignUpCompletePage = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/login');
  };
  return (
    <Layout>
      <p>회원가입이 완료되었습니다.</p>
      <button onClick={handleLogin}>로그인</button>
    </Layout>
  );
};

export default SignUpCompletePage;
