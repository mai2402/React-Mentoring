import { useQuery } from "@tanstack/react-query";
import { getMyBookings } from "../services/booking";



export function useGetMyBookings() {

    return useQuery({
        queryKey:["bookings"],
        queryFn: getMyBookings,
    })
}