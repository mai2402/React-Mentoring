import { AppRoute } from "../../../app/enums/routes";
import { ProtectedRoute } from "../../auth/components/ProtectedRoute";
import { UserRole } from "../enums/users";
import Profile from "../pages/Profile";





export const userRoutes = [
   { path: AppRoute.Profile, 
          element:
        <ProtectedRoute roleRequired={UserRole.USER}>
          <Profile/>
        </ProtectedRoute>
        },
]