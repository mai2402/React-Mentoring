import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { Session } from "../../../sessions/interfaces/session";
import { addEditSession } from "../../services/sessions/session";



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