import { SessionAction } from "../enums";
import { BookingDTO } from "../interfaces/booking/booking-dto";
import { Session } from "../interfaces/session";

export type BookingState ={
    sessions : Session[]
}


export type BookingActions =

   | {type: SessionAction.ADD_SESSION; payload: Session | BookingDTO}
   | {type: SessionAction.REMOVE_SESSION ; payload: string} // Assuming payload is session ID

export type BookingContext = {
    
   state : BookingState;
   dispatch: React.Dispatch<BookingActions>;
};
