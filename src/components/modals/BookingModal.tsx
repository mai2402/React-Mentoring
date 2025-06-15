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


export function BookingModal({ loadedSession, onClose, isOpen, editBooking }: BookingModalProps) {

     const {mutate: createUpdateBooking, isPending} = UseCreateUpdateBooking()
     const navigate = useNavigate();
     

     const onSubmit = (data: BookingFormData)=>{
       
       const booking: BookingDTO = {
            ...editBooking,
            sessionId: loadedSession.id ?? "",
            name: data.name,
            phone: data.phone,
            title: loadedSession.title ?? "",
            summary: loadedSession.summary ?? "",
            description: loadedSession.description ?? "",
            date: loadedSession.date ?? "",
            image: loadedSession.image  ?? "",
       };

      createUpdateBooking( booking  , {

          onSuccess:()=>{
            navigate("/upcoming");
            toast.success(editBooking? "Booking updated successfully" :"Booking created successfully!");
            onClose?.();
          }   ,
          onError: ( error)=>{
             toast.error(error.message.includes("already booked") ?
                 "You have already booked this session."
                : 
                 "Failed to create booking. Please try again.");

                navigate("/sessions"); 

          }
         
        },
        
      )
     }

     if(isPending) return <Spinner/>

  return (
    <Modal onClose={onClose} isOpen={isOpen} title="Book Session">
      <Form <BookingFormData>

        onSubmit={onSubmit}
        schema={BookingDtoSchema}
        defaultValues={{ name: editBooking?.name || "",
                         phone: editBooking?.phone || "" }}
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
              <Button type="submit">{editBooking? "Update Session" : "Book Session"}</Button>
            </div>
          </>
        )}
      </Form>
    </Modal>
  );
}
