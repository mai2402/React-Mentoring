import { DropDownItemProps } from "../interface/dropdown";
import Button from "./Button";



export default function DropDownItem ({to, onClick, textOnly, children}:DropDownItemProps){


    return (
        <ul>
            <li>
                <Button  to={to} onClick={onClick} textOnly={textOnly}>
                    {children}
                </Button>
            </li>
        </ul>

    )
}