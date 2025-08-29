



export default function ProfileBio( {bio} : { bio?: string | null } ) {

    return (
        <div className="tabs__panel">
            <div className="profile__section">
                <h3>Bio</h3>
                <p className="profile__bio">{bio || "No bio yet."}</p>
            </div>
        </div>
    )
}
