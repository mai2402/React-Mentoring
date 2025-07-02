import { ProtectedRoute } from "../../auth/components/ProtectedRoute";
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
      { path: "sessions", element: <ManageSessions /> },
       { path: "profile", element: <AdminProfile /> },
      { path: "create-admin", element: <CreateAdminPage /> },
      { path: "settings", element: <Settings /> }
    ],
  },
]