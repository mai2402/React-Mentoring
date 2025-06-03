import { ReactNode } from "react";
import { CustomButtonType } from "../types/button";


 export interface CustomButtonProps {
    to?: string;
    onClick?: () => void;
    type?: CustomButtonType;
    children: ReactNode;
    textOnly?: boolean;
    className?: string;
 }