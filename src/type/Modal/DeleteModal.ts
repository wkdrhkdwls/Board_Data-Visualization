export type DeleteModalDTO = {
  title: string;
  content: string;
  modalOpen: boolean;
  setModalOpen: (value: boolean) => void;
  onClose: () => void;
  onDelete: () => void;
  commentId?: number;
};

export type ConfirmModalDTO = {
  title: string;
  content: string;
  isOpen: boolean;
  onRequestClose: () => void;
};
