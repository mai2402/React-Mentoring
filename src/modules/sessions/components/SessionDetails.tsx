
import EmptyContent from "../../../shared/ui/EmptyContent";
import { SessionDetailsProps } from "../interfaces/interfaces";
import Button from "../../../shared/ui/Button";


export default function SessionDetails(props: SessionDetailsProps) {
  const { loadedSession , onBookSession } = props;

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
              <Button type='button' onClick={onBookSession}>Book Session</Button>
            </div>
            </header>
          <p className="session-detail__content">{loadedSession.description}</p>  
       </article> 
       
       </main>

    )
}