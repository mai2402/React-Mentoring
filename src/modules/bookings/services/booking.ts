import { ZodUUID } from "zod/v4";
import { supabase } from "../../../core/supabase/client";
import { BookingDTO } from "../interfaces/booking-dto";

/**
 * Create or update a booking for a session.
 * - Prevents duplicate bookings by the same user for the same session.
 * - Updates booking if `booking.id` is present.
 */
export async function createUpdateBooking(booking: BookingDTO) {
  // Fetch currently authenticated user
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (!authData.user || authError) throw authError?.message;

  const userId = authData.user.id;
  const insertPayload = { ...booking, user_id: userId };

  // If booking has an ID → update existing booking
  if (booking.id) {
    const { error: updateError } = await supabase
      .from("bookings")
      .update(insertPayload)
      .eq("id", booking.id);

    if (updateError) {
      throw new Error(`Error updating booking: ${updateError.message}`);
    }

    return { ...booking };
  }

  // Otherwise → create new booking (with duplicate check)
  const { data: existingBooking, error: existingBookingError } = await supabase
    .from("bookings")
    .select("id")
    .eq("user_id", userId)
    .eq("sessionId", booking.sessionId);

  if (existingBookingError) {
    throw new Error(`Error checking existing booking: ${existingBookingError.message}`);
  }

  if (existingBooking.length > 0) {
    // Prevent duplicate bookings
    console.warn("User already booked this session.");
    throw new Error("You've already booked this session.");
  }

  // Proceed to insert new booking
  const { data: insertedBooking, error: insertError } = await supabase
    .from("bookings")
    .insert([insertPayload])
    .select()
    .single();

  if (insertError) {
    if (insertError.message.includes("unique_user_session") 

       || insertError.message.includes("duplicate key")) {
        
      throw new Error("You've already booked this session.");
    }

    console.error("Booking insert failed:", insertError.message);
    throw new Error(insertError.message);
  }

  return insertedBooking || null;
}

/**
 * Fetch all bookings for the current user, ordered by newest first.
 */
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

/**
 * Cancel a booking by its ID.
 */
export async function cancelBooking(bookingId: ZodUUID): Promise<void> {
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error("Error cancelling booking:", error.message);
    throw error.message;
  }
}
