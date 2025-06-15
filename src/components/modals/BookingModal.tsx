import Button from "../shared/Button";
import Form from "../shared/Form";
import Input from "../shared/Input";
import Modal from "../shared/Modal";
import { BookingModalProps } from "../../interfaces/interfaces";
import { BookingDtoSchema, BookingFormData } from "../../validation/session";
import {  BookingDTO } from "../../interfaces/booking/booking-dto";
import { UseCreateUpdateBooking } from "../../hooks/bookings/useCreateUpdateBooking";
import Spinner from "../shared/Spinner";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { buildBooking } from "../../utils/bookings/buildBooking";


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

                navigate("/sessions"); 

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
