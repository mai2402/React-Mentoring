import { useMutation } from "@tanstack/react-query";
import { editSession } from "../services/sessions/session";
import AddEditSessionForm from "../components/sessions/AddEdiSessionForm";



export function useEditAddSession (){

    return useMutation({
        mutationFn:  async ()=>{
            await editSession(sessionId:string, formData: AddEditSessionForm)
        
        }
    })
}