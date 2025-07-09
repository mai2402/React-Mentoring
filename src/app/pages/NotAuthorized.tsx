import { Navigate, useNavigate } from "react-router-dom";
import { useAuthenticationContext } from "../../core/store/authContext";
import Button from "../../shared/ui/Button";



export default  function NotAuthorizedPage (){
     const {userProfile} = useAuthenticationContext();
     const navigate = useNavigate();

     
     
  const handleRedirection = () => {

      if (userProfile?.role === "admin") {
        return navigate("/dashboard");
      }

     return navigate("/");
};

          
     
    return(
     <main className="not-found">
        <h1>🚫 Not Authorized</h1>
        <p>You don't have permission to view this page.</p>
        <Button onClick={handleRedirection} >Go to Home</Button>
      </main>
    )
}