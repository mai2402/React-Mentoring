import toast from "react-hot-toast";
import { useSignUpUser } from "../../hooks/users/useSignUpUser";
import { SignUpFormData, signUpSchema } from "../../validation/SignUpForm";
import Button from "../shared/Button";
import Form from "../shared/Form";
import Input from "../shared/Input";
import { useNavigate } from "react-router-dom";
import Spinner from "../shared/Spinner";

 const signUpFields = [
  {
    name: "name",
    label: "Full Name",
    type: "text",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    required: true,
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "tel",
    required: false,
  },
];

export default function SignUpForm() {
  const navigate = useNavigate();
  const { mutate: signUp, isPending} = useSignUpUser(() => {
            toast.success("Account created!");
            navigate("/profile");
    }
  ) 
  const defaultValues = { name: "", email: "", password: "", phone: "" };

  if(isPending) return <Spinner/>

  const handleSubmit =  (data: SignUpFormData) => {
    console.log("form submitted", data);
    signUp(data)
  };

  return (
   <div className="signup-form">

      <Form<SignUpFormData>
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
        schema={signUpSchema}
      >
        {({ register, formState: { errors } }) => (
          <>
            {signUpFields.map((field) => (
              <Input
                key={field.name}
                label={field.label}
                type={field.type}
                {...register(field.name as keyof SignUpFormData)}
                error={errors[field.name as keyof SignUpFormData]?.message}
              />
            ))}
              <div className="signup-actions">
                <Button type="submit">Sign Up</Button>
                <Button textOnly to="/">Cancel</Button>
              </div>
          </>
          )}
      </Form>
</div>

  );
}
