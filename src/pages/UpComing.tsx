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


    return (
 <div className="upcoming">

  <div className="upcoming-sessions">
    <h1>Upcoming Sessions</h1>
    <ul>
      {upcomingSessions.map((session) => (
        <li key={session.id} className="upcoming__session">
          <div className="upcoming__info">
            <h3>{session.title}</h3>
            <p>{session.summary}</p>
            <time>{session.date}</time>
          </div>
          <div className="upcoming__actions">
            <Button textOnly onClick={() => handleCancelSession(session.id)}>Cancel</Button>
          </div>
        </li>
      ))}
    </ul>
  </div>
        </div>
);

}