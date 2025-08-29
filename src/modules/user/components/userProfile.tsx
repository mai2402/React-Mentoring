import Spinner from "../../../shared/ui/Spinner";
import { useAuthenticationContext } from "../../../core/store/authContext";
import UserProfileContent from "./UserProfileContent";


export default function UserProfile() {

  const {userProfile,isLoading} = useAuthenticationContext();

 

  if (isLoading) return <Spinner />;


  return (
 

     <UserProfileContent profile={userProfile} />
  
  );
}