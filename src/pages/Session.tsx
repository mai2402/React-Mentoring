  import {  useParams } from 'react-router-dom';

  import { SESSIONS } from '../dummy-sessions.ts';
  import Button from '../components/Button.tsx';
  import Modal from '../components/Modal.tsx';
  import Input from '../components/Input.tsx';
  import { useModal } from '../hooks/useModal.ts';
  import { useBookingContext } from '../contexts/bookingContext.tsx';
  import { SessionAction } from '../enums/enums.ts';
  import toast from 'react-hot-toast';
  import { BookingFormData } from '../types/interfaces.ts';
  import { sessionSchema } from '../validation/session.ts';
  import Form from '../components/Form.tsx';
  import SessionDetails from '../components/session/SessionDetails.tsx';


  export default function SessionPage() {
    const {modalRef,handleCloseModal, handleOpenModal} = useModal();
    const { dispatch} = useBookingContext()
    const params = useParams<{ id: string }>();
        const sessionId = params.id;
        const loadedSession = SESSIONS.find((session) => session.id === sessionId);


  const onSubmit = (data:BookingFormData ) => {

      dispatch({
        type: SessionAction.ADD_SESSION,
        payload: {
          ...loadedSession!,
          ...data,
        },
      });
      console.log('Session booked:', data);
      
      handleCloseModal();
      toast.success('Session booked successfully!');
    }

    return (
      <main>
              <div>
              <SessionDetails loadedSession={loadedSession!} onLearnMoreClick={handleOpenModal} />
            
              <Modal ref={modalRef} title="Book Session">

                  <Form
                    onSubmit={onSubmit}
                    schema={sessionSchema}
                    defaultValues={{ name: '', email: '', phone: '' }}
                  >
                    {({ register, formState:{errors} }) => (
                      <>
                        <Input label="Name" type="text" required {...register('name')}  error={errors.name?.message}/>
                        <Input label="Email" type="email" required {...register('email')} error={errors.email?.message}/>
                        <Input label="Phone" type="tel" required {...register('phone')} error={errors.phone?.message}/>
                        <div className="form-actions">
                          <Button type="button" textOnly={true} onClick={handleCloseModal}>
                            Cancel
                          </Button>
                          <Button type="submit">Book Session</Button>
                        </div>
                      </>
                    )}
                  </Form>

              </Modal>
              </div>  
      </main>
    );
  }

