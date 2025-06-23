import { useNavigate } from "react-router-dom";
import { useModal } from "../../../shared/hooks/useModal";
import { useEffect } from "react";
import { LoginModal } from "../../../shared/components/LoginModal";




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