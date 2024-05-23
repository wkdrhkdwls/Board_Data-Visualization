import { PageDTO } from '@/type/Store/pageStore';
import { create } from 'zustand';

const usePageStore = create<PageDTO>((set) => ({
  // 현재 페이지 상태 초기값 설정
  currentPage: 1,

  // 현재 페이지를 설정하는 함수
  setCurrentPage: (page) =>
    set((state) => ({
      // 페이지가 함수인 경우 현재 페이지를 인수로 호출, 그렇지 않으면 페이지 값을 직접 설정
      currentPage: typeof page === 'function' ? page(state.currentPage) : page,
    })),
}));

export default usePageStore;
