import { AppRoute } from "../../../app/enums/routes";
import { ProtectedRoute } from "../../auth/components/ProtectedRoute";
import { UserRole } from "../../user/enums/users";
import CreateAdminForm from "../components/admin/createAdminForm";
import AddEditSessionForm from "../components/sessions/AddEdiSessionForm";
import DashboardLayout from "../layout/dashboardLayout";
import CreateAdminPage from "../pages/createAdmin";
import DashboardHome from "../pages/dashboardHome";
import ManageSessions from "../pages/manageSessions";
import Settings from "../pages/settings";
import UsersPage from "../pages/users/users";



export const dashboardRoutes = [
    {
    path: AppRoute.Dashboard,
    element: (
      <ProtectedRoute roleRequired={UserRole.ADMIN}>
        <>
          <DashboardLayout />
        </>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardHome /> },
      { path: AppRoute.DashboardSessions,
        children: [
           { index: true , element: <ManageSessions />},
           { path: AppRoute.AddSession, element: <AddEditSessionForm/> },
            { path: AppRoute.EditSession, element: <AddEditSessionForm/> },
           ]
        },
       { path: AppRoute.DashboardNewAdmin, element: <CreateAdminForm /> },
      { path: AppRoute.DashboardCreateAdmin, element: <CreateAdminPage /> },
      { path: AppRoute.DashboardSettings, element: <Settings /> },
       {path: AppRoute.DashboardUsers, element: <UsersPage/>}
    ],
  },
]