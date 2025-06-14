import toast from "react-hot-toast";
import { useBookingContext } from "../../contexts/bookingContext";
import Button from "../shared/Button";
import Form from "../shared/Form";
import Input from "../shared/Input";
import Modal from "../shared/Modal";
import { BookingModalProps, Session } from "../../interfaces/interfaces";
import { SessionAction } from "../../enums";
import { sessionSchema } from "../../validation/session";
import {  BookingDTO } from "../../interfaces/booking/booking-dto";
import { useNavigate } from "react-router-dom";

export function BookingModal({ loadedSession, onClose, isOpen }: BookingModalProps) {
  const { dispatch } = useBookingContext();
  const navigate = useNavigate();

  const onSubmit = (data:  { name: string; phone: string }) => {
    dispatch({
      type: SessionAction.ADD_SESSION,
      payload: { ...loadedSession, ...data } as BookingDTO,
    });

    toast.success("Session booked successfully!");
    
    onClose!!();
    navigate("/upcoming");
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} title="Book Session">
      <Form <{ name: string; phone: string }>

        onSubmit={onSubmit}
        schema={sessionSchema}
        defaultValues={{ name: "", phone: "" }}
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
              <Button type="submit">Book Session</Button>
            </div>
          </>
        )}
      </Form>
    </Modal>
  );
}
