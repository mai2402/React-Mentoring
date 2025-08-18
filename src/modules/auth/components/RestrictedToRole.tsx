import { Navigate } from "react-router-dom";
import { useAuthenticationContext } from "../../../core/store/authContext";
import Spinner from "../../../shared/ui/Spinner";
import { AppRoute } from "../../../app/enums/routes";

type RestrictedToRoleProps ={
   children:JSX.Element;
   blockedRoles: string[];
}

export default function RestrictedToRole ({children,blockedRoles }:RestrictedToRoleProps ){
  
    const {isAuthenticated, isLoading, userProfile} = useAuthenticationContext();

        // Still loading auth state? Show spinner
        if (isLoading) return <Spinner />;

        // Not logged in? Allow public pages like HomePage
        if (!isAuthenticated) return children;

        // No role yet? Still allow access
        if (!userProfile?.role) return children;

        // Block specific roles
        if (blockedRoles.includes(userProfile.role)) {
            return <Navigate to={AppRoute.Dashboard} replace />;
        }

        return children;
}