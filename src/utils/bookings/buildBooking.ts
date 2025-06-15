import { BookingDTO } from "../../interfaces/booking/booking-dto"
import { Session } from "../../interfaces/session"
import { BookingFormData } from "../../validation/session"



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