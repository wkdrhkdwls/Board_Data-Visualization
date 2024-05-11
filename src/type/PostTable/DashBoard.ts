export type PostDTO ={
  id: number;
  title: string;
  content: string;
  file_attachment: string;
  hastags: string[];
  author: string;
  created_at: Date;
  views: number;
}

export type DashBoardTableDTO ={
  posts: PostDTO[];
  totalPages: number;
  currentPage: number;
  handlePrevious: () => void;
  handleNext: () => void;
  setCurrentPage: (page: number) => void;
}

export type FetchDataDTo ={
  posts: PostDTO[];
  total: number;
}
