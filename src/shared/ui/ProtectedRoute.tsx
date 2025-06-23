
import { useAuthenticationContext } from "../../core/store/authContext";
import { Navigate, useLocation } from "react-router-dom";
import Spinner from "./Spinner";


export function ProtectedRoute ({children}: {children: JSX.Element}){
    const {isAuthenticated,isLoading} = useAuthenticationContext()
    const location = useLocation()
     
   if (isLoading) {
      return <Spinner/>
   }

    
   if (!isAuthenticated){
      return <Navigate to="/" state={{from: location}} replace/>
   }

   return<>{children}</>
}