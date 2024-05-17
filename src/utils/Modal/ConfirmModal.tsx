import { ConfirmModalDTO } from '@/type/Modal/DeleteModal';
import ReactModal from 'react-modal';
import '@/styles/customModalStyles.css';
import { Button } from '@/components/ui/button';

const ConfirmModal = ({ title, content, isOpen, onRequestClose }: ConfirmModalDTO) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="react-modal-content"
      overlayClassName="react-modal-overlay"
      ariaHideApp={false}
    >
      <div className="text-center">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-4 text-sm">{content}</p>
        <Button onClick={onRequestClose} className="bg-black text-white py-2 px-4 rounded">
          확인
        </Button>
      </div>
    </ReactModal>
  );
};

export default ConfirmModal;
