import RequireAdmin from "../guards/requireAdmin";
import DashboardLayout from "../layout/dashboardLayout";
import CreateAdminPage from "../pages/createAdmin";
import DashboardHome from "../pages/dashboardHome";
import ManageSessions from "../pages/manageSessions";
import Settings from "../pages/settings";



export const dashboardRoutes = [
    {
    path: "/dashboard",
    element: <RequireAdmin> <DashboardLayout /></RequireAdmin>,
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "sessions", element: <ManageSessions /> },
      { path: "create-admin", element: <CreateAdminPage /> },
      { path: "settings", element: <Settings /> }
    ],
  },
]