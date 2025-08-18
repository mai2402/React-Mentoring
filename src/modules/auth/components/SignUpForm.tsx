import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSignUpUser } from "../../user/hooks/useSignUpUser";
import Spinner from "../../../shared/ui/Spinner";
import { FormField, SignUpFormData, signUpSchema } from "../validation/SignUpForm";
import Form from "../../../shared/ui/Form";
import Input from "../../../shared/ui/Input";
import Button from "../../../shared/ui/Button";
import { FormFieldType } from "../enums/signUpForm";
import { ToastSuccess } from "../../../shared/enums/toasts";
import { AppRoute } from "../../../app/enums/routes";

export interface SignUpField {
  name: FormField;
  label: string;
  type: FormFieldType;
  required?: boolean;
}

const signUpFields: ReadonlyArray<SignUpField> = [
  { name: "name",     label: "Full Name",   type: FormFieldType.Text,     required: true },
  { name: "email",    label: "Email",       type: FormFieldType.Email,    required: true },
  { name: "password", label: "Password",    type: FormFieldType.Password, required: true },
  { name: "phone",    label: "Phone Number",type: FormFieldType.Tel,      required: false },
] as const;


export default function SignUpForm() {
  const navigate = useNavigate();
  const { mutate: signUp, isPending} = useSignUpUser(() => {
            toast.success(ToastSuccess.Created);
            navigate(AppRoute.Profile);
    }
  ) 
  const defaultValues = { name: "", email: "", password: "", phone: "" };

  if(isPending) return <Spinner/>

  const handleSubmit =  (data: SignUpFormData) => {
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
              <p 
               style={{ textAlign: "justify" , marginTop: "1rem" , color: "var(--color-text-secondary)"}}>
              Already have an account?{" "}
              <Button textOnly to={AppRoute.Login} className="login-link">
                Log in
              </Button>
              </p>

              <div className="signup-actions modal-actions">
                <Button type="submit">Sign Up</Button>
                <div className="half-width">
                <Button textOnly to={AppRoute.Home}>Cancel</Button>
              </div>
              </div>
            
          </>
          )}
      </Form>
</div>

  );
}
