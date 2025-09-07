import { AppRoute } from "../../../app/enums/routes";
import { ProtectedRoute } from "../../auth/components/ProtectedRoute";
import UserNotifications from "../components/shortcuts/UserNotifications";
import UserPrivacy from "../components/shortcuts/UserPrivacy";
import UserSecurity from "../components/shortcuts/UserSecurity";
import { UserRole } from "../enums/users";
import Profile from "../pages/Profile";





export const userRoutes = [
   { path: AppRoute.Profile, 
     element:
        <ProtectedRoute roleRequired={UserRole.USER}>
          <Profile/>
        </ProtectedRoute>
        },
  { path: AppRoute.Notifications,
    element:
      <ProtectedRoute roleRequired={UserRole.USER}>
        <UserNotifications/>
      </ProtectedRoute>
  },
   { path: AppRoute.Privacy,
    element:
      <ProtectedRoute roleRequired={UserRole.USER}>
        <UserPrivacy/>
      </ProtectedRoute>
  },
   { path: AppRoute.Security,
    element:
      <ProtectedRoute roleRequired={UserRole.USER}>
        <UserSecurity/>
      </ProtectedRoute>
  },

];
