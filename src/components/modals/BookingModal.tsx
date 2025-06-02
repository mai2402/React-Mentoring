import toast from "react-hot-toast";
import { useBookingContext } from "../../contexts/bookingContext";
import Button from "../Button";
import Form from "../Form";
import Input from "../Input";
import Modal from "../Modal";
import { BookingFormData } from "../../types/interfaces";
import { SessionAction } from "../../enums";
import { sessionSchema } from "../../validation/session";
import { BookingModalProps } from "../../types/types";



export function BookingModal ({loadedSession, onClose, isOpen}: BookingModalProps ){
        
     
        const { dispatch} = useBookingContext()

     const onSubmit = (data:BookingFormData ) => {

      dispatch({
        type: SessionAction.ADD_SESSION,
        payload: {
          ...loadedSession!,
          ...data,
        },
      });
      console.log('Session booked:', data);
      
      
      toast.success('Session booked successfully!');
    }

    

    return(

          <Modal onClose={onClose} isOpen={isOpen} title="Book Session">

                  <Form
                    onSubmit={onSubmit}
                    schema={sessionSchema}
                    defaultValues={{ name: '', email: '', phone: '' }}
                  >
                    {({ register, formState:{errors} }) => (
                      <>
                        <Input label="Name" type="text"  {...register('name')}  error={errors.name?.message}/>
                        <Input label="Phone" type="tel"  {...register('phone')} error={errors.phone?.message}/>
                        <div className="form-actions">
                          <Button type="button" textOnly={true} onClick={onClose}>
                            Cancel
                          </Button>
                          <Button type="submit">Book Session</Button>
                        </div>
                      </>
                    )}
                  </Form>

              </Modal>
    )
}