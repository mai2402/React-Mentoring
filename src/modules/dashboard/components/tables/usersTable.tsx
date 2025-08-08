
import ConfirmModal from "../../../../shared/components/ConfirmModal";
import Table from "../../../../shared/ui/Table";
import { UserProfile } from "../../../user/interface/user";
import { userTableColumns } from "../../config/users/usersTable";
import { useUsersTableActions } from "../../hooks/users/useUsersTableActions";

interface UserTableProps {
    users: UserProfile[];
}



export default function UserTable ({users}: UserTableProps)   {
   const {actions, modals } = useUsersTableActions();

    return (
        <>
      <Table
         data={users}
         columns={userTableColumns}
         actions={actions} 
         
         />
        {modals.map((modal) => (
            <ConfirmModal
                key={modal.type}
                isOpen={modal.isOpen}
                title={modal.title}
                cancelLabel={modal.cancelLabel}
                message={modal.message}
                confirmLabel={modal.confirmLabel}
                onCancel={modal.onCancel}
                onConfirm={modal.onConfirm}

               />))}
       
         </>
    )
}