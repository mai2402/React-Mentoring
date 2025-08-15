import Button from "../ui/Button";
import Form from "../ui/Form";
import Input from "../ui/Input";
import Modal from "../ui/Modal";
import { BookingDtoSchema, BookingFormData } from "../../modules/sessions/validation/session";
import { UseCreateUpdateBooking } from "../../modules/bookings/hooks/useCreateUpdateBooking";
import Spinner from "../ui/Spinner";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { buildUpdateBooking, buildCreateBooking } from "../../modules/bookings/utils/buildBooking";
import { BookingModalProps } from "../types/booking";




export function BookingModal(props: BookingModalProps){
    const {mode, onClose, isOpen}= props;
     const {mutate: saveBookings, isPending} = UseCreateUpdateBooking()
     const navigate = useNavigate();

     const isEditMode = mode === "edit";
     const editBooking = isEditMode ? props.editBooking : undefined;
     const sessionId = !isEditMode ? props.sessionId : undefined;
   

     const defaultValues  = { name: editBooking?.name || "",
                              phone:editBooking?.phone || "" };


     
     if(isPending) return <Spinner/>

     const handleSubmit = (formData: BookingFormData) => {
    if (isEditMode) {
      if (!editBooking) {
        toast.error("No booking to edit.");
        return;
      }
      const booking = buildUpdateBooking({
        formData,
        editBooking: {
          id: editBooking.id,
          session_id: editBooking.session_id, 
        },
      });

      saveBookings(booking, {
        onSuccess: () => {
          toast.success("Booking updated successfully");
          navigate("/upcoming");
          onClose?.();
        },
        onError: (e: any) => toast.error(e?.message || "Failed to update booking"),
      });
      return; // ✅ stop here for edit
    }

    
    // CREATE mode
    if (!sessionId) {
    
      toast.error("Session isn’t ready yet. Please reopen the modal.");
      return;
    }

    const booking = buildCreateBooking({
      formData,
      sessionId: sessionId,
    });

    saveBookings(booking, {
      onSuccess: () => {
        toast.success("Booking created successfully!");
        navigate("/upcoming");
        onClose?.();
      },
      onError: (e: any) => {
        toast.error(
          e?.message?.includes("already booked")
            ? "You have already booked this session."
            : "Failed to create booking. Please try again."
        );
        navigate("/upcoming");
      },
    });
  };

     

  return (
    <Modal onClose={onClose} isOpen={isOpen} title="Book Session">
      <Form <BookingFormData>

        onSubmit={handleSubmit}
        schema={BookingDtoSchema}
        defaultValues={defaultValues}
      >
        {({ register, formState: { errors } }) => (
          <>
            <Input
              label="Name"
              type="text"
              {...register("name")}
              error={errors.name?.message}
            />
            <Input
              label="Phone"
              type="tel"
              {...register("phone")}
              error={errors.phone?.message}
            />
            <div className="form-actions">
              <Button type="button" textOnly onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">{isEditMode? "Update Session" : "Book Session"}</Button>
            </div>
          </>
        )}
      </Form>
    </Modal>
  );
}
