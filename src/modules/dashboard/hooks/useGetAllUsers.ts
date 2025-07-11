import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../services/users/users";


export function useGetAllUsers() {

    return useQuery({
        queryKey:["profiles"],
        queryFn: getAllUsers,

    })
}