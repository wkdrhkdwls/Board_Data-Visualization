export type CreatePostFormProps = {
  BoardType: string;
};

export type CreatePostFormDataDTO = {
  title: string;
  content: string;
  fileAttachment: string;
  hashtags: string;
};

export type FileInputDTO = {
  fileLabel: string;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  openFileSelector: () => void;
};
