
import { useAuthenticationContext } from "../contexts/authContext";
import { Navigate } from "react-router-dom";


export function ProtectedRoute ({children}: {children: JSX.Element}){
    const {isAuthenticated} = useAuthenticationContext()
     
    return isAuthenticated ? children : <Navigate to="/"  replace/>
}