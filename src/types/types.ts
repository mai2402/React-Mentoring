// CUSTOM BUTTON TYPES

import {  type ReactNode } from "react";
import {  type LinkProps } from "react-router-dom";
import { Session } from "./interfaces";


 export type CustomButtonBaseProps =  {
    children: ReactNode;
    textOnly? : boolean;
}

 export type LinkButtonProps = CustomButtonBaseProps & {
    to: string;
}
 & LinkProps;

 export type ButtonProps =  CustomButtonBaseProps &{
    onClick?: () => void;
    type?: "button" | "submit" | "reset";

 }& React.ButtonHTMLAttributes<HTMLButtonElement>;

 export type CustomButtonProps = LinkButtonProps | ButtonProps;





///MODAL HANDLER TYPE


export type ModalHandler = {
    onOpen?: () => void;
    onClose?: () => void;
};

export type BookingModalProps =LoginModalProps & {
   loadedSession : Partial<Session>

}

export type LoginModalProps ={
   isOpen:boolean;
   onClose: ()=> void;
}


// CONTEXT TYPE

export type BookingState ={
    sessions : Session[]
}


export type BookingActions =
   | {type: 'ADD_SESSION'; payload: Session | Partial<Session>}
   | {type: 'REMOVE_SESSION'; payload: string} // Assuming payload is session ID

export type BookingContext = {
    
   state : BookingState;
   dispatch: React.Dispatch<BookingActions>;
};

export type CustomButtonType = "button" | "submit" | "reset";
 export type CustomFormType =  "onSubmit" | "onChange" | "onBlur" | "all";