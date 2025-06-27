import RequireAdmin from "../guards/requireAdmin";
import DashboardLayout from "../layout/dashboardLayout";
import CreateAdminPage from "../pages/createAdmin";
import DashboardHome from "../pages/dashboardHome";
import ManageUsers from "../pages/manageUsers";
import Settings from "../pages/settings";



export const dashboardRoutes = [
    {
    path: "/dashboard",
    element: <RequireAdmin> <DashboardLayout /></RequireAdmin>,
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "users", element: <ManageUsers /> },
      { path: "create-admin", element: <CreateAdminPage /> },
      { path: "settings", element: <Settings /> }
    ],
  },
]