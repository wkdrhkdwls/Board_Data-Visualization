export type DeleteModalDTO = {
  title: string;
  content: string;
  modalOpen: boolean;
  setModalOpen: (value: boolean) => void;
  onClose: () => void;
  onDelete: () => void;
  commentId?: number;
};
