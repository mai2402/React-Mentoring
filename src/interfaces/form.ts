import { ReactNode } from "react";
import { DefaultValues, UseFormReturn } from "react-hook-form";
import { ZodSchema, ZodTypeDef } from "zod";


export interface CustomFormProps<T extends Record<string, any>> {
  children: (methods: UseFormReturn<T>)=> ReactNode;
  onSubmit: (data: T, methods: UseFormReturn<T>) => void;
  schema: ZodSchema<T, ZodTypeDef, T>
  defaultValues: DefaultValues<T>;
}



 export interface BookingFormData {
   name: string;
   phone: string;
 }