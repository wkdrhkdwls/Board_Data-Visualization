export type PageDTO = {
  currentPage: number;
  // setCurrentPage: (fn: (currPage: number) => number) => void;
  setCurrentPage: (page: number | ((currPage: number) => number)) => void;
};
