import { Session } from "../../sessions/interfaces/session";
import { BookingFormData } from "../../sessions/validation/session";
import { BookingDTO } from "../interfaces/booking-dto";




export function buildBooking({
     formData,
     session,
     editBooking}
    : {
        formData: BookingFormData,
        session: Partial<Session>,
        editBooking?: BookingDTO 
    }): BookingDTO
    {

    return {
        
            ...editBooking,
            sessionId: session.id ?? "",
            name: formData.name,
            phone: formData.phone,
            title: session.title ?? "",
            summary: session.summary ?? "",
            description: session.description ?? "",
            date: session.date ?? "",
            image: session.image  ?? "",
       };
    

}