import { useGetMyBookings } from "../../bookings/hooks/useGetMyBookings";
import { useGetSessions } from "../../sessions/hooks/useGetSessions";
import { useGetAllUsers } from "./users/useGetAllUsers";



/**
 * 
 * @returns An object containing the dashboard data including array of sessions with their titles, 
 * array of number of bookings for each session , array for bookings over time for chart
 * ,users, loading state, and session bar data.
 */

export function useDashboardData() {
    
    const {data: sessions, isLoading} = useGetSessions({},"");
    const {data: bookings} = useGetMyBookings()
    const {data: users} = useGetAllUsers();

    
        // Create a map of session IDs to titles
        // This is useful for displaying session titles in the chart
         const sessionMap = sessions?.reduce((acc, session)=>{
            acc[session.id] = session.title || "Unknown Session";
            return acc;
        }, {} as Record<string, string>);
    
       

    
        // Gets the sessionTitle using the sessionId from sessionMap
         // Counts how many bookings each session title has
    const groupedBookings = bookings?.reduce((acc, booking) => {
        const sessionId = booking.session_id as string | undefined;
        let sessionTitle = "Unknown Session";
        if (sessionId !== undefined) {
            sessionTitle = sessionMap?.[sessionId] || "Unknown Session";
        }
        acc[sessionTitle] = (acc[sessionTitle] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);
    
    
     const sessionBarData = Object.entries(groupedBookings || {})
     .map(([sessionTitle, bookingCount])=>({
        sessionTitle,
        bookingCount,
      }))

       
      //  number of users per role

       const userRoleCount = users?.reduce((acc, user)=>{
          acc[user.role] = (acc[user.role] || 0) + 1;
          return acc;
       }, {} as Record<string, number>)
     
    // Convert the userRoleCount object to an array of objects for charting
    const userRoleData = Object.entries(userRoleCount || {}).map(([name, value])=>({name, value: Number(value)}));
    


    return{sessions, bookings, users, isLoading, sessionBarData, userRoleData};
}