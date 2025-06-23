import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { ConfirmModalProps } from "../interface/modal";

export default function ConfirmModal({
  onConfirm,
  onCancel,
  title,
  onClose,
  isOpen,
}: ConfirmModalProps) {

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen} 
      title={title} 
      modalClassName="confirm__modal"  
      containerClassName="confirm__modal--container">
      <div>
        <p className="confirm__modal--message">
          Are you sure you want to cancel this session?
        </p>
        <div className="confirm__modal--actions">
          <Button className="cancel-btn" onClick={onConfirm}>Yes, Cancel</Button>
          <Button className="cancel-btn--text " onClick={onCancel} textOnly>
            No
          </Button>
        </div>
      </div>
    </Modal>
  );
}
