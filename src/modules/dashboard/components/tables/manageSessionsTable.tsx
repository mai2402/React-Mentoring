import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { Session } from "../../../sessions/interfaces/session";
import { useDeleteSession } from "../../hooks/useDeleteSession";

import Table from "../../../../shared/ui/Table";
import Button from "../../../../shared/ui/Button";
import Spinner from "../../../../shared/ui/Spinner";

import { FaPlus } from "react-icons/fa";
import { sessionTableColumns } from "../../config/sessions/sessionsTable";
import { useState } from "react";
import ConfirmModal from "../../../../shared/components/ConfirmModal";



 interface ManageSessionsTableProps {
  sessions: Session[];
}

export default function ManageSessionsTable({ sessions }: ManageSessionsTableProps) {
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>( null)
  const navigate = useNavigate();
  const queryClient = useQueryClient();


  const { mutate: deleteSession, isPending } = useDeleteSession(() => {
    toast.success("Session deleted!");
    queryClient.invalidateQueries({ queryKey: ["sessions"] });
  });

  const handleEdit = (session: Session) => {
    
    navigate(`/dashboard/sessions/edit-session/${session.id}`, {state: session})
  };

  const handleConfirmDelete = () => {
    if(confirmDeleteId)
      deleteSession(confirmDeleteId)
      setConfirmDeleteId(null)
  };

  const actions = (session: Session) => [
    {
      label: "Edit",
      icon: "✏️",
      action: () => handleEdit(session),
    },
    {
      label: "Delete",
      icon: "🗑️",
      action: () => setConfirmDeleteId(session.id),
    },
  ];

  if (isPending) return <Spinner />;

  return (
    <>
      <div className="flex-between">
        <h2>Available Sessions</h2>
        <Button to="/dashboard/sessions/add-session">
          Create <FaPlus />
        </Button>
      </div>

      <Table data={sessions} columns={sessionTableColumns} actions={actions} />

       <ConfirmModal
          onConfirm={handleConfirmDelete}
          onCancel={() => setConfirmDeleteId(null)}
          title="Delete Session"
          message="Are you sure you want to delete this session?"
          cancelLabel="Cancel"
          confirmLabel="Yes, Delete"
          onClose={() => setConfirmDeleteId(null)}
          isOpen={!!confirmDeleteId}
         />
    </>
  );
}
