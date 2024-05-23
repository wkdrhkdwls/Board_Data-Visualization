import { ReplyType } from '@/type/Comment/comment';

export type ReplyDTO = {
  id: number;
  nickname: string;
  content: string;
  created_at: string;
  user_id: string;
};
export type ReplyFormDataDTO = {
  replyContent: string;
};
export type ReplyFormPropsDTO = {
  onSubmit: (data: { replyContent: string }) => void;
};

export type ReplyItemProps = {
  reply: ReplyType;
  userId: string | null;
  showOptions: Record<number, boolean>;
  toggleOptions: (replyId: number) => void;
  openDeleteModal: (replyId: number) => void;
};
