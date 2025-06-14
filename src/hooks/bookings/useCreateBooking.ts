import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBooking } from "../../services/booking";



export function UseCreateBooking (){
    const queryClient = useQueryClient();

     return useMutation({
         mutationFn: createBooking,

         onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
         
         },
            onError: (error: Error) => {
                console.error(`Error creating booking: ${error.message}`);
            },


    })
}