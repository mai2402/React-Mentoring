// CUSTOM BUTTON INTERFACES

import { InputHTMLAttributes, type ReactNode } from "react";
import { CustomButtonType } from "./types";


 export interface CustomButtonProps {
    to?: string;
    onClick?: () => void;
    type?: CustomButtonType;
    children: ReactNode;
    textOnly?: boolean;
    className?: string;

 }



 //CUSTOM INPUT INTERFACE
 

 export interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    
 } 


 //SESSION CARD INTERFACE


 export interface Session {
    id: string;
    title: string;
    summary:string;
    description: string;
    date: string; // TODO: Change to Date type if needed
    image: string;
 }


 export interface SessionCardProps {
   session: Session;
 }



 export interface ModalProps {
   children: ReactNode;
   title?: string;
 }

