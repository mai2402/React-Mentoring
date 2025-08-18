import { useNavigate } from "react-router-dom";
import { useAuthenticationContext } from "../../core/store/authContext";
import Button from "../../shared/ui/Button";
import { UserRole } from "../../modules/user/enums/users";
import { AppRoute } from "../enums/routes";



export default  function NotAuthorizedPage (){
     const {userProfile} = useAuthenticationContext();
     const navigate = useNavigate();

     
     
  const handleRedirection = () => {

      if (userProfile?.role === UserRole.ADMIN) {
        return navigate(AppRoute.Dashboard);
      }

     return navigate(AppRoute.Home);
};

          
     
    return(
     <main className="not-found">
        <h1>🚫 Not Authorized</h1>
        <p>You don't have permission to view this page.</p>
        <Button onClick={handleRedirection} >Go to Home</Button>
      </main>
    )
}