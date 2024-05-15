import { DeleteModalDTO } from '@/type/Modal/DeleteModal';
import ReactModal from 'react-modal';
import '@/styles/customModalStyles.css';
import { Button } from '@/components/ui/button';

const DeleteModal = ({
  title,
  content,
  modalOpen,
  setModalOpen,
  onClose,
  onDelete,
}: DeleteModalDTO) => {
  return (
    <ReactModal
      isOpen={modalOpen}
      onRequestClose={() => setModalOpen(false)}
      className="react-modal-content"
      overlayClassName="react-modal-overlay"
    >
      <p className="flex-grow-0 flex-shrink-0 text-lg font-bold text-center text-black">{title}</p>
      <p className="flex-grow-0 flex-shrink-0 text-base text-center text-[#414040]">{content}</p>
      <div className="flex flex-row gap-2 justify-end">
        <Button className="bg-[#CFCFCF]" onClick={onClose}>
          취소
        </Button>
        <Button onClick={onDelete}>삭제</Button>
      </div>
    </ReactModal>
  );
};

export default DeleteModal;
