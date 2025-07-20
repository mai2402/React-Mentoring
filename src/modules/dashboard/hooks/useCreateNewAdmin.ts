import { useMutation } from "@tanstack/react-query";
import { CreateAdminFormData } from "../validation/createAdminForm";
import { createAdmin } from "../services/adminServices";
import toast from "react-hot-toast";



export function useCreateNewAdmin (onSuccess?: () => void){

   return useMutation<
       void,               
       Error,             
       CreateAdminFormData      
     > ({
        mutationFn: 
                async (formData) => {
                    await createAdmin(formData)
                },
        onSuccess:() => {
        onSuccess?.();
      },
      onError: (err: any) => {
        console.error(err);
        toast.error(err.message || "Something went wrong!");
      },
   })
     
}