import { useGetMyBookings } from "../../hooks/bookings/useGetMyBookings";
import Button from "../shared/Button";
import EmptyContent from "../shared/EmptyContent";
import Spinner from "../shared/Spinner";


export default function UpcomingSessions (){

   
  const {data: upcomingSessions, isLoading } = useGetMyBookings()


    const handleCancelSession = (sessionId: string) => {
        // Implement the logic to cancel the session
        console.log(`Cancel session with ID: ${sessionId}`);
    }
 
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
            <Button textOnly onClick={() => handleCancelSession(session.sessionId!)}>Cancel</Button>
          </div>
        </li>
      ))}
    </ul>
  </div>
        </div>

    )
}