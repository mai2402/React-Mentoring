import {  useParams } from 'react-router-dom';
import SessionDetails from '../components/SessionDetails.tsx';
import { BookingModal } from '../../../shared/components/BookingModal.tsx';
import { useModal } from '../../../shared/hooks/useModal.ts';
import { Session } from '../interfaces/session.ts';
import { useGetSessions } from '../hooks/useGetSessions.ts';
import Spinner from '../../../shared/ui/Spinner.tsx';




  export default function SessionPage() {
       
        
        const params = useParams<{ sessionId: string }>();
        const sessionId = params.sessionId;
        const {data : sessions, isLoading} = useGetSessions();
        debugger
        const loadedSession = sessions?.find((session) => session.id === sessionId);
        const bookingModal = useModal<Session>()
        

   if (isLoading) return <Spinner/>
      
   const handleBookSession = () =>{
       bookingModal.open(loadedSession!)
   }

    return (
      <main>
              <div>
              <SessionDetails loadedSession={loadedSession} onBookSession={handleBookSession} />
          
              </div>  

          <BookingModal
          isOpen={bookingModal.isOpenModal}
          loadedSession={bookingModal.payload!}
          onClose={bookingModal.close}
        />
      </main>
    );
  }

