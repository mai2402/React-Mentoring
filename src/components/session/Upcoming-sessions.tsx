import toast from "react-hot-toast";
import { useGetMyBookings } from "../../hooks/bookings/useGetMyBookings";
import { cancelBooking } from "../../services/booking";
import Button from "../shared/Button";
import EmptyContent from "../shared/EmptyContent";
import Spinner from "../shared/Spinner";
import { useState } from "react";
import ConfirmModal from "../modals/ConfirmModal";
import { useQueryClient } from "@tanstack/react-query";


export default function UpcomingSessions (){

  const [ cancelSession, setCancelSession ] = useState<string | null>(null);
  const {data: upcomingSessions, isLoading } = useGetMyBookings()
  const queryClient = useQueryClient()


const handleCancelSession = async () => {
  if(!cancelSession) return;

  try {
    await cancelBooking(cancelSession);
    toast.success("Session cancelled successfully");
    queryClient.invalidateQueries({queryKey:["bookings"]})
    setCancelSession(null);
  } catch (error) {
    console.error("Error cancelling session:", error);
    toast.error("Failed to cancel session");
  }
};


 
   if(isLoading) return <Spinner/>
   if(!upcomingSessions || upcomingSessions.length === 0)
     return<EmptyContent>
         <h2>No upcoming sessions</h2>
         <p>Go check our latest available sessions</p>
     </EmptyContent>
  
 return (
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
            <Button textOnly onClick={()=>console.log('edit')}>Edit</Button>
            <Button textOnly onClick={()=> setCancelSession(session.id)}>Cancel</Button>
            <ConfirmModal
            isOpen={!!cancelSession} 
            onCancel={()=> setCancelSession(null)}
            onClose={() => setCancelSession(null)}
            onConfirm={handleCancelSession}
            title="Cancel Session"
            />
          </div>
        </li>
      ))}
    </ul>
  </div>
        </div>

    )
}