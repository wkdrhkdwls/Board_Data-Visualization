import Layout from '@/components/layout/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createClient } from '@supabase/supabase-js';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { EyeFilled, EyeInvisibleOutlined } from '@ant-design/icons';
import { useState } from 'react';

const supabaseURL = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseURL, supabaseKey);

type LoginFormDTO = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<LoginFormDTO>();
  const [cookies, setCookies] = useCookies(['access_token']);
  const [showPassword, setShowPassword] = useState(false);

  const loginHandler: SubmitHandler<LoginFormDTO> = async (formData) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        console.error('로그인 에러 : ', error.message);
        alert('로그인 실패 : ' + error.message);
      } else if (data) {
        console.log('Login successful', data);
        localStorage.setItem('refresh_token', data.session.refresh_token);
        localStorage.setItem('userId', data.user.id);
        setCookies('access_token', data.session.access_token, {
          path: '/',
          maxAge: data.session.expires_in,
        });
        navigate('/');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  const handleSignUp = () => {
    navigate('/signup');
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center p-4 my-28">
        <h2 className="text-center text-[32px] font-extrabold my-4">로그인</h2>
        <form onSubmit={handleSubmit(loginHandler)} className="w-full max-w-md px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <Input
              type="email"
              {...register('email')}
              placeholder="이메일 주소"
              className="self-stretch flex-grow overflow-hidden gap-2.5 px-6 py-3.5 rounded bg-white border border-[#e1e1e1]"
            />
          </div>
          <div className="mb-4 relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              placeholder="비밀번호 입력"
              className="self-stretch flex-grow overflow-hidden gap-2.5 px-6 py-3.5 rounded bg-white border border-[#e1e1e1]"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute  inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
              {showPassword ? <EyeInvisibleOutlined /> : <EyeFilled />}
            </button>
          </div>
          <div className="flex items-center justify-center mb-4">
            <Button type="submit" className="w-96 h-14">
              로그인
            </Button>
          </div>
          <div className="flex flex-row items-center justify-center flex-grow-0 flex-shrink-0 relative gap-4 mb-4 text-sm font-medium text-[#808080]">
            <p>아이디 찾기 </p>
            <p>|</p>
            <p>비밀번호 찾기</p>
            <p>|</p>
            <p onClick={handleSignUp} className="text-black font-bold cursor-pointer">
              회원가입
            </p>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default LoginPage;
