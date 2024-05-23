import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

const ChartHeader = () => {
  // 닉네임을 가져오기 위해 useAuth 훅 사용
  const { nickname } = useAuth();

  return (
    <header className="flex justify-between items-center border-b border-gray-200 px-4 py-2">
      <div className="text-xl font-bold">기본 대시보드</div>
      <div>
        {nickname ? (
          <Button className="text-lg bg-white font-bold text-[#272727] pointer-events-none">
            {nickname}
          </Button>
        ) : (
          <Button
            // onClick={handleLogin}
            className="text-lg bg-white font-bold text-[#272727] border-[1px] border-[#E1E1E1]"
          >
            로그인
          </Button>
        )}
      </div>
    </header>
  );
};

export default ChartHeader;
