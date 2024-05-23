export type PostContentDTO = {
  author: string;
  createdAt: any;
  views: number;
  content: string;
  fileAttachment: string;
};

export type DetailHeaderDTO = {
  title: string;
};

export type PostOptionsDTO = {
  showOptions: boolean;
  toggleOptions: () => void;
  openModal: () => void;
};

export type PostDetailTagsDTO = {
  hashtags: string[];
};
