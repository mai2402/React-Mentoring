import { useNavigate } from "react-router-dom";
import { LoginModal } from "../components/modals/LoginModal";
import { useEffect, useState } from "react";
import { useModal } from "../hooks/useModal";



export default function Login() {
    const loginModal = useModal();
    const navigate = useNavigate();
   
useEffect(() => {
    loginModal.open();
  }, []);

    const handleClose = () => {
        loginModal.close()
        navigate("/"); 
    }


    return (
        <LoginModal isOpen={loginModal.isOpenModal} onClose={handleClose} />

       
    );
}