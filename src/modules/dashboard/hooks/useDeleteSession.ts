import { useMutation } from "@tanstack/react-query";
import { deleteSession } from "../services/sessions/session";
import toast from "react-hot-toast";




export function useDeleteSession (onSuccess?: ()=> void){

    return useMutation({
        mutationFn: async (sessionId: string)=> {
          
             await deleteSession(sessionId)
        },

        onSuccess: ()=>{
            if(onSuccess) onSuccess();
        },

        onError: (err)=>{
            console.error(err)
            toast.error("failed to delete session!! please try again ")
        }
    })
}