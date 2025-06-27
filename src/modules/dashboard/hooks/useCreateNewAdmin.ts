import { useMutation } from "@tanstack/react-query";
import { CreateAdminFormData } from "../validation/createAdminForm";
import { createNewAdmin } from "../services/adminServices";
import toast from "react-hot-toast";



export function useCreateNewAdmin (onSuccess?: () => void){

   return useMutation<
       void,               
       Error,             
       CreateAdminFormData      
     > ({
        mutationFn: 
                async (formData) => {
                    await createNewAdmin(formData)
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