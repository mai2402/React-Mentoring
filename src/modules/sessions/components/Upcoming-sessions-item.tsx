import { UpcomingSessionsItemProps } from "../interfaces/session";
import Button from "../../../shared/ui/Button";
import { useGetSession } from "../hooks/useGetSession";
import Spinner from "../../../shared/ui/Spinner";
import EmptyContent from "../../../shared/ui/EmptyContent";



export default function UpcomingSessionsItem ({ onEdit, onCancel, booking }: UpcomingSessionsItemProps ){
   
   const { session_id : sessionId, id:bookingId } = booking;
   
    const { data: session, isLoading } = useGetSession(sessionId! as string);
  

    if(isLoading) return <Spinner/>

    if(!session) return <EmptyContent message="Session not found!" />
   
    return(
                <li key={String(booking.id)} className="upcoming__session">
                  <div className="upcoming__info">
                    <h3>{session.title}</h3>
                    <p>{session.summary}</p>
                    <time>{session.date}</time>
                  </div>
                  <div className="upcoming__actions">
                    <Button textOnly onClick={()=>onEdit(booking)}>Edit</Button>
                     
                    <Button textOnly onClick={()=> {
                       console.log("Booking ID to cancel:", bookingId); 
                      onCancel(bookingId as string)}} >Cancel</Button>
                </div>
             </li>  


    )
}