import EmptyContent from "../../../shared/ui/EmptyContent";
import Spinner from "../../../shared/ui/Spinner";
import ConfirmModal from "../../../shared/components/ConfirmModal";
import { BookingModal } from "../../../shared/components/BookingModal";
import UpcomingSessionsItem from "./Upcoming-sessions-item";
import { useUpcomingSessions } from "../hooks/useUpcomingSessions";
import { ZodUUID } from "zod/v4";
import Button from "../../../shared/ui/Button";



export default function UpcomingSessions (){
   const {bookings, 
          isLoading,
          confirmModal,
          bookingModal,
          handleCancelBooking,
          handleEditBooking} = useUpcomingSessions();
      const sessionIdInBookings = bookings?.map((booking) => booking.sessionId);
    const uponCancel = (bookingId : ZodUUID)=>{
      confirmModal.open(bookingId)
      handleCancelBooking();
    }      

   if(isLoading) return <Spinner/>

   if(!bookings || bookings.length === 0)
  


     return(
        <EmptyContent>
         <h2>No upcoming sessions</h2>
         <p>Go check our latest available sessions</p>
         <Button textOnly to="/sessions" >Browse Sessions</Button>
        </EmptyContent>
         )
         
  
 return (<>
       <div className="upcoming">
          <div className="upcoming-sessions">
            <h1>Upcoming Sessions</h1>
            <ul>
              {bookings?.map((session) => (
                <UpcomingSessionsItem
                 key={String(session.id)}
                 session={session}
                 onCancel={()=>uponCancel(session.id!)}
                 onEdit={handleEditBooking}
                />
              ))}
            </ul>
          </div>
        </div>
 
      <ConfirmModal
            isOpen={confirmModal.isOpenModal} 
            onCancel={confirmModal.close}
            onClose={confirmModal.close}
            onConfirm={handleCancelBooking}
            title="Cancel Session"
            message="Are You Sure You Want To Cancel This Session?"
            cancelLabel="Cancel"
            confirmLabel="Yes, Cancel"
       />
     
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