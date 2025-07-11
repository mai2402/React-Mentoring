import { supabase } from "../../../core/supabase/client";
import { BookingDTO } from "../interfaces/booking-dto";



export async function createUpdateBooking(booking: BookingDTO) {
  // Get the currently authenticated user
  const { data, error } = await supabase.auth.getUser();
  if (!data.user || error) throw error?.message;


  // Prepare the booking payload with the user ID included
  const insertPayload = { ...booking, user_id: data.user?.id};

  //if booking id exists then it updates the booking
  
  if(booking.id){
    const {error} = await supabase
    .from("bookings")
    .update(insertPayload)
    .eq("id", booking.id)

      if (error) throw new Error(`Error updating booking: ${error.message}`);
    return {...booking};
  }
  else {


  // Check if the user already booked the same session
  const { data: existingBooking, error: existingError } = await supabase
    .from('bookings')
    .select('id')
    .eq('user_id', data.user.id)
    .eq('sessionId', booking.sessionId)
   

  if (existingError) {
    throw new Error(`Error checking existing booking: ${existingError.message}`);
  }

  // If a booking already exists, prevent duplicate booking
  if (existingBooking.length > 0) {
    console.warn("Duplicate booking attempt.");
    throw new Error("You have already booked this session.");
  }

  // Insert the new booking into the database
  const { data: insertedBooking, error } = await supabase
    .from('bookings')
    .insert([insertPayload])
    .select()
    .single();

  if (error) {
    console.error("Error booking session:", error.message);
    console.log("booking payload:", booking);
    console.log("Supabase error:", error);
    throw new Error(error.message);
  }


  return insertedBooking || null;
}
}

// Fetch all bookings for the current user, ordered by newest first
export async function getMyBookings(): Promise<BookingDTO[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching bookings:", error.message);
    return [];
  }

  return data || [];
}

// Cancel a booking by its ID
export async function cancelBooking(bookingId: string): Promise<void> {
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.log("Error cancelling booking:", error.message);
    console.log("supabase error", error);
    throw error.message;
  }
}



