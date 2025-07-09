import { supabase } from "../../../../core/supabase/client";
import { Session } from "../../../sessions/interfaces/session";



export async function addEditSession(session: Session) {

 
const { data: existingSession } = await supabase
  .from("sessions")
  .select("id")
  .eq("id", session.id)
  .maybeSingle();

  const isEdit = !!existingSession;

  if (isEdit) {
    const { data, error } = await supabase
      .from("sessions")
      .update(session)
      .eq("id", session.id)
      .select()
      .single();

    if (error) throw error;
   

    return data;
  }

  // Otherwise, insert
  const { data, error } = await supabase
    .from("sessions")
    .insert([session])
    .select()
    .single();

  if (error) throw error;
  return data;
}








export async function deleteSession (sessionId: string){

const {data , error } = await supabase
  .from('sessions')
  .delete()
  .eq("id", sessionId)

     if (error) {
    console.error("Error deleting session:", error.message);
     }


     return data

}