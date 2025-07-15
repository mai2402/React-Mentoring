import Button from "../ui/Button";
import Form from "../ui/Form";
import Input from "../ui/Input";
import Modal from "../ui/Modal";
import { BookingDtoSchema, BookingFormData } from "../../modules/sessions/validation/session";
import { UseCreateUpdateBooking } from "../../modules/bookings/hooks/useCreateUpdateBooking";
import Spinner from "../ui/Spinner";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BookingModalProps } from "../interface/modal";
import { buildBooking } from "../../modules/bookings/utils/buildBooking";



export function BookingModal({ loadedSession, onClose, isOpen, editBooking }: BookingModalProps) {

     const {mutate: saveBookings, isPending} = UseCreateUpdateBooking()
     const navigate = useNavigate();
     const isEditMode = Boolean(editBooking)

     const defaultValues  = { name: editBooking?.name || "",
                              phone: editBooking?.phone || "" };


     
     if(isPending) return <Spinner/>

    const handleSubmit = (formData: BookingFormData)=>{


       
      const booking = buildBooking({formData,session: loadedSession, editBooking})
         
      saveBookings( booking  , {
          onSuccess:()=>{
            navigate("/upcoming");
            toast.success(isEditMode? "Booking updated successfully" :"Booking created successfully!");
            onClose?.();
          },

          onError: ( error)=>{
             toast.error(error.message.includes("already booked") ?
                 "You have already booked this session."
                : 
                 "Failed to create booking. Please try again.");

                navigate("/upcoming"); 

          }}, 
      )}

     

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
