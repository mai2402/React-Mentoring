import { UpcomingSessionsItemProps } from "../interfaces/session";
import Button from "../../../shared/ui/Button";



export default function UpcomingSessionsItem ({session,onEdit, onCancel }: UpcomingSessionsItemProps ){


    return(
                <li key={session.sessionId} className="upcoming__session">
                  <div className="upcoming__info">
                    <h3>{session.title}</h3>
                    <p>{session.summary}</p>
                    <time>{session.date}</time>
                  </div>
                  <div className="upcoming__actions">
                    <Button textOnly onClick={()=>onEdit(session)}>Edit</Button>
                    <Button textOnly onClick={()=>onCancel(session.id!)} >Cancel</Button>
                </div>
             </li>  
            

    )
}