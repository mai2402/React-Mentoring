import { ProtectedRoute } from "../../../shared/ui/ProtectedRoute";
import SessionPage from "../pages/Session";
import SessionsPage from "../pages/Sessions";
import UpComingSessionsPage from "../pages/UpComing";




export const sessionRoutes = [
  {path: '/sessions' , element: <SessionsPage/>},
  { path: 'sessions/:id', element: <SessionPage /> },
  { path: '/upcoming', 
          element:
        <ProtectedRoute>
          <UpComingSessionsPage/>
        </ProtectedRoute>
        }
]