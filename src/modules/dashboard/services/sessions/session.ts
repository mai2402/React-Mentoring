import { supabase } from "../../../../core/supabase/client";
import { Session } from "../../../sessions/interfaces/session";



export async function addEditSession(session: Session) {

 
const { data: existingSession } = await supabase
  .from("sessions")
  .select("id")
  .eq("id", session.id)
  .order("created_at", { ascending: true })
  .maybeSingle();
  

  const isEdit = !!session.id || !!existingSession;

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
 

  const { id, ...sessionWithoutId } = session; // Remove id if it exists
 
  
  const { data, error } = await supabase
    .from("sessions")
    .insert([sessionWithoutId])
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