export interface PostDTO {
  id: number;
  title: string;
  content: string;
  file_attachment: string;
  hastags: string[];
  author: string;
  created_at: Date;
  views: number;
}

export interface DashBoardTableDTO {
  posts: PostDTO[];
  totalPages: number;
  currentPage: number;
  handlePrevious: () => void;
  handleNext: () => void;
  setCurrentPage: (page: number) => void;
}

export interface FetchDataDTo {
  posts: PostDTO[];
  total: number;
}
