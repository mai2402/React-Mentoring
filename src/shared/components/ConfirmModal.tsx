import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { ConfirmModalProps } from "../interface/modal";

export default function ConfirmModal({
  onConfirm,
  onCancel,
  title,
  onClose,
  isOpen,
  message,
  confirmLabel,
  cancelLabel,
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
         {message}
        </p>
        <div className="confirm__modal--actions">
          <Button className="cancel-btn" onClick={onConfirm}>{confirmLabel}</Button>
          <Button className="cancel-btn--text " onClick={onCancel} textOnly>
           {cancelLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
