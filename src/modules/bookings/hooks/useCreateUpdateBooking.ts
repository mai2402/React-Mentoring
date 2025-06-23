import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BookingDTO } from "../interfaces/booking-dto";
import { createUpdateBooking } from "../services/booking";



export function UseCreateUpdateBooking (){
    const queryClient = useQueryClient();

     return useMutation({
         mutationFn:(booking: BookingDTO )=> createUpdateBooking(booking),

         onSuccess: (_, booking) => {
            queryClient.invalidateQueries({ queryKey: ["bookings"] });

            if(booking.id) {
                queryClient.invalidateQueries({queryKey:["bookings", booking.id]})
            }
         
         },
            onError: (error: Error) => {
                console.error(`Error creating booking: ${error.message}`);
            },


    })
}