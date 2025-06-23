import { useNavigate } from "react-router-dom";
import { useAuthenticationContext } from "../../core/store/authContext";
import { LoginFormData, loginSchema } from "../../modules/sessions/validation/session";
import Form from "../ui/Form";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { LoginModalProps } from "../interface/modal";
import toast from "react-hot-toast";



export function LoginModal ({ onClose, isOpen, sessionId }: LoginModalProps){

    const { login} = useAuthenticationContext()
    const navigate = useNavigate()

    const defaultValues = { email: "", password: "" }

     async function handleLogin(formData:LoginFormData) {

      try{
         const {email, password} = formData;

         await  login(email,password);
         navigate(`/sessions/${sessionId}`)
         if(!sessionId) {
           navigate('/profile')
         }
      }
      catch(err){
        toast.error("Login failed. Please check your credentials and try again.");
        console.error("Login error:", err);
      }
      

  }
    return(

         <Modal title="Log in to continue" isOpen={isOpen} onClose={onClose}>
          <Form
            onSubmit={handleLogin}
            schema={loginSchema} 
            defaultValues={defaultValues}
          >
            {({register, formState:{errors}}) => (
              <>
                <Input label="Your Email" 
                       type="email"
                       {...register('email')} 
                       error={errors.email?.message}/>

                <Input label="Your Password"
                       type="password" 
                       {...register('password')} 
                       error={errors.password?.message} />

                       
                  <p className="signup-prompt">
                    Don’t have an account?{" "}
                    <Button textOnly to="/signUp" className="signup-link">Create one</Button>
                  </p>

                <Button type="submit">Login</Button>
                <Button textOnly onClick={() => onClose?.()} >cancel</Button>
          

              </>
            )}
          </Form>
        </Modal>
    )
}