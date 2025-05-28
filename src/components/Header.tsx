
import { useBookingContext } from "../contexts/bookingContext";
import { SessionAction } from "../enums/enums";
import { useModal } from "../hooks/useModal";
import Button from "./Button";
import Modal from "./Modal";




export default function Header() {
   const {handleOpenModal, handleCloseModal ,modalRef} = useModal();
   const {state : upcomingSessions, dispatch} = useBookingContext()
   
   const handleCancelSession = (sessionId: string) => {
      dispatch({type:SessionAction.REMOVE_SESSION, payload: sessionId})
   }

    return (
      <>
        <header className="header">
           <h1 className="header__title">ReactMentoring</h1>
           <nav >
              <ul  className="header__nav-list">
                <li>
                   <Button className="header__link"  textOnly={true} to="/">Our Mission</Button>
                </li>  
                <li>
                   <Button className="header__link" textOnly={true} to="/sessions"> Browse Sessions</Button>
                </li>  
                  <li>
                   <Button onClick={handleOpenModal}>Upcoming Sessions</Button>
                </li>
              </ul>
           </nav>
                 
        </header>

        <Modal ref={modalRef} title="Upcoming">
          <ul>
              {upcomingSessions.sessions.map((session)=>
              <div className="upcoming .form-actions">
                <li key={session.id} className="upcoming-session">
                  <h3 className="upcoming__info h3">{session.title}</h3>
                  <p className="upcoming__info p">{session.summary}</p>
                  <time className="upcoming__info time ">{session.date}</time>
                  <Button textOnly onClick={()=>handleCancelSession(session.id)}>cancel</Button>
               </li>
              </div>
                  )
              }
          </ul>
            {upcomingSessions.sessions.length === 0 && <p>No upcoming sessions</p>}
            <Button onClick={handleCloseModal}>Close</Button>
           
        </Modal>
        </>

    )
}