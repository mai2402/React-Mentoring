import { ReactNode } from "react";


export interface DropDownItemProps {
    onClick?: () => void;
    to? : string;
    children: ReactNode;
    textOnly? : boolean;
}