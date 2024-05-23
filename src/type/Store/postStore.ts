type Post = {
  title: string;
  hashtags: string[];
  user_id: string;
  author: string;
  created_at: Date;
  views: number;
  content: string;
  file_attachment: string | null;
};

export type PostStoreDTO = {
  post: Post | null;
  postId: number | null;
  setPost: (post: Post) => void;
  setPostId: (id: number) => void;
  clearPost: () => void;
};
