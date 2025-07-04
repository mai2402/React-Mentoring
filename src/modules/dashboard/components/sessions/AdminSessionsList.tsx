import EmptyContent from "../../../../shared/ui/EmptyContent";
import Spinner from "../../../../shared/ui/Spinner";
import { useGetSessions } from "../../../sessions/hooks/useGetSessions";
import ManageSessionsTable from "../table/manageSessionsTable";





export default function AdminSessionsList (){

  const {data: sessionsList, isLoading, error} = useGetSessions()
   

  if(isLoading) return <Spinner/>

  if(error) return <EmptyContent message="error loading session"  />

  return (
      
   <ManageSessionsTable  sessions={sessionsList ?? []}/>
      
       
  )

}