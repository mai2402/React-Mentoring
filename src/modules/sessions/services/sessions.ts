
import { supabase } from "../../../core/supabase/client";
import { Filters } from "../hooks/useGetSessions";



export async function getSessions(filters: Filters = {}, sort: string = "Newest") {
  // Initialize the query
  let query  = supabase.from('sessions').select('*');
  
  // Mapping for sorting
  const sortMap: Record<string, { column: string; ascending: boolean }> = {
    date_desc: { column: "date", ascending: false },
    date_asc: { column: "date", ascending: true },
    title_asc: { column: "title", ascending: true },
    title_desc: { column: "title", ascending: false },
    duration_asc: { column: "duration", ascending: true },
    duration_desc: { column: "duration", ascending: false },
  };

  // Apply sorting based on the sort parameter
  const sortOption = sortMap[sort];
  if (sortOption) {
    query = query.order(sortOption.column, { ascending: sortOption.ascending });
  } else {
    // Default sorting if no valid sort option is provided
    query = query.order("date", { ascending: false });
  }

  // Apply filtering based on the filter parameter
  if (filters.level && filters.level.length > 0 ) {
    query = query.in("level", filters.level);
  }

  // Execute the query
  const { data: sessions, error } = await query;
  if (error) {
    console.error("Error fetching sessions:", error.message);
    return [];
  }
  return sessions || [];
}
 
 






