import { Session } from "../interfaces/session";

export type BookingState ={
    sessions : Session[]
}


export type BookingActions =
   | {type: 'ADD_SESSION'; payload: Session | Partial<Session>}
   | {type: 'REMOVE_SESSION'; payload: string} // Assuming payload is session ID

export type BookingContext = {
    
   state : BookingState;
   dispatch: React.Dispatch<BookingActions>;
};
