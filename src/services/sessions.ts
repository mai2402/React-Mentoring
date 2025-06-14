import { BookingDTO } from "../interfaces/booking/booking-dto";
import { supabase } from "../supabase/client";



export async function getSessions(){
    
const { data: sessions, error } = await supabase
  .from('sessions')
  .select('*')

  if (error) {
    console.error("Error fetching sessions:", error.message);
    return [];
  }
    return sessions || [];

}






