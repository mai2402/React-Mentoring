import { UserCard, UserProfile } from "../interface/user";

export default function UserProfileCard(profile: UserCard) {
  const { name, avatar_url, email, phone, bio, created_at } = profile.profile?? {} as UserProfile;


  return (
    <div className="profile">
      <div className="profile__card">
        <img src={avatar_url} alt={name} className="profile__avatar" />
        <div className="profile__info">
          <h2 className="profile__name">{name}</h2>
          <p className="profile__email">{email}</p>
          <p className="profile__phone">{phone}</p>
          <p className="profile__joined">Joined: {new Date(created_at ?? new Date()).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="profile__bio">
        <h3>Bio</h3>
        <p>{bio || "No bio available."}</p>
      </div>
    </div>
  );
}
