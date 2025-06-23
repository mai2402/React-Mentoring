  import {  useParams } from 'react-router-dom';
  import { SESSIONS } from '../../../dummy-sessions.ts';
  import SessionDetails from '../components/SessionDetails.tsx';
import { BookingModal } from '../../../shared/components/BookingModal.tsx';
import { useModal } from '../../../shared/hooks/useModal.ts';
import { Session } from '../interfaces/session.ts';




  export default function SessionPage() {
       
        
        const params = useParams<{ id: string }>();
        const sessionId = params.id;
        const loadedSession = SESSIONS.find((session) => session.id === sessionId);
        const bookingModal = useModal<Session>()
        


      
   const handleBookSession = () =>{
       bookingModal.open(loadedSession!)
   }

    return (
      <main>
              <div>
              <SessionDetails loadedSession={loadedSession!} onBookSession={handleBookSession} />
          
              </div>  

          <BookingModal
          isOpen={bookingModal.isOpenModal}
          loadedSession={bookingModal.payload!}
          onClose={bookingModal.close}
        />
      </main>
    );
  }

