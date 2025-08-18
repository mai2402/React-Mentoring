
import { UserRole } from "../../modules/user/enums/users";
import { UserProfile } from "../../modules/user/interface/user";
import { getChangeRoleConfirm, getChangeRoleMessage, getToggleActiveConfirm, getToggleActiveMessage, getToggleActiveTitle, ModalLabel, ModalMessage, ModalTitle, ModalType } from "../enums/modals";




type ModalKind = ModalType | null;

export function getModals({
  modalType,
  targetUser,
  setModalType,
  handleDelete,
  handleToggleActive,
  handleChangeRole,
}: {
  modalType: ModalKind;
  targetUser: UserProfile | null;
  setModalType: (type: ModalKind) => void;
  handleDelete: () => void;
  handleToggleActive: () => void;
  handleChangeRole: () => void;
}) {
  const isActive = targetUser?.isActive;
  const role = targetUser?.role as UserRole | undefined;

  return [
    {
      type: ModalType.Delete,
      isOpen: modalType === ModalType.Delete,
      title: ModalTitle.Delete,
      message: ModalMessage.ConfirmDelete,
      cancelLabel: ModalLabel.Cancel,
      confirmLabel: ModalLabel.YesDelete,
      onConfirm: handleDelete,
      onCancel: () => setModalType(null),
    },
    {
      type: ModalType.ToggleActive,
      isOpen: modalType === ModalType.ToggleActive,
      title: getToggleActiveTitle(isActive),
      message: getToggleActiveMessage(isActive),
      cancelLabel: ModalLabel.Cancel,
      confirmLabel: getToggleActiveConfirm(isActive),
      onConfirm: handleToggleActive,
      onCancel: () => setModalType(null),
    },
    {
      type: ModalType.ChangeRole,
      isOpen: modalType === ModalType.ChangeRole,
      title: ModalTitle.ChangeRole,
      message: getChangeRoleMessage(role),
      cancelLabel: ModalLabel.Cancel,
      confirmLabel: getChangeRoleConfirm(role),
      onConfirm: handleChangeRole,
      onCancel: () => setModalType(null),
    },
  ] as const;
}