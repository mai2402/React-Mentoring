import { ProtectedRoute } from "../../../shared/ui/ProtectedRoute";
import Profile from "../pages/Profile";





export const userRoutes = [
   { path: '/profile', 
          element:
        <ProtectedRoute>
          <Profile/>
        </ProtectedRoute>
        },
]