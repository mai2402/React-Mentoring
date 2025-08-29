import { formatDate } from "../../../../../shared/utils/formatDate";

interface ProfileHeaderProps {
    name?: string;
    email?: string;
    phone?: string;
    created_at?: string;
}

export default function ProfileHeader({name,phone,email,created_at}: ProfileHeaderProps) {


    return(
     <header className="profile__header">
      <div className="profile__title">
        <h2 className="profile__name">
          {name} <span className="check"></span>
        </h2>
        <div className="profile__meta">
          
          <span className="chip chip--muted">{email}</span>
          <span className="chip chip--muted">+20{phone}</span>
          <span className="chip chip--muted">{formatDate(created_at)}</span>
        </div>
      </div>
    </header>
    )
}