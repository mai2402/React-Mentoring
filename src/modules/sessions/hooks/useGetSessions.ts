import { useQuery } from "@tanstack/react-query";
import { getSessions } from "../services/sessions";


export function useGetSessions(){

   return useQuery({
     queryKey: ['sessions'],
     queryFn: getSessions
    });

  

}