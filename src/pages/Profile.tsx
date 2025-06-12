import EmptyContent from "../components/shared/EmptyContent";
import SideBar from "../components/layout/Side-bar";
import Spinner from "../components/shared/Spinner";
import UserProfile from "../components/user/userProfile";
import { useGetUserProfile } from "../hooks/users/useGetUserProfile";


export default function Profile(){
    const {data: user, error, isLoading} = useGetUserProfile()

    if(isLoading) return <Spinner/>

    if(error) return<EmptyContent message="Error loading user profile" />

    return(
        <>
        <SideBar user={user}/>
        <UserProfile/>
        </>
    )
}