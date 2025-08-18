import { useNavigate } from "react-router-dom";
import { useModal } from "../../../shared/hooks/useModal";
import { useEffect } from "react";
import { LoginModal } from "../../../shared/components/LoginModal";
import { AppRoute } from "../../../app/enums/routes";




export default function Login() {
    const loginModal = useModal();
    const navigate = useNavigate();
   
useEffect(() => {
    loginModal.open();
  }, []);

    const handleClose = () => {
        loginModal.close()
        navigate(AppRoute.Home); 
    }


    return (
        <LoginModal isOpen={loginModal.isOpenModal} onClose={handleClose} />

       
    );
}