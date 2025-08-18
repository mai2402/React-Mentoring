import { AppRoute } from "../../../app/enums/routes";
import Login from "../pages/Login";
import SignUpPage from "../pages/SignUp";



export const authRoutes = [
  {path: AppRoute.Login , element: <Login/>},
  {path: AppRoute.SignUp , element: <SignUpPage/>}
]