  import {  useParams } from 'react-router-dom';
  import { SESSIONS } from '../dummy-sessions.ts';
  import SessionDetails from '../components/session/SessionDetails.tsx';
import { BookingModal } from '../components/modals/BookingModal.tsx';
import { useState } from 'react';




  export default function SessionPage() {
       
        
        const params = useParams<{ id: string }>();
        const sessionId = params.id;
        const loadedSession = SESSIONS.find((session) => session.id === sessionId);
        const [showBookingModal, setShowBookingModal] = useState(false);


      
   const handleBookSession = () =>{
       setShowBookingModal(true)
   }

    return (
      <main>
              <div>
              <SessionDetails loadedSession={loadedSession!} onBookSession={handleBookSession} />
          
              </div>  

          <BookingModal
          isOpen={showBookingModal}
          loadedSession={loadedSession!}
          onClose={() => setShowBookingModal(false)}
        />
      </main>
    );
  }

