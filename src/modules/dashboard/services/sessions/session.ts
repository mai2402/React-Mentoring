import { supabase } from "../../../../core/supabase/client";
import { Session } from "../../../sessions/interfaces/session";



export function addNewSession (){

}


export async function editSession (sessionId: string, payload: Partial<Session>){ 
 
const { data, error } = await supabase
  .from('sessions')
  .update(payload)
  .eq("id", sessionId)
  .select()

    if (error) {
    console.error("Error updating session:", error.message);
    throw error;
  }

  return data;
}



export async function deleteSession (sessionId: string){

    
const { error } = await supabase
  .from('sessions')
  .delete()
  .eq("id", sessionId)

     if (error) {
    console.error("Error deleting session:", error.message);
     }

}