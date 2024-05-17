import { PostStoreDTO } from '@/type/Store/postStore';
import { create } from 'zustand';

const usePostStore = create<PostStoreDTO>((set) => ({
  post: null,
  postId: null,
  setPost: (post) => set({ post }),
  setPostId: (id) => set({ postId: id }),
  clearPost: () => set({ post: null, postId: null }),
}));

export default usePostStore;
