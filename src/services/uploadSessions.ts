
import { SESSIONS } from "../dummy-sessions";
import { supabase } from "../supabase/client";


export async function deleteSessions() {
  const { error } = await supabase.from("sessions").delete().gt("id", 0);
  if (error) console.log(error.message);
}

export async function createSessions() {
  const simplifiedSessions = SESSIONS.map(({ image, ...session }) => ({
    ...session,
    image: image.split("/").pop(), // just the filename if needed
  }));

  const { error } = await supabase.from("sessions").insert(simplifiedSessions);
  if (error) console.log(error.message);
}




