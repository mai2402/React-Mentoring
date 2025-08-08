import { ReactNode, useEffect, useRef, useState } from "react";

type DropDownMenuChildren = ((close: () => void) => ReactNode) | ReactNode;
interface DropDownMenuProps {
    trigger: ReactNode;
    children: DropDownMenuChildren;
    className?: string;
    align?: "left" | "right";
}

export function DropDownMenu({children, trigger, className, align}:DropDownMenuProps){
    const[isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    }
    const closeMenu = () => setIsOpen(false); 


    useEffect(()=>{
        // Add event listener to close the menu when clicking outside
        const handleClickOutside = (e: MouseEvent)=>{
            if(dropdownRef.current && !dropdownRef.current.contains(e.target as Node)){
                setIsOpen(false);
            } 
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    },[]);


    return(
        <div
      className={`dropdown ${className} ${isOpen ? "dropdown--open" : ""}`}
      ref={dropdownRef}
    >
      <div
        className="dropdown__trigger"
        onClick={toggleMenu}
      >
        {trigger}
      </div>

      {isOpen && (
        <div
          className={`dropdown__menu dropdown--align-${align}`}
        >
         {typeof children === "function" ? children(closeMenu) : children}
        </div>
      )}
    </div>
    )
}