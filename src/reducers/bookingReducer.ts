import { SessionAction} from "../enums";
import { BookingActions, BookingState } from "../types/types";


/**
 * bookingReducer function to manage the state of booking sessions.
 * It handles adding and removing sessions from the state.
 *
 * @param {BookingState} state - The current state of bookings.
 * @param {BookingActions} action - The action to perform on the state.
 * @returns {BookingState} - The new state after applying the action.
 */
export function bookingReducer(state:BookingState, action: BookingActions): BookingState {
   switch(action.type){
    case SessionAction.ADD_SESSION :
        return{
            ...state,
            sessions:[...state.sessions, action.payload]
        };
        case SessionAction.REMOVE_SESSION:
            return{
                ...state,
                sessions:state.sessions.filter((session)=> session.id !== action.payload)
            };
            
        default:
            return state;    
   }
}