
import { ReactNode } from "react";
import { ButtonSizes, ButtonVariations } from "../enums/buttons";



export interface CustomButtonStyle {
  variation: ButtonVariations;
  size?: ButtonSizes;
}

export interface BaseProps {
  ui?: CustomButtonStyle;                 
  block?: boolean;
  textOnly?: boolean;
  className?: string;
  children: ReactNode;
   disabled?: boolean;
}

