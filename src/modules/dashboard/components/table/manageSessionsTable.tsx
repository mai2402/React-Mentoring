import { Session } from "../../../sessions/interfaces/session";
import { useNavigate } from "react-router-dom";
import Table from "../../../../shared/ui/Table";
import Button from "../../../../shared/ui/Button";
import { FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteSession } from "../../hooks/useDeleteSession";
import Spinner from "../../../../shared/ui/Spinner";

interface ManageSessionsTableProps {
  sessions: Session[];
}

export default function ManageSessionsTable({ sessions }: ManageSessionsTableProps) {
 
   const navigate = useNavigate();
   const queryClient = useQueryClient();
   const {mutate: deleteSession, isPending} = useDeleteSession(()=>{
         toast.success("Session deleted !!")
         queryClient.invalidateQueries({queryKey:["sessions"]})
   })
    
  

   const columns = [
    { key: "title", label: "Title" },
    { key: "date", label: "Date" },
    { key: "summary", label: "Summary" },
    {
      key: "duration",
      label: "Duration",
      render: (s: Session) => `${s.duration} hr`,
    },
  ];

  const actions = (session: Session) => [
    {
      label: "Edit",
      icon: "✏️",
      action: () => navigate("/dashboard/sessions/edit-session"),
    },
    {
      label: "Delete",
      icon: "🗑️",
     action: () =>  deleteSession(session.id)
}
  ];


  if(isPending) return <Spinner/>

  return (
    <>
    <div className="flex-between">
       <h2>Available Sessions</h2>
         <Button to="/dashboard/sessions/add-session">Create <FaPlus/></Button>
    </div>
       <Table  data={sessions} columns={columns} actions={actions}/>
    </>
  );
}
