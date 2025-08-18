import {useCallback, useMemo, useState} from "react";
import {UserProfile} from "../../../user/interface/user";
import {deleteUser, toggleUserActive, updateUserRole} from "../../services/users/users";
import {useQueryClient} from "@tanstack/react-query";
import {getModals} from "../../../../shared/utils/getModalType";
import toast from "react-hot-toast";
import { UserRole } from "../../../user/enums/users";

export function useUsersTableActions() {

    const [modalType, setModalType] = useState < "delete" | "toggleActive" | "changeRole" | null > (null);
    const [targetUser,setTargetUser] = useState < UserProfile | null > (null);
    const queryClient = useQueryClient();

    /**
     * Handles the deletion of a user.
     * It calls the deleteUser service, shows a success message on success,
     * and invalidates the user query to refresh the user list.
     * If an error occurs, it shows an error message.
     */
    const handleDelete = useCallback( async() => {
        try {
            if (targetUser) {
                await deleteUser(targetUser.id);
                toast.success("User deleted successfully");
                queryClient.invalidateQueries({queryKey: ['profiles']});
                setModalType(null);
            }
        } catch (err) {
            toast.error("Failed to delete user");
            console.error("Delete failed:", err);
        }
    }, [targetUser, queryClient]);


    /**
     * Handles toggling the active status of a user.
     * It calls the toggleUserActive service, shows a success message on success,   
     * and invalidates the user query to refresh the user list.
     * If an error occurs, it shows an error message.
     */
    const handleToggleActive =  useCallback(async() => {
        try {

            if (targetUser) {
                await toggleUserActive(targetUser.id, !targetUser.isActive);
                toast.success(`User ${targetUser.isActive
                    ? "deactivated"
                    : "activated"} successfully`);
                    queryClient.invalidateQueries({queryKey: ['profiles']});
                 setModalType(null);
            }
        } catch (err) {
            toast.error("Failed to toggle user active status");
            console.error("Toggle active failed:", err);
        };
    },[targetUser, queryClient]);

    /** 
     * Handles changing the role of a user.
     * It calls the updateUserRole service, shows a success message on success,
     * and invalidates the user query to refresh the user list.
     * If an error occurs, it shows an error message.
     */
    const handleChangeRole = useCallback( async() => {
           if (!targetUser) return;

       const newRole = targetUser.role === UserRole.ADMIN? UserRole.USER : UserRole.ADMIN;
        try {
            if (targetUser) {
                await updateUserRole(targetUser.id, newRole);
                toast.success("User role updated successfully");
                setTargetUser(null);
                queryClient.invalidateQueries({queryKey: ['profiles']});
                setModalType(null);
            }
        } catch (err) {
            toast.error("Failed to change user role");
            console.error("Change role failed:", err);
        };
    },[targetUser, queryClient]);

    // Define the actions for each user in the table
    // This will be used to generate the action buttons in the user table
    const actions = (user : UserProfile) => [
        {
            label: "Change Role",
            icon: "🛠️",
            action: () => {
                setTargetUser(user);
                setModalType("changeRole");
            }
        }, {
            label: user.isActive
                ? "Deactivate"
                : "Activate",
            icon: user.isActive
                ? "🚫"
                : "✅",
            action: () => {
                setTargetUser(user);
                setModalType("toggleActive");
            }
        }, {
            label: "Delete",
            icon: "🗑️",
            action: () => {
                setTargetUser(user);
                setModalType("delete");
            }
        }
    ];

    // Generate modals based on the current modal type and target user
    // This will create the modals needed for delete, toggle active, and change role actions
    const modals = useMemo(()=> 
        getModals({
            modalType,
            targetUser,
            setModalType,
            handleDelete,
            handleToggleActive,
            handleChangeRole
        }), [modalType, targetUser, setModalType, handleDelete, handleToggleActive, handleChangeRole]);

    return {actions, modals}

}