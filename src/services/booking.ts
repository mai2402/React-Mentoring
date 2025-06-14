import { BookingDTO } from "../interfaces/booking/booking-dto";
import { supabase } from "../supabase/client";

export async function createBooking (booking: BookingDTO) {

  const {data: {user} , error:userError} = await supabase.auth.getUser();

  console.log("user.id from supabase.auth.getUser():", user?.id);


  if (!user || userError) throw userError?.message;

  const insertPayload = { ...booking, user_id: user.id };
  console.log("final booking insert:", insertPayload);

  const {data: existingBooking, error: existingError} = await supabase
    .from('bookings')
    .select('id')
    .eq('user_id', user.id)
    .eq('sessionId', booking.sessionId)
    .maybeSingle();

    if (existingError) {
        throw new Error(`Error checking existing booking: ${existingError.message}`)
    }

    if(existingBooking) {
         console.warn("Duplicate booking attempt.");
       throw new Error("You have already booked this session.");
    }


  const { data : insertedBooking , error } = await supabase
  .from('bookings')  
  .insert([insertPayload])
  .select()
  .single();

  if (error) {
    console.error("Error booking session:", error.message);
    console.log("booking payload:", booking);
    console.log("Supabase error:", error);

    throw  new Error(error.message);
    
  }


  return insertedBooking || null;
}




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



export async function cancelBooking(bookingId: string): Promise<void> {

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error("Error cancelling booking:", error.message);
    throw error.message;
  }
}