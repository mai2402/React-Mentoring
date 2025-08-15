import {  useParams } from 'react-router-dom';
import SessionDetails from '../components/SessionDetails.tsx';
import { BookingModal } from '../../../shared/components/BookingModal.tsx';
import { useModal } from '../../../shared/hooks/useModal.ts';
import { Session } from '../interfaces/session.ts';
import { useGetSessions } from '../hooks/useGetSessions.ts';
import Spinner from '../../../shared/ui/Spinner.tsx';
import { ModalBookingState } from '../../../shared/types/booking.ts';




  export default function SessionPage() {
       
        
        const params = useParams<{ sessionId: string }>();
        const sessionId = params.sessionId;
        const {data : sessions, isLoading} = useGetSessions({}, "");
   
        const loadedSession = sessions?.find((session) => session.id === sessionId);
        const bookingModal = useModal<ModalBookingState>()
        

   if (isLoading) return <Spinner/>
      
   const handleBookSession = () =>{
       bookingModal.open({mode: "create", sessionId: sessionId!});
   }

    return (
      <main>
              <div>
              <SessionDetails loadedSession={loadedSession} onBookSession={handleBookSession} />
          
              </div>  

           {/* Render per mode and pass sessionId in create */}
      {bookingModal.payload?.mode === "create" && (
        <BookingModal
          isOpen={bookingModal.isOpenModal}
          onClose={bookingModal.close}
          mode="create"
          sessionId={bookingModal.payload.sessionId}
        />
      )}
      </main>
    );
  }

