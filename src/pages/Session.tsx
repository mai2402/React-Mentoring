  import {  useParams } from 'react-router-dom';
  import { SESSIONS } from '../dummy-sessions.ts';
  import SessionDetails from '../components/session/SessionDetails.tsx';




  export default function SessionPage() {
       
        
        const params = useParams<{ id: string }>();
        const sessionId = params.id;
        const loadedSession = SESSIONS.find((session) => session.id === sessionId);
      
   const handelLearnMoreClick = () =>{
    console.log("sdfjhhrjhgjh")
   }

    return (
      <main>
              <div>
              <SessionDetails loadedSession={loadedSession!} onLearnMoreClick={handelLearnMoreClick} />
          
              </div>  
      </main>
    );
  }

