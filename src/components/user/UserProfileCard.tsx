import {UserCard} from "../../interfaces/user/user";


export default function UserProfileCard(userProfile : UserCard) {
    const {userProfile: profile} = userProfile;
   
    return (
        <div className="profile__card">
            <div className="profile__info">
                <img
                    src={profile.avatar_url || "/assets/mafareed.jpg"}
                    alt={profile.name}
                    className="profile__avatar"/>
                <div className="profile__text">
                    <h2 className="profile__name">{profile.name}</h2>
                    <p className="profile__email">{profile.email}</p>
                    <p>{profile.phone}</p>
                </div>
            </div>
            <p className="profile__bio">{profile.bio || "No bio available."}</p>
        </div>
    )
}