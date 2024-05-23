import Layout from '@/components/layout/layout';
import LoginForm from '@/components/Login/LoginForm';

const LoginPage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center p-4 my-[100px]">
        <h2 className="text-center text-[32px] font-extrabold my-4">로그인</h2>
        <LoginForm />
      </div>
    </Layout>
  );
};

export default LoginPage;
