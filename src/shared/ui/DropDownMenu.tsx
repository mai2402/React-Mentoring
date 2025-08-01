import { ReactNode, useEffect, useRef, useState } from "react";

interface DropDownMenuProps {
    trigger: ReactNode;
    children: ReactNode;
    className?: string;
}

export function DropDownMenu({children, trigger, className}:DropDownMenuProps){
    const[isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    }

    useEffect(()=>{
        // Add event listener to close the menu when clicking outside
        const handleClickOutside = (e: MouseEvent)=>{
            if(menuRef.current && !menuRef.current.contains(e.target as Node)){
                setIsOpen(false);
            } 
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    },[]);


    return(
        <div className={`dropdown-menu ${className}`} ref={menuRef}>
            <div className="dropdown-menu__trigger" onClick={toggleMenu}>
                {trigger}
            </div>
            {isOpen && (
                <div className="dropdown-menu__content">
                    {children}
                </div>
            )}
        </div>
    )
}