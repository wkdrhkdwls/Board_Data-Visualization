import { debounce } from 'lodash';
import { RefObject, useEffect, useState } from 'react';

export const useResize = (ref: RefObject<HTMLDivElement>) => {
  // 상태를 초기화 (너비와 높이를 0으로 설정)
  const [state, setState] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // 사이즈를 얻는 함수
    // debounce를 사용하여 리사이징 중에는 함수가 호출되지 않도록 설정
    const getSize = debounce(() => {
      // ref가 없거나 ref의 current가 없으면 함수 종료
      if (!ref || !ref.current) {
        return;
      }
      // ref의 너비와 높이를 얻어 상태를 업데이트
      const width = ref.current.offsetWidth;
      const height = ref.current.offsetHeight;
      setState({
        width,
        height,
      });
    }, 300);

    // 리사이즈 이벤트를 추가하고 초기 사이즈를 얻음
    window.addEventListener('resize', getSize);

    // 초기 사이즈 설정을 위한 호출
    getSize();
    return () => window.removeEventListener('resize', getSize);
  }, [ref]);
  return state;
};
