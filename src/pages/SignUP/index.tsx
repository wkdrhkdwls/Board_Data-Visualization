import Layout from '@/components/layout/layout';
import SignUpForm from '@/components/SignUp/SignUpForm';

const SignUpPage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center p-4 my-[100px]">
        <h2 className="text-center text-[32px] font-extrabold my-4">회원가입</h2>
        <SignUpForm />
      </div>
    </Layout>
  );
};

export default SignUpPage;
