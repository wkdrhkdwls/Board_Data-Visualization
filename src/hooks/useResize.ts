import { debounce } from 'lodash';
import { RefObject, useEffect, useState } from 'react';

export const useResize = (ref: RefObject<HTMLDivElement>) => {
  const [state, setState] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const getSize = debounce(() => {
      if (!ref || !ref.current) {
        return;
      }
      const width = ref.current.offsetWidth;
      const height = ref.current.offsetHeight;
      setState({
        width,
        height,
      });
    }, 300);

    window.addEventListener('resize', getSize);
    getSize();
    return () => window.removeEventListener('resize', getSize);
  }, [ref]);
  return state;
};
