import { useMutation } from "@tanstack/react-query";
import { addNewSession } from "../services/sessions/session";
import { Session } from "../../sessions/interfaces/session";
import toast from "react-hot-toast";



export function useAddSession (onSuccess?:()=> void){
    

    return useMutation({
        mutationFn:  async (newSession: Session)=>{
            await addNewSession(newSession)
        },

        onSuccess: ()=>{
            toast.success("Session Created Successfully!!");
            if (onSuccess) {
                onSuccess();
            }
        },
        onError :(err) =>{
            console.error(err)
            toast.error("Failed to create Session!!! please try again ")
        }
        }
    )
}