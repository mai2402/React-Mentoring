import EmptyContent from "../../../shared/ui/EmptyContent";
import Spinner from "../../../shared/ui/Spinner";
import ConfirmModal from "../../../shared/components/ConfirmModal";
import { BookingModal } from "../../../shared/components/BookingModal";
import UpcomingSessionsItem from "./Upcoming-sessions-item";
import { useUpcomingSessions } from "../hooks/useUpcomingSessions";

import Button from "../../../shared/ui/Button";
import { AppRoute } from "../../../app/enums/routes";





export default function UpcomingSessions (){
   const {bookings, 
          isLoading,
          confirmModal,
          bookingModal,
          handleCancelBooking,
          handleEditBooking,
          handleCreateBooking} = useUpcomingSessions();

         
      
      
      const uponCancel = (bookingId : string)=>{
        
      confirmModal.open(bookingId)
      
    }      

   if(isLoading) return <Spinner/>

   if(!bookings || bookings.length === 0)
  


     return(
        <EmptyContent>
         <h2>No upcoming sessions</h2>
         <p>Go check our latest available sessions</p>
         <Button textOnly to={AppRoute.Sessions} >Browse Sessions</Button>
        </EmptyContent>
         )
         
  
 return (<>
       <div className="upcoming">
          <div className="upcoming-sessions">
            <h1>Upcoming Sessions</h1>
            <ul>
              {bookings?.map((booking) => (
                <UpcomingSessionsItem
                 key={String(booking.id)}
                 booking = {booking}
                 onCancel={()=>uponCancel(booking.id! as string)}
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
     
  {bookingModal.payload && (
      bookingModal.payload.mode === "edit" ? (
        <BookingModal
          isOpen={bookingModal.isOpenModal}
          onClose={bookingModal.close}
          mode="edit"
          editBooking={bookingModal.payload.booking}   // ✅ pass booking
        />
  ) : (
        <BookingModal
          isOpen={bookingModal.isOpenModal}
          onClose={bookingModal.close}
          mode="create"
          sessionId={bookingModal.payload.sessionId}   // ✅ pass sessionId
        />
  )
)}

      </>

    )
}