import { BookingDTO } from "../../modules/bookings/interfaces/booking-dto";

export type Base ={
    isOpen: boolean;
    onClose?: () => void;
}



/** Booking modal props (edit/create mode) */

export type BookingModalProps = 
 | Base & {mode: 'create', sessionId: string, editBooking?: never}
 | Base & {mode: 'edit', sessionId?: never, editBooking: BookingDTO}


 export type ModalBookingState =
  | { mode: "create"; sessionId: string }
  | { mode: "edit"; booking: BookingDTO };
 