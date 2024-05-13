export type PostDTO = {
  id: number;
  title: string;
  content: string;
  file_attachment: string;
  hashtags: string[];
  author: string;
  created_at: Date;
  views: number;
  user_id: string;
};

export type DashBoardTableDTO = {
  posts: PostDTO[];
  totalPages: number;
  currentPage: number;
  handlePrevious: () => void;
  handleNext: () => void;
  setCurrentPage: (page: number) => void;
  goPostDetail: (postId: number) => void;
  isLoading: boolean;
};

export type FetchDataDTo = {
  posts: PostDTO[];
  total: number;
};
