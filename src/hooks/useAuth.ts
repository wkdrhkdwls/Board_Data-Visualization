import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { supabase } from '@/hooks/supabase';
import { AuthData } from '@/type/Hook/useAuth';

export const useAuth = () => {
  const [cookies] = useCookies(['access_token']);
  const [authData, setAuthData] = useState<AuthData>({
    userId: null,
    accessToken: '',
    nickname: '',
  });

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const accessToken = cookies.access_token;

    const fetchNickname = async () => {
      if (!userId || !accessToken) {
        console.error('No user ID or access token available.');
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('nickname')
          .eq('user_id', userId)
          .single();

        if (error) throw error;

        setAuthData({
          userId,
          accessToken,
          nickname: data?.nickname || '',
        });
      } catch (error) {
        console.error('Error fetching nickname:', error);
      }
    };

    fetchNickname();
  }, [cookies.access_token]);

  return authData;
};
