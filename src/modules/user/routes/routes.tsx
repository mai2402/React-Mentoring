import { ProtectedRoute } from "../../auth/components/ProtectedRoute";
import Profile from "../pages/Profile";





export const userRoutes = [
   { path: '/profile', 
          element:
        <ProtectedRoute roleRequired="user">
          <Profile/>
        </ProtectedRoute>
        },
]