
import { UserCard, UserProfile } from "../interface/user";
import ProfileSidebar from "./profile-sidebar/ProfileSidebar";
import ShortcutsList from "./profile-sidebar/sidebar-content/ShortcutsList";
import LinksList from "./profile-sidebar/sidebar-content/LinksList";
import ProfileMainContent from "./profile-main/ProfileMainContent";
import ProfileHeader from "./profile-main/profile-main-content/ProfileHeader";
import ProfileKPIs from "./profile-main/profile-main-content/ProfileKPIs";
import ProfileTabs from "./profile-main/profile-main-content/ProfileTabs";
import ProfileBio from "./profile-main/profile-main-content/ProfileBio";
import toast from "react-hot-toast";


export default function UserProfileContent(profile: UserCard) {
  const { name, email, phone, bio, created_at,isActive, id } =
  
   profile.profile?? {} as UserProfile;

     const handleCopyEmail = () => {
       navigator.clipboard.writeText(email ?? "");
       toast.success("Email copied to clipboard");

     }

     const handleEditProfile = () => { console.log("Edit profile clicked"); }


  return (
   <div className="profile">
      
    {/* PROFILE SIDEBAR CONTENT */}

      <ProfileSidebar
        isActive={isActive}
        onEdit={handleEditProfile}
        onCopy={handleCopyEmail}
        name={name}
        userId={id}
        >
    
        <ShortcutsList/>
        
        <LinksList/>

      </ProfileSidebar>

   {/* PROFILE MAIN CONTENT */}
   
    <ProfileMainContent>
      <ProfileHeader
        name={name}
        email={email}
        phone={phone}
        created_at={created_at}
        />

       <ProfileKPIs/>

       <ProfileTabs/>

       <ProfileBio bio={bio}/>

    </ProfileMainContent>
  
    </div>
  );
}
