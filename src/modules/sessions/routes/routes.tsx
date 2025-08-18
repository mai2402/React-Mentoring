import { AppRoute } from "../../../app/enums/routes";
import { ProtectedRoute } from "../../auth/components/ProtectedRoute";
import { UserRole } from "../../user/enums/users";
import SessionPage from "../pages/Session";
import SessionsPage from "../pages/Sessions";
import UpComingSessionsPage from "../pages/UpComing";




export const sessionRoutes = [
  {path: AppRoute.Sessions , element: <SessionsPage/>},
  { path: AppRoute.SessionDetails, element: <SessionPage /> },
  { path: AppRoute.Upcoming, 
          element:
        <ProtectedRoute roleRequired={UserRole.USER}>
          <UpComingSessionsPage/>
        </ProtectedRoute>
        }
]