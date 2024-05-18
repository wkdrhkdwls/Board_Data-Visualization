import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Layout from '@/components/layout/layout';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SignUpFormInputDTO } from '@/type/SignUp/Signup';
import { useNavigate } from 'react-router-dom';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import TogglePasswordVisibleButton from '@/utils/PasswordVisible';

// 회원가입 폼 유효성 검사
const signUpFormSchema = z
  .object({
    email: z.string().email({ message: '이메일 형태이어야합니다.' }),
    password: z
      .string()
      .min(8, { message: '8자 이상이어야합니다.' })
      .regex(/(?=.*[A-Za-z])(?=.*[\d$@$!%*#?&])/, {
        message: '8자 이상, 영문자, 숫자, 특수기호중 2가지 조합',
      }),
    passwordConfirm: z.string(),
    nickname: z.string().min(1, { message: '닉네임은 필수적으로 입력해주어야합니다.' }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

const SignUpPage = () => {
  // 페이지 이동
  const navigate = useNavigate();
  // 비밀번호 보이기 여부를 관리하기 위한 상태
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  // react-hook-form을 사용한 회원가입 폼
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputDTO>({
    resolver: zodResolver(signUpFormSchema),
  });

  // 비밀번호 보이기/숨기기 토글
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordConfirmVisibility = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  // 회원가입 완료 & 회원가입 완료 페이지로 이동
  const signupHandler: SubmitHandler<SignUpFormInputDTO> = () => {
    navigate('/signup-complete');
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center p-4 my-[100px]">
        <h2 className="text-center text-[32px] font-extrabold my-4">회원가입</h2>
        <form
          onSubmit={handleSubmit(signupHandler)}
          className="w-full max-w-md  px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-10">
            <Label className="font-bold" htmlFor="email">
              이메일
            </Label>
            <Input
              type="email"
              {...register('email')}
              placeholder="이메일 주소"
              className="self-stretch mt-2 flex-grow overflow-hidden gap-2.5 px-6 py-3.5 rounded bg-white border border-[#e1e1e1]"
            />
            <p className="text-red-500 text-xs italic">{errors.email?.message}</p>
          </div>

          <div className="mb-4">
            <Label className="font-bold" htmlFor="password">
              비밀번호
            </Label>

            <div className="relative mt-2">
              <Input
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                placeholder="8자 이상, 영문자, 숫자, 특수기호중 2가지 조합"
                className="self-stretch  flex-grow overflow-hidden gap-2.5 px-6 py-3.5 rounded bg-white border border-[#e1e1e1]"
              />
              <TogglePasswordVisibleButton
                isVisible={showPassword}
                onToggle={togglePasswordVisibility}
              />
              <p className="text-red-500 text-xs italic">{errors.password?.message}</p>
            </div>
          </div>
          <div className="relative mb-10">
            <Input
              type={showPasswordConfirm ? 'text' : 'password'}
              {...register('passwordConfirm')}
              placeholder="비밀번호를 다시 입력해주세요"
              className="self-stretch flex-grow overflow-hidden gap-2.5 px-6 py-3.5 rounded bg-white border border-[#e1e1e1]"
            />
            <TogglePasswordVisibleButton
              isVisible={showPasswordConfirm}
              onToggle={togglePasswordConfirmVisibility}
            />
            <p className="text-red-500 text-xs italic">{errors.passwordConfirm?.message}</p>
          </div>
          <div className="mb-10">
            <Label className="font-bold" htmlFor="nickname">
              닉네임
            </Label>
            <Input
              {...register('nickname')}
              placeholder="닉네임을 입력해주세요"
              className="self-stretch mt-2 flex-grow overflow-hidden gap-2.5 px-6 py-3.5 rounded bg-white border border-[#e1e1e1]"
            />
            <p className="text-red-500 text-xs italic">{errors.nickname?.message}</p>
          </div>
          <div className="flex items-center space-x-2 mb-20 ">
            <Checkbox id="terms" className="w-6 h-6 rounded-md " required />
            <label
              htmlFor="terms"
              className="flex flex-row text-sm mobile:text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              <p className="flex-grow-0 flex-shrink-0 text-base mobile:text-xs font-medium text-left text-[#505050]">
                개인정보 처리방침 / 데이터 활용 동의
              </p>
              <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 w-[41px] relative gap-2.5">
                <p className="flex-grow w-[41px] text-base mobile:text-xs text-left text-[#9a9a9a] ">
                  (필수)
                </p>
              </div>
            </label>
          </div>
          <div className="flex items-center justify-center ">
            <Button type="submit" className="w-1/3">
              회원가입
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default SignUpPage;
