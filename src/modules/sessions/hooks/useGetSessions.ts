import { useQuery } from "@tanstack/react-query";
import { getSessions } from "../services/sessions";



export function useGetSessions(filter:string, sort: string){


  console.log("Fetching sessions with filter:", filter, "and sort:", sort);
   return useQuery({
     queryKey: ['sessions',filter, sort],
     queryFn: () => getSessions(filter, sort),
    });

  

}