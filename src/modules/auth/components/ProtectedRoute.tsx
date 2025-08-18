
import { useAuthenticationContext } from "../../../core/store/authContext";
import { Navigate, useLocation } from "react-router-dom";
import Spinner from "../../../shared/ui/Spinner";
import { AppRoute } from "../../../app/enums/routes";

type ProtectedRouteProps ={
   children:JSX.Element;
   roleRequired?: string;
}
export function ProtectedRoute ({children,roleRequired}: ProtectedRouteProps){
    const {isAuthenticated,isLoading, userProfile} = useAuthenticationContext()
    const location = useLocation()
     
   if (isLoading || !userProfile) {
      return <Spinner/>
   }

    
   if (!isAuthenticated){
      return <Navigate to={AppRoute.Login} state={{from: location}} replace/>
   }

  if (roleRequired && userProfile?.role !== roleRequired){

   return <Navigate to={AppRoute.Unauthorized} />;
  
  }
  
  return <>{children}</>
}