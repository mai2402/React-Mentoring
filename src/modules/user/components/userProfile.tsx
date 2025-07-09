import UserProfileCard from "./UserProfileCard";
import Spinner from "../../../shared/ui/Spinner";
import { useAuthenticationContext } from "../../../core/store/authContext";


export default function UserProfile() {

  const {userProfile,isLoading} = useAuthenticationContext();



  if (isLoading) return <Spinner />;


  return (
 

     <UserProfileCard profile={userProfile} />
  
  );
}