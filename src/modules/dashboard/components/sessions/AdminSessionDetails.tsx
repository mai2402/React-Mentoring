import Button from "../../../../shared/ui/Button";
import { Session } from "../../../sessions/interfaces/session";



export interface AdminSessionDetails {
    session: Session;
}

export default function AdminSessionDetails ({session}: AdminSessionDetails){
  const { title, summary, image } = session;

  

return (
      <>
          <article className="session-card">
            <img className="session-card__image" src={image} alt={title} />
            <div className="session-card__content">
              <h3 className="session-card__title">{title}</h3>
              <p className="session-card__description">{summary}</p>
            </div>
    
            <div className="session-card__footer">
              <Button onClick={()=> console.log("editing")}>Edit</Button>
              <Button onClick={()=> console.log("deleting")}>Delete</Button>
            </div>
          </article>
    
      
    
       </>
)



}