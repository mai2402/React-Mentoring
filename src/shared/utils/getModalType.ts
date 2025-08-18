import { UserRole } from "../../modules/user/enums/users";
import { UserProfile } from "../../modules/user/interface/user";


type ModalType = "delete" | "toggleActive" | "changeRole" | null;

export function getModals({
  modalType,
  targetUser,
  setModalType,
  handleDelete,
  handleToggleActive,
  handleChangeRole,
}: {
  modalType: ModalType;
  targetUser: UserProfile | null;
  setModalType: (type: ModalType) => void;
  handleDelete: () => void;
  handleToggleActive: () => void;
  handleChangeRole: () => void;
}) {
  return [
    {
      type: "delete",
      isOpen: modalType === "delete",
      title: "Delete User",
      cancelLabel: "Cancel",
      message: "Are you sure you want to delete this user?",
      confirmLabel: "Yes, Delete",
      onConfirm: handleDelete,
      onCancel: () => setModalType(null),
    },
    {
      type: "toggleActive",
      isOpen: modalType === "toggleActive",
      cancelLabel: "Cancel",
      title: targetUser?.isActive ? "Deactivate User" : "Activate User",
      message: `Are you sure you want to ${
        targetUser?.isActive ? "deactivate" : "activate"
      } this user?`,
      confirmLabel: targetUser?.isActive
        ? "Yes, Deactivate"
        : "Yes, Activate",
      onConfirm: handleToggleActive,
      onCancel: () => setModalType(null),
    },
    {
      type: "changeRole",
      isOpen: modalType === "changeRole",
      title: "Change User Role",
      message: targetUser?.role === UserRole.ADMIN
        ? "Are you sure you want to make this user a regular user?"
        : "Are you sure you want to make this user an admin?",
      confirmLabel: targetUser?.role === UserRole.ADMIN ? "Yes, Make User" : "Yes, Make Admin",
      cancelLabel: "Cancel",
      onConfirm: handleChangeRole,
      onCancel: () => setModalType(null),
    },
  ];
}
