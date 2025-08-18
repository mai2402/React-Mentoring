import { UserRole } from "../../modules/user/enums/users";

export enum ModalType {
  Delete = "delete",
  ToggleActive = "toggleActive",
  ChangeRole = "changeRole",
}

export enum ModalTitle {
  Delete = "Delete User",
  Activate = "Activate User",
  Deactivate = "Deactivate User",
  ChangeRole = "Change User Role",
}

export enum ModalMessage {
  ConfirmDelete = "Are you sure you want to delete this user?",
  ConfirmActivate = "Are you sure you want to activate this user?",
  ConfirmDeactivate = "Are you sure you want to deactivate this user?",
  ConfirmMakeAdmin = "Are you sure you want to make this user an admin?",
  ConfirmMakeUser = "Are you sure you want to make this user a regular user?",
}

export enum ModalLabel {
  Cancel = "Cancel",
  YesDelete = "Yes, Delete",
  YesActivate = "Yes, Activate",
  YesDeactivate = "Yes, Deactivate",
  YesMakeAdmin = "Yes, Make Admin",
  YesMakeUser = "Yes, Make User",
}

// Helpers for dynamic text
export const getToggleActiveTitle = (isActive?: boolean) =>
  isActive ? ModalTitle.Deactivate : ModalTitle.Activate;

export const getToggleActiveMessage = (isActive?: boolean) =>
  isActive ? ModalMessage.ConfirmDeactivate : ModalMessage.ConfirmActivate;

export const getToggleActiveConfirm = (isActive?: boolean) =>
  isActive ? ModalLabel.YesDeactivate : ModalLabel.YesActivate;

export const getChangeRoleMessage = (role?: UserRole) =>
  role === UserRole.ADMIN ? ModalMessage.ConfirmMakeUser : ModalMessage.ConfirmMakeAdmin;

export const getChangeRoleConfirm = (role?: UserRole) =>
  role === UserRole.ADMIN ? ModalLabel.YesMakeUser : ModalLabel.YesMakeAdmin;