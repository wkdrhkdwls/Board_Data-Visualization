import { PageDTO } from '@/type/Store/pageStore';
import { create } from 'zustand';

const usePageStore = create<PageDTO>((set) => ({
  currentPage: 1,
  setCurrentPage: (page) =>
    set((state) => ({
      currentPage: typeof page === 'function' ? page(state.currentPage) : page,
    })),
}));

export default usePageStore;
