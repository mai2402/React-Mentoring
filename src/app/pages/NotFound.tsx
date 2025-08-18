import Button from "../../shared/ui/Button";
import { AppRoute } from "../enums/routes";



export default  function NotFoundPage (){
     

    return(
         <main className="not-found">
      <h2>404 - Page Not Found</h2>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <Button to={AppRoute.Home} >Go to Home</Button>
    </main>
    )
}