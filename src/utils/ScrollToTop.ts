import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// 사용자가 다른 페이지로 이동할 때마다 페이지 맨 위로 스크롤
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
