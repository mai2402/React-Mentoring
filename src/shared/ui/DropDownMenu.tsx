import { ReactNode, useEffect, useRef, useState } from "react";

interface DropDownMenuProps {
    trigger: ReactNode;
    children: ReactNode;
    className?: string;
    align?: "left" | "right";
}

export function DropDownMenu({children, trigger, className, align}:DropDownMenuProps){
    const[isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    }

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
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {trigger}
      </div>

      {isOpen && (
        <div
          className={`dropdown__menu dropdown--align-${align}`}
        >
          {children}
        </div>
      )}
    </div>
    )
}