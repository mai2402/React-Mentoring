import { useMutation } from "@tanstack/react-query";
import { addEditSession } from "../services/sessions/session";
import { Session } from "../../sessions/interfaces/session";
import toast from "react-hot-toast";



export function useEditAddSession (onSuccess?:(newSession: Session)=> void){
    

    return useMutation({
        mutationFn:  async (session: Session)=>{
            return await addEditSession(session)
        },

        onSuccess: (data)=>{
            
            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError :(err) =>{
            console.error(err)
            toast.error("Failed to save  Session!!! please try again ")
        }
        }
    )
}