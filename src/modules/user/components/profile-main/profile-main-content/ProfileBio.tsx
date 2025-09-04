


export default function ProfileBio({ bio, onEdit }:{ bio?: string|null; onEdit?: ()=>void }) {
  return (
    <section className="profile-bio">
      <div className="profile-bio__head">
        <h4>Bio</h4>
        {onEdit && <button className="icon-fab" onClick={onEdit}>✎</button>}
      </div>
      <p>{bio || "No bio yet."}</p>
    </section>
  );
}
