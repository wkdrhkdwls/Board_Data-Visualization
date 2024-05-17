export type PostStoreDTO = {
  post: any | null;
  postId: number | null;
  setPost: (post: any) => void;
  setPostId: (id: number) => void;
  clearPost: () => void;
};
