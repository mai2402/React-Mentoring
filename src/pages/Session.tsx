import { useParams } from 'react-router-dom';

import { SESSIONS } from '../dummy-sessions.ts';
import Button from '../components/Button.tsx';
import Modal from '../components/Modal.tsx';
import Input from '../components/Input.tsx';
import { useModal } from '../hooks/useModal.ts';
import {  type FormEvent } from 'react';
import { useBookingContext } from '../contexts/bookingContext.tsx';
import { SessionAction } from '../enums/enums.ts';


export default function SessionPage() {
  const params = useParams<{ id: string }>();

  const sessionId = params.id;
  const loadedSession = SESSIONS.find((session) => session.id === sessionId);
  const {modalRef,handleCloseModal,handleOpenModal} = useModal();
  const {dispatch} = useBookingContext()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch({type: SessionAction.ADD_SESSION, payload: loadedSession!})
      handleCloseModal();
  
   }

  if (!loadedSession) {
    return (
      <main className="session-detail">
        <p>No session found!</p>
      </main>
    );
  }


  return (
    <main className="session-detail">
      <article>
        <header className='session-detail__header'>
          <img 
            className='session-detail__image'
            src={loadedSession.image}
            alt={loadedSession.title}
          />
          <div>
            <h2 className='session-detail__title'>{loadedSession.title}</h2>
            <time className='session-detail__date' dateTime={new Date(loadedSession.date).toISOString()}>
              {new Date(loadedSession.date).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </time>
            <p>
              <Button type='button' onClick={handleOpenModal}>Book Session</Button>

              
            <Modal ref={modalRef} title="Book Session">
                <form onSubmit={handleSubmit}>
                    <Input label="Name" name="name" required />
                    <Input label="Email" name="email" type="email" required />
                    <div className="form-actions">
                    <Button type="button" textOnly={true} onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button type="submit">Book Session</Button>
                    </div>
                </form>

            </Modal>
            </p>
          </div>
        </header>
        <p className="session-detail__content">{loadedSession.description}</p>
      </article>
    </main>
  );
}
