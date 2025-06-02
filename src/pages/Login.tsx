import { useNavigate } from "react-router-dom"
import { useAuthenticationContext } from "../contexts/authContext"
import Button from "../components/Button";


export function Login () {
  const { login} = useAuthenticationContext()
  const navigate = useNavigate()

  function handleLogin() {

     login();
     navigate("/dashboard")

  }

    return(
        <>
        <h1>login page</h1>
        <Button type="button" onClick={handleLogin}> log in</Button>
        </>
    )
}