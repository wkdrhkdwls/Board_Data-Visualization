import { PostStoreDTO } from '@/type/Store/postStore';
import { create } from 'zustand';

const usePostStore = create<PostStoreDTO>((set) => ({
  // 현재 게시물 상태 초기값 설정
  post: null,

  // 현재 게시물 ID 상태 초기값 설정
  postId: null,

  // 게시물을 설정하는 함수
  setPost: (post) => set({ post }),

  // 게시물 ID를 설정하는 함수
  setPostId: (id) => set({ postId: id }),

  // 게시물과 게시물 ID를 초기값으로 되돌리는 함수
  clearPost: () => set({ post: null, postId: null }),
}));

export default usePostStore;
