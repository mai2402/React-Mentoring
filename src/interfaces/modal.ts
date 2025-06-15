import { ReactNode } from "react";
import { Session } from "./session";
import { BookingDTO } from "./booking/booking-dto";

/** Base interface for all modal components */
export interface BaseModalProps {
  isOpen: boolean;
  onClose?: () => void;
}

/** Props for the core modal component */
export interface ModalProps extends BaseModalProps {
  title?: string;
  scrollable?: boolean;
  modalClassName?: string;
  containerClassName?: string;
  children?: ReactNode;
}

/** Login modal specific props */
export interface LoginModalProps extends BaseModalProps {
  sessionId?: string;
}

/** Confirmation modal props (extends base + title) */
export interface ConfirmModalProps extends ModalProps {
  onConfirm: () => void;
  onCancel?: () => void;
}

/** Booking modal props (edit/create mode) */
export interface BookingModalProps extends BaseModalProps {
  loadedSession: Partial<Session>;
  editBooking?: BookingDTO;
}
