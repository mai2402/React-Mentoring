import toast from "react-hot-toast";
import { useBookingContext } from "../../contexts/bookingContext";
import Button from "../shared/Button";
import Form from "../shared/Form";
import Input from "../shared/Input";
import Modal from "../shared/Modal";
import { BookingFormData, BookingModalProps } from "../../interfaces/interfaces";
import { SessionAction } from "../../enums";
import { sessionSchema } from "../../validation/session";

export function BookingModal({ loadedSession, onClose, isOpen }: BookingModalProps) {
  const { dispatch } = useBookingContext();

  const onSubmit = (data: BookingFormData) => {
    dispatch({
      type: SessionAction.ADD_SESSION,
      payload: { ...loadedSession, ...data },
    });

    toast.success("Session booked successfully!");
    onClose();
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} title="Book Session">
      <Form
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
