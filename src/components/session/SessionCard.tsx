


import { useState } from "react";
import { useAuthenticationContext } from "../../contexts/authContext";
import { SessionCardProps } from "../../interfaces/interfaces";
import Button from "../shared/Button";
import { LoginModal } from "../modals/LoginModal";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../../services/userServices";
import { useModal } from "../../hooks/useModal";


export default function SessionCard({ session }: SessionCardProps) {
  const { title, summary, image, id } = session;
  const { isAuthenticated } = useAuthenticationContext();
  const loginModal = useModal<string>();
  const navigate = useNavigate();
 
  const handleLearnMoreClick = () => {

    if (!isAuthenticated) loginModal.open(id);
    else {
      navigate(`/sessions/${id}`);
      getUserProfile();
    }

  }


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

  
    <LoginModal
        onClose={loginModal.close} 
        sessionId={loginModal.payload!}  
        isOpen={loginModal.isOpenModal}
    />

   </>
  )
  
}
