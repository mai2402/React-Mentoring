
import { useState } from "react";
import { useBookingContext } from "../contexts/bookingContext";
import { SessionAction } from "../enums/enums";
import Button from "./Button";
import Modal from "./Modal";




export default function Header() {
   const[isOpen, setIsOpen]= useState(false)
   const {state , dispatch} = useBookingContext()
   const upcomingSessions = state.sessions;
   
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
                   <Button onClick={()=> setIsOpen(true)}>Upcoming Sessions</Button>
                </li>
              </ul>
           </nav>
                 
        </header>

        <Modal  isOpen={isOpen} title="Upcoming" scrollable={upcomingSessions.length > 3}>
          <ul>
              {upcomingSessions.map((session)=>
              <div className="upcoming .form-actions">
                <li key={session.id} className="upcoming-session">
                  <h3 className="upcoming__info h3">{session.title}</h3>
                  <p className="upcoming__info p">{session.summary}</p>
                  <time className="upcoming__info time ">{session.date}</time>
                  <div style={{display: 'flex', gap: '1rem', alignItems:'flex-end'}}>
                  <Button textOnly onClick={()=>handleCancelSession(session.id)}>cancel</Button>
                  </div>
               </li>
              </div>
                  )
              }
          </ul>
            {upcomingSessions.length === 0 && <p>No upcoming sessions</p>}
            <div className="form-actions">
            <Button onClick={()=> setIsOpen(false)}>Close</Button>
            </div>
           
        </Modal>
        </>

    )
}