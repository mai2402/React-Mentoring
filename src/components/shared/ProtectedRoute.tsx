
import { useAuthenticationContext } from "../../contexts/authContext";
import { Navigate, useLocation } from "react-router-dom";


export function ProtectedRoute ({children}: {children: JSX.Element}){
    const {isAuthenticated} = useAuthenticationContext()
    const location = useLocation()
     
   if (!isAuthenticated){
      return <Navigate to="/" state={{from: location}} replace/>
   }

   return<>{children}</>
}