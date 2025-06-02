// CUSTOM BUTTON INTERFACES

import { InputHTMLAttributes, type ReactNode } from "react";
import { CustomButtonType, CustomFormType } from "./types";
import { UseFormRegister, FieldValues, SubmitHandler, UseFormReturn, DefaultValues } from "react-hook-form";
import { ZodSchema, ZodTypeDef } from "zod";
import { ZodType } from "zod/v4";


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

 export interface SessionDetailsProps {
    loadedSession: Session | null;
   onLearnMoreClick: () => void;
  }


 export interface ModalProps {
   children: ReactNode;
   title?: string;
   scrollable?: boolean;
 }



 // EMPTY CONTENT 

export interface EmptyContentProps {
   children: ReactNode;
   title?: string;
   className?: string;
 }


 // BOOKING FORM DATA INTERFACE

 export interface BookingFormData {
   name: string;
   email: string;
   phone: string;
 }

 // CUSTOM FORM PROPS
export interface CustomFormProps<T extends Record<string, any>> {
  children: (methods: UseFormReturn<T>)=> ReactNode;
  onSubmit: (data: T, methods: UseFormReturn<T>) => void;
  schema: ZodSchema<T, ZodTypeDef, T>
  defaultValues: DefaultValues<T>;
}