import Button from "../components/shared/Button";
import { useBookingContext } from "../contexts/bookingContext";
import { SessionAction } from "../enums";



export default function UpComingSessions() {
    const { state , dispatch} = useBookingContext();
    const upcomingSessions = state.sessions;

    const handleCancelSession = (sessionId: string) => {
        dispatch({ type: SessionAction.REMOVE_SESSION , payload: sessionId });
    };

    if (upcomingSessions.length === 0) {
        return (
            <div className="upcoming-sessions">
                <h1>No Upcoming Sessions</h1>
            </div>
        );
    }


     return(
        <div className="upcoming-sessions">
            <h1>Upcoming Sessions</h1>
            <ul>
                {upcomingSessions.map((session) => (
                     <div className="upcoming .form-actions">
                                    <li key={session.id} className="upcoming-session">
                                      <h3 className="upcoming__info h3">{session.title}</h3>
                                      <p className="upcoming__info p">{session.summary}</p>
                                      <time className="upcoming__info time ">{session.date}</time>
                                      <div style={{display: 'flex', gap: '1rem', alignItems:'flex-end'}}>
                                      <Button textOnly onClick={()=>handleCancelSession(session.id)}>cancel</Button>
                                      </div>
                                   </li>
                                  </div>
                ))}
                
            </ul>
        </div>
     )
}