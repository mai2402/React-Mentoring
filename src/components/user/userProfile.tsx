import UserProfileCard from "./UserProfileCard";
import Spinner from "../shared/Spinner";
import { useGetUserProfile } from "../../hooks/users/useGetUserProfile";
import EmptyContent from "../shared/EmptyContent";


export default function UserProfile() {

  const { data: userProfile, isError, isLoading} = useGetUserProfile();

  console.log("User Profile Data:", userProfile);

  if (isLoading) return <Spinner />;

  if (isError || !userProfile) {
    return <EmptyContent message="Error loading user profile" />;
  }


  return (
 

     <UserProfileCard profile={userProfile} />
  
  );
}