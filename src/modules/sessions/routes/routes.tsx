import { ProtectedRoute } from "../../auth/components/ProtectedRoute";
import SessionPage from "../pages/Session";
import SessionsPage from "../pages/Sessions";
import UpComingSessionsPage from "../pages/UpComing";




export const sessionRoutes = [
  {path: '/sessions' , element: <SessionsPage/>},
  { path: 'sessions/:sessionId', element: <SessionPage /> },
  { path: '/upcoming', 
          element:
        <ProtectedRoute roleRequired="user">
          <UpComingSessionsPage/>
        </ProtectedRoute>
        }
]