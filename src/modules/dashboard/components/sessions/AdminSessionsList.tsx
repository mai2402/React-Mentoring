import EmptyContent from "../../../../shared/ui/EmptyContent";
import Spinner from "../../../../shared/ui/Spinner";
import { useGetSessions } from "../../../sessions/hooks/useGetSessions";
import AdminSessionDetails from "./AdminSessionDetails";




export default function AdminSessionsList (){

  const {data: sessionsList, isLoading, error} = useGetSessions()
   

  if(isLoading) return <Spinner/>

  if(error) return <EmptyContent message="error loading session"  />

  return (
     <ul className="sessions__list">
        {sessionsList?.map((session)=>
        <li key={session.id}>
            <AdminSessionDetails session={session}  />
        </li>
        )}
     </ul>
  )

}