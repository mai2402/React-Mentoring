import toast from "react-hot-toast";
import { BookingDTO } from "../../bookings/interfaces/booking-dto";
import { useQueryClient } from "@tanstack/react-query";
import { useGetMyBookings } from "../../bookings/hooks/useGetMyBookings";
import { useModal } from "../../../shared/hooks/useModal";
import { cancelBooking } from "../../bookings/services/booking";


export function useUpcomingSessions (){

    const bookingModal = useModal<BookingDTO>();
     const confirmModal = useModal<string>(); 
      const {data: bookings, isLoading } = useGetMyBookings()
      const queryClient = useQueryClient()
    
    

    const handleCancelBooking = async () => {

        // it represents booking id
      if(!confirmModal.payload) return;
      
    
      try {
        await cancelBooking(confirmModal.payload!);
        toast.success("Session cancelled successfully");
        queryClient.invalidateQueries({queryKey:["bookings"]})
        confirmModal.close();

      } catch (error) {
        console.error("Error cancelling session:", error);
        toast.error("Failed to cancel session");
      }
    };
    
    const handleEditBooking = async (bookedSession: BookingDTO) => {
      bookingModal.open(bookedSession)
      
    }
    

    return {
      bookings,
      isLoading,
      bookingModal,
      confirmModal,
      handleCancelBooking,
      handleEditBooking
    }
}