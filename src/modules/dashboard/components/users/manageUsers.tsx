import Spinner from "../../../../shared/ui/Spinner";
import { useGetAllUsers } from "../../hooks/users/useGetAllUsers";
import UserTable from "../tables/usersTable";


export default function ManageUsers() {
  const { data: users, isLoading } = useGetAllUsers();

  
   if(isLoading) return <Spinner/>

    return (
      <UserTable  users={users || []}/>
    )
}