import { createContext, ReactNode, useContext, useEffect, useReducer } from "react";
import { BookingContext as BookingContextType } from "../types/types";
import { bookingReducer } from "../reducers/bookingReducer";

const BookingContext  = createContext<BookingContextType | undefined>(undefined)

type BookingContextProviderProps = {
    children: ReactNode;
}

export function BookingContextProvider({children}: BookingContextProviderProps) {

    // Initialize the state from localStorage or set to an empty array
  const init =() => {
     const storedSessions = localStorage.getItem("booked-sessions");
     const initialSessions = storedSessions? JSON.parse(storedSessions) : [];
        return { sessions: initialSessions };
  }
   
    // Use useReducer to manage the booking state
 const [state, dispatch] = useReducer(bookingReducer,{sessions :[]}, init) 

    // Save the sessions to localStorage whenever they change
    useEffect(()=> {
        localStorage.setItem("booked-sessions", JSON.stringify(state.sessions));
    },[state.sessions]);

    return(
        <BookingContext.Provider value={{state, dispatch}}>
            {children}      
        </BookingContext.Provider>
    )
}



export function useBookingContext(){

    const context = useContext(BookingContext );
    if (!context){
        throw new Error("useBookingContext must be used within a BookingContextProvider");
    }
    return context;
}