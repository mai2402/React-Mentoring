import { useQuery } from "@tanstack/react-query";
import { getSessionById } from "../services/sessions";



export function useGetSession(id: string) {

    return useQuery({
        queryKey: ['session', id],
        queryFn: () => getSessionById(id)
    });
}