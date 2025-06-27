import { useNavigate } from "react-router-dom";
import { useAuthenticationContext } from "../../core/store/authContext";
import { LoginFormData } from "../../modules/sessions/validation/session";
import * as authService from "../../core/services/authService";
import toast from "react-hot-toast";
import { getRedirectPath } from "../utils/getRedirectPath";


export function useHandleLogin (sessionId?: string){
    const { login} = useAuthenticationContext();
    const navigate = useNavigate()
    

    return async function handleLogin(formData:LoginFormData) {
    
          try{
             const {email, password} = formData;
             const {role} = await authService.login(email,password)
          
             await  login(email,password);
             // helper function to check whether admin or user to return the correct path to redirect
             const path = getRedirectPath(role, sessionId!);
             navigate(path);
        
    
            
          }
          catch(err){
            toast.error("Login failed. Please check your credentials and try again.");
            console.error("Login error:", err);
          }
          
    
}

}