import { useEffect, useRef, useState } from "react";
import { useAuthenticationContext } from "../../core/store/authContext";


export function useDropDownModal (){
    const{isAuthenticated} = useAuthenticationContext();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);


    const handleOpenModal = () => [
        setMenuOpen(v => !v)
    ]

    useEffect(() => {
    const handleClickOutside = (e: MouseEvent)=> {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isAuthenticated]);


  return {handleOpenModal, menuOpen, menuRef}

}