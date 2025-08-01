import { useQuery } from "@tanstack/react-query";
import { getSessions } from "../services/sessions";

export interface Filters {
  level?: string[];
}

export function useGetSessions(filters:Filters, sort: string){


 
   return useQuery({
     queryKey: ['sessions',filters, sort],
     queryFn: () => getSessions(filters, sort),
    });

  

}