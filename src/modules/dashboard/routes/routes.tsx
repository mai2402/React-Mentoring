import { ProtectedRoute } from "../../auth/components/ProtectedRoute";
import AddEditSessionForm from "../components/sessions/AddEdiSessionForm";
import DashboardLayout from "../layout/dashboardLayout";
import CreateAdminPage from "../pages/createAdmin";
import DashboardHome from "../pages/dashboardHome";
import ManageSessions from "../pages/manageSessions";
import { AdminProfile } from "../pages/profile";
import Settings from "../pages/settings";



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
           ]
        },
       { path: "profile", element: <AdminProfile /> },
      { path: "create-admin", element: <CreateAdminPage /> },
      { path: "settings", element: <Settings /> }
    ],
  },
]