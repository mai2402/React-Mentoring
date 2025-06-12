import { useNavigate } from "react-router-dom";
import { LoginModal } from "../components/modals/LoginModal";
import { useState } from "react";



export default function Login() {
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();
   

    const handleClose = () => {
        setIsOpen(false)
        navigate("/"); 
    }


    return (
        <LoginModal isOpen={isOpen} onClose={handleClose} />

       
    );
}