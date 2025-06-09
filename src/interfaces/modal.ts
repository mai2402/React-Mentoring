import { ReactNode } from "react";
import { Session } from "./session";


 export interface ModalProps {

   children: ReactNode;
   isOpen: boolean;
   onClose?: ()=>void;
   title?: string;
   scrollable?: boolean;
 }


 export interface LoginModalProps {
    isOpen:boolean;
   onClose: ()=> void;
   sessionId?: string;
 }


 export interface BookingModalProps extends LoginModalProps {
     loadedSession: Partial<Session>;
 }