import { ZodUUID } from "zod/v4";
import { BookingDTO } from "../../bookings/interfaces/booking-dto";

 export interface Session {
    id?: ZodUUID;
    title: string;
    summary:string;
    description: string;
    date: string; 
    image?: string;
    duration: number;
 }


  export interface SessionCardProps {
    session: Session;
  }
 
  export interface SessionDetailsProps {
     loadedSession: Session | null;
     onBookSession?: () => void;
   }


export interface UpcomingSessionsItemProps {
  onEdit: (booking: BookingDTO) => void;
  onCancel: (bookingId: string) => void;
  session: BookingDTO;
}   
 