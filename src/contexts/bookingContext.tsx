import { createContext, ReactNode, useContext, useEffect, useReducer } from "react";
import { BookingContext as BookingContextType } from "../types/types";
import { bookingReducer } from "../reducers/bookingReducer";


const BookingContext  = createContext<BookingContextType | undefined>(undefined)

type BookingContextProviderProps = {
    children: ReactNode;
}

export function BookingContextProvider({children}: BookingContextProviderProps) {

    const init = () => {
        try{
        const storedSessions = localStorage.getItem("sessions");
        return storedSessions ? {sessions: JSON.parse(storedSessions)} : {sessions: []};
        }
        catch(error){
            console.error("Error initializing booking context:", error);
            return {sessions: []};
        }
    }

    const [state, dispatch] = useReducer(bookingReducer,{sessions :[]}, init) 

    useEffect(()=>{
        try{
            localStorage.setItem("sessions", JSON.stringify(state.sessions));
        }catch(error){
            console.error("Error saving sessions to localStorage:", error);
        }
    },[state.sessions])
  


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