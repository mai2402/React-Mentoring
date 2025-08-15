
import { BookingFormData } from "../../sessions/validation/session";
import { BookingDTO } from "../interfaces/booking-dto";




export function buildCreateBooking({
     formData,
     sessionId,
   }
    : {
        formData: BookingFormData,
        sessionId: string, 
    }): BookingDTO
    {
    

    return {
            session_id:sessionId,
            name: formData.name,
            phone: formData.phone,
       };
    

}





export function buildUpdateBooking({
     formData,
     editBooking,
   }
    : {
        formData: BookingFormData,
        editBooking: Pick<BookingDTO, "id" | "session_id">,
    }): BookingDTO
    {
    

    return {
            id: editBooking.id,
            session_id: editBooking.session_id,
            name: formData.name,
            phone: formData.phone,
       };
    

}