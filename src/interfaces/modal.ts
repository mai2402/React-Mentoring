import { ReactNode } from "react";
import { Session } from "./session";
import { BookingDTO } from "./booking/booking-dto";


 export interface ModalProps {

   children?: ReactNode;
   isOpen?: boolean;
   onClose?: ()=>void;
   title?: string;
   scrollable?: boolean;
   modalClassName?: string;
   containerClassName?: string;
 }


 export interface LoginModalProps {
    isOpen:boolean;
   onClose?: ()=> void;
   sessionId?: string;


 }

 export interface ConfirmModalProps extends ModalProps {
   onConfirm: () => void;
   onCancel?: () => void;
 }


 export interface BookingModalProps extends LoginModalProps {
     loadedSession: Partial<Session>;
     editBooking? : BookingDTO;
 }