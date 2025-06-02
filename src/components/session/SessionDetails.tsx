
import EmptyContent from "../EmptyContent";
import { SessionDetailsProps } from "../../types/interfaces";
import Button from "../Button";


export default function SessionDetails(props: SessionDetailsProps) {
  const { loadedSession , onLearnMoreClick } = props;

  // If no session is loaded, return an empty content component

if (!loadedSession) {

    return (
      <EmptyContent title="Session Not Found" >
        <p>No session found!</p>
      </EmptyContent>
    );
  }

    return(
         <main className="session-detail">
      <article>
        <header className='session-detail__header'>
          <img 
            className='session-detail__image'
            src={loadedSession?.image}
            alt={loadedSession?.title}
          />
          <div>
            <h2 className='session-detail__title'>{loadedSession?.title}</h2>
            <time className='session-detail__date' dateTime={new Date(loadedSession!.date).toISOString()}>
              {new Date(loadedSession!.date).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </time>
              <Button type='button' onClick={onLearnMoreClick}>Book Session</Button>
            </div>
            </header>
          <p className="session-detail__content">{loadedSession.description}</p>  
       </article> 
       
       </main>

    )
}