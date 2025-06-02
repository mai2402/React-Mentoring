
import {  SessionCardProps } from "../../types/interfaces";
import Button from "../Button";



export default function SessionCard(session : SessionCardProps){

 const {title, summary, image, id} =session.session;


    return(
        <article className="session-card">
            <img className="session-card__image" src={image} alt={title} />
            <div className="session-card__content">
            <h3 className="session-card__title">{title}</h3>
            <p className="session-card__description">{summary}</p>
            </div>
            
            <div className="session-card__footer">
            <Button to={`/sessions/${id}`} >
                Learn more
            </Button>
            </div>


           
   
        </article>

    )
}