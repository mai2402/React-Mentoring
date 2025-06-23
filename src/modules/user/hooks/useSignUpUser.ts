import { useMutation } from "@tanstack/react-query";
import { SignUpFormData } from "../../auth/validation/SignUpForm";
import { signUp } from "../../../core/services/authService"
import { updateUserProfile } from "../services/userServices";
import toast from "react-hot-toast";

export function useSignUpUser(onSuccess?: () => void) {
  return useMutation<
    void,               
    Error,             
    SignUpFormData      
  >( {
    mutationFn:

     async (formData) => {

      // 1) create auth user + initial profile row
      await signUp(formData);

    
    },
  
      onSuccess: () => {
        onSuccess?.();
      },
      onError: (err: any) => {
        console.error(err);
        toast.error(err.message || "Something went wrong!");
      },
    }
  );
}
