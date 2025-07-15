import { ReactNode } from "react";
import { Session } from "../../modules/sessions/interfaces/session";
import { BookingDTO } from "../../modules/bookings/interfaces/booking-dto";
import { ZodUUID } from "zod/v4";

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
  sessionId?: ZodUUID;
}

/** Confirmation modal props (extends base + title) */
export interface ConfirmModalProps extends ModalProps {
  onConfirm: () => void;
  onCancel?: () => void;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

/** Booking modal props (edit/create mode) */
export interface BookingModalProps extends BaseModalProps {
  loadedSession: Partial<Session>;
  editBooking?: BookingDTO;
}
