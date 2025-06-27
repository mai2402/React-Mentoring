import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSignUpUser } from "../../user/hooks/useSignUpUser";
import Spinner from "../../../shared/ui/Spinner";
import { SignUpFormData, signUpSchema } from "../validation/SignUpForm";
import Form from "../../../shared/ui/Form";
import Input from "../../../shared/ui/Input";
import Button from "../../../shared/ui/Button";



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
            toast.success("Welcome on Board!!");
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
