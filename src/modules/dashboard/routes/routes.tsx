import { ProtectedRoute } from "../../auth/components/ProtectedRoute";
import CreateAdminForm from "../components/admin/createAdminForm";
import AddEditSessionForm from "../components/sessions/AddEdiSessionForm";
import DashboardLayout from "../layout/dashboardLayout";
import CreateAdminPage from "../pages/createAdmin";
import DashboardHome from "../pages/dashboardHome";
import ManageSessions from "../pages/manageSessions";
import { AdminProfile } from "../pages/profile";
import Settings from "../pages/settings";
import UsersPage from "../pages/users/users";



export const dashboardRoutes = [
    {
    path: "/dashboard",
    element: (
      <ProtectedRoute roleRequired="admin">
        <>
          <DashboardLayout />
        </>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "sessions",
        children: [
           { index: true , element: <ManageSessions />},
           { path: "add-session", element: <AddEditSessionForm/> },
            { path: "edit-session/:sessionId", element: <AddEditSessionForm/> },
           ]
        },
       { path: "new-admin", element: <CreateAdminForm /> },
      { path: "create-admin", element: <CreateAdminPage /> },
      { path: "settings", element: <Settings /> },
       {path: "users", element: <UsersPage/>}
    ],
  },
]