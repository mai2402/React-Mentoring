import { useNavigate } from "react-router-dom";
import { useAuthenticationContext } from "../../contexts/authContext";
import { LoginFormData, loginSchema } from "../../validation/session";
import Form from "../Form";
import Modal from "../Modal";
import Input from "../Input";
import Button from "../Button";
import { LoginModalProps } from "../../types/types";



export function LoginModal ({ onClose, isOpen }: LoginModalProps){

    const { login} = useAuthenticationContext()
  
  const navigate = useNavigate()

    function handleLogin({email,password}:LoginFormData) {

     login(email,password);
     navigate("/dashboard")
     console.log("logged in....")

  }
    return(
         <Modal title="Log in to continue" isOpen={isOpen} onClose={onClose}>
          <Form
            onSubmit={handleLogin}
            schema={loginSchema} 
            defaultValues={{ email: "", password: "" }}
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

                <Button type="submit">Login</Button>
                <Button textOnly onClick={() => onClose?.()} >cancel</Button>
              </>
            )}
          </Form>
        </Modal>
    )
}