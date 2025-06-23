import UserProfileCard from "./UserProfileCard";
import Spinner from "../shared/Spinner";
import { useAuthenticationContext } from "../../contexts/authContext";


export default function UserProfile() {

  const {userProfile,isLoading} = useAuthenticationContext();

  console.log("User Profile Data:", userProfile);

  if (isLoading) return <Spinner />;


  return (
 

     <UserProfileCard profile={userProfile} />
  
  );
}