import { Navigate } from "react-router-dom";
import { useAuthenticationContext } from "../../../core/store/authContext";
import Spinner from "../../../shared/ui/Spinner";

type RestrictedToRoleProps ={
   children:JSX.Element;
   blockedRoles: string[];
}

export default function RestrictedToRole ({children,blockedRoles }:RestrictedToRoleProps ){
  
    const {isAuthenticated, isLoading, userProfile} = useAuthenticationContext();

    if (isLoading || !userProfile) return <Spinner />;
    if (!isAuthenticated) return <Navigate to="/login" replace />;

    if (blockedRoles.includes(userProfile?.role ?? "")) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}