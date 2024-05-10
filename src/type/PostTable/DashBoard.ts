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
