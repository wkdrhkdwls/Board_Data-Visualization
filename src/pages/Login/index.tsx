import Layout from '@/components/layout/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import { LoginFormDTO } from '@/type/Login/Login';
import { useToast } from '@/components/ui/use-toast';
import { signInWithPassword } from '@/services/Login/loginAPI';
import TogglePasswordVisibleButton from '@/utils/PasswordVisible';

const LoginPage = () => {
  const navigate = useNavigate();

  // useForm 훅을 사용하여 폼 상태를 관리
  const { register, handleSubmit } = useForm<LoginFormDTO>();
  // access_token 쿠키를 저장하기 위해 useCookies 훅 사용
  const [, setCookies] = useCookies(['access_token']);
  // 비밀번호 보이기 여부를 관리하기 위한 상태
  const [showPassword, setShowPassword] = useState(false);
  // useToast 훅을 사용하여 토스트 메시지를 띄움
  const { toast } = useToast();

  // 로그인 폼 제출 핸들러
  const loginHandler: SubmitHandler<LoginFormDTO> = async (formData) => {
    try {
      // 로그인 API 호출
      const data = await signInWithPassword(formData.email, formData.password);

      console.log('Login successful', data);
      localStorage.setItem('refresh_token', data.session.refresh_token);
      localStorage.setItem('userId', data.user.id);
      setCookies('access_token', data.session.access_token, {
        path: '/',
        maxAge: data.session.expires_in,
      });

      toast({
        title: '로그인 성공',
        description: '로그인 성공했습니다.',
        duration: 2000,
        className: 'flex item-center justify-center',
      });
      navigate('/');
    } catch (error: any) {
      console.error('로그인 에러 : ', error.message);
      toast({
        variant: 'destructive',
        title: '로그인 실패',
        description: error.message,
        duration: 2000,
        className: 'flex item-center justify-center',
      });
    }
  };

  // 회원가입 페이지로 이동
  const handleSignUp = () => {
    navigate('/signup');
  };

  // 비밀번호 보이기/숨기기 토글
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
            <TogglePasswordVisibleButton
              isVisible={showPassword}
              onToggle={togglePasswordVisibility}
            />
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
