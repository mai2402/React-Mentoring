
import { supabase } from "../../../core/supabase/client";



export async function getSessions(_: string, sort: string = "Newest") {
  let query  = supabase.from('sessions').select('*');
  

  // Apply sorting based on the sort parameter
  switch (sort) {
    case "date_desc":
      query = query.order('date', { ascending: false });
      break;
    case "date_asc":
      query = query.order('date', { ascending: true });
      break;
    case "title_asc":
      query = query.order('title', { ascending: true });
      break;
    case "title_desc":
      query = query.order('title', { ascending: false });
      break;
    case "duration_asc":
      query = query.order('duration', { ascending: true });
      break;
    case "duration_desc":
      query = query.order('duration', { ascending: false });
      break;
    default:
      query = query.order('date', { ascending: false });
  }

  // Execute the query
  const { data: sessions, error } = await query;
  if (error) {
    console.error("Error fetching sessions:", error.message);
    return [];
  }
  return sessions || [];
}
 
 






