import { useCookies } from 'react-cookie';
import { supabase } from '@/hooks/supabase';
import { useQuery } from '@tanstack/react-query';

export const useAuth = () => {
  const [cookies] = useCookies(['access_token']);

  // 쿠키에서 access_token 가져오기
  const accessToken = cookies.access_token;
  // 로컬 스토리지에서 userId 가져오기
  const userId = localStorage.getItem('userId');

  // 프로필 정보를 가져오는 쿼리
  const fetchProfile = async (userId: string | null) => {
    if (!userId) {
      return Promise.reject(new Error('No user ID provided'));
    }
    const { data, error } = await supabase
      .from('profiles')
      .select('nickname')
      .eq('user_id', userId)
      .single();

    if (error) {
      throw new Error('Failed to fetch profile: ' + error.message);
    }

    return data;
  };

  // React Query를 사용하여 데이터 가져오기 및 데이터 캐싱
  const { data, error, isLoading } = useQuery({
    queryKey: ['profile', userId],
    queryFn: () => fetchProfile(userId),
    enabled: !!userId && !!accessToken,
    placeholderData: (previousData) => previousData, //이전 데이터 유지
    staleTime: 1000 * 60 * 5, // refresh 5분
    gcTime: 10 * 60 * 1000, //캐시 테이터 10분
  });

  return {
    userId,
    accessToken,
    nickname: data?.nickname,
    isLoading,
    isError: !!error,
    error: error?.message,
  };
};
