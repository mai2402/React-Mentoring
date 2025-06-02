


import { useState } from "react";
import { useAuthenticationContext } from "../../contexts/authContext";
import { SessionCardProps } from "../../types/interfaces";
import Button from "../Button";
import { LoginModal } from "../modals/LoginModal";
import { BookingModal } from "../modals/BookingModal";
import { SESSIONS } from "../../dummy-sessions";

export default function SessionCard({ session }: SessionCardProps) {
  const { title, summary, image, id } = session;
  const { isAuthenticated } = useAuthenticationContext();


  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleLearnMoreClick = () => {
  console.log("Learn more clicked"); // should see this
  if (!isAuthenticated) {
    setShowLoginModal(true);
  } else {
    setShowBookingModal(true);
  }
};


  const loadedSession = SESSIONS.find((s) => s.id === id);

  return (
    <>
      <article className="session-card">
        <img className="session-card__image" src={image} alt={title} />
        <div className="session-card__content">
          <h3 className="session-card__title">{title}</h3>
          <p className="session-card__description">{summary}</p>
        </div>

        <div className="session-card__footer">
          <Button onClick={handleLearnMoreClick}>Learn more</Button>
        </div>
      </article>

  
    <LoginModal onClose={() => setShowLoginModal(false)}  isOpen={showLoginModal}/>
  


      { loadedSession && (
        <BookingModal
          isOpen={showBookingModal}
          loadedSession={loadedSession}
          onClose={() => setShowBookingModal(false)}
        />
      )}
   </>
  )
  
}
