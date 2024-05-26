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
  boardType: string;
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

export type PostCountByDateDTO = {
  date: string;
  count: number;
};

export type DashBoardHeaderDTO = {
  selectedBoard: string;
  onBoardSelect: (board: string) => void;
};
