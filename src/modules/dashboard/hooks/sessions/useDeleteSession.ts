import { useMutation } from "@tanstack/react-query";
import { deleteSession } from "../services/sessions/session";
import toast from "react-hot-toast";
import { ZodUUID } from "zod/v4";




export function useDeleteSession (onSuccess?: ()=> void){

    return useMutation({
        mutationFn: async (sessionId: ZodUUID)=> {
          
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