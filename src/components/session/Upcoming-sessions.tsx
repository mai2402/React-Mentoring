import toast from "react-hot-toast";
import { useGetMyBookings } from "../../hooks/bookings/useGetMyBookings";
import { cancelBooking } from "../../services/booking";
import Button from "../shared/Button";
import EmptyContent from "../shared/EmptyContent";
import Spinner from "../shared/Spinner";
import { useState } from "react";
import ConfirmModal from "../modals/ConfirmModal";
import { useQueryClient } from "@tanstack/react-query";
import { BookingDTO } from "../../interfaces/booking/booking-dto";
import { BookingModal } from "../modals/BookingModal";
import { useModal } from "../../hooks/useModal";



export default function UpcomingSessions (){
 const bookingModal = useModal<BookingDTO>();
 const confirmModal = useModal<string>(); 
  const {data: upcomingSessions, isLoading } = useGetMyBookings()
  const queryClient = useQueryClient()


const handleCancelBooking = async () => {
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


 
   if(isLoading) return <Spinner/>
   if(!upcomingSessions || upcomingSessions.length === 0)
     return<EmptyContent>
         <h2>No upcoming sessions</h2>
         <p>Go check our latest available sessions</p>
     </EmptyContent>
  
 return (<>
 <div className="upcoming">

  <div className="upcoming-sessions">
    <h1>Upcoming Sessions</h1>
    <ul>
      {upcomingSessions?.map((session) => (
        <li key={session.sessionId} className="upcoming__session">
          <div className="upcoming__info">
            <h3>{session.title}</h3>
            <p>{session.summary}</p>
            <time>{session.date}</time>
          </div>
          <div className="upcoming__actions">
            <Button textOnly onClick={()=>handleEditBooking(session)}>Edit</Button>
            <Button textOnly onClick={()=> confirmModal.open(session.id!)}>Cancel</Button>
            <ConfirmModal

            isOpen={confirmModal.isOpenModal} 
            onCancel={confirmModal.close}
            onClose={confirmModal.close}
            onConfirm={handleCancelBooking}
            title="Cancel Session"
            />
          </div>
        </li>
      ))}
    </ul>
  </div>
        </div>

        {bookingModal.payload &&  
        <BookingModal
            isOpen={bookingModal.isOpenModal }
            onClose={bookingModal.close}
            loadedSession={bookingModal.payload}
            editBooking={bookingModal.payload}
        />
        }

            </>
    )
}