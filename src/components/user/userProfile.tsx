import { useEffect, useState } from "react";
import { getUserProfile } from "../../services/userServices";
import { UserProfile as UserInterface } from "../../interfaces/user/user";
import UserProfileCard from "./UserProfileCard";
import Spinner from "../shared/Spinner";


export default function UserProfile() {

 const [ userProfile, setUserProfile ] = useState<UserInterface | null>(null);


 useEffect(()=>{
     const fetchUserProfile = async () => {
        try{
            const profile = await getUserProfile();
            const formattedProfile: UserInterface = {
                id: profile.id,
                email: profile.email || "",
                name: profile.name || "",
                created_at: profile.created_at || "",
                phone: profile.phone || undefined,
                avatar_url: profile.avatar_url || undefined,
               
            }


            setUserProfile(formattedProfile);
        } catch (error) {
            console.error("Error fetching user profile:", error
            )}
            
        
     }
        fetchUserProfile();
 },[])


  return (

    <>
    {!userProfile && <Spinner /> }       

      {userProfile && <UserProfileCard userProfile={userProfile} />}
    </>
  );
}