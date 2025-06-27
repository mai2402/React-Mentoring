import Button from "../../../shared/ui/Button";
import Form from "../../../shared/ui/Form";
import Input from "../../../shared/ui/Input";
import { CreateAdminFormData, createAdminSchema } from "../validation/createAdminForm";
import { useCreateNewAdmin } from "../hooks/useCreateNewAdmin";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Spinner from "../../../shared/ui/Spinner";


 const createAdminFields = [
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



export default function CreateAdminForm (){

 const navigate = useNavigate(); 
 const {mutate: createAdmin, isPending } = useCreateNewAdmin(

  ()=> {  
            toast.success("New Admin Created!!");
            navigate("/dashboard");
        }
 );
 const defaultValues = { name: "", email: "", password: "", phone: "" };
 
  const handleSubmit = (formData: CreateAdminFormData) => {
      createAdmin(formData)
     console.log("form data admin", formData)
  }


   
     if(isPending) return <Spinner/>
  
    return (
        <Form<CreateAdminFormData>
            onSubmit={handleSubmit}
            schema={createAdminSchema}
            defaultValues={defaultValues}>

            {({register, formState:{errors}})=>(
              <>
                 {createAdminFields.map((field)=>
                    <Input
                        key={field.name}
                        label={field.label}
                        type={field.type}
                        {...register(field.name as keyof CreateAdminFormData)}
                        error={errors[field.name as keyof CreateAdminFormData]?.message}
                    />
                 )}
                  <div className="signup-actions">
                                 <Button type="submit">{isPending?"Creating...":"Create Admin"}</Button>
                                 <Button textOnly to="/">Cancel</Button>
                  </div>
              </>
      )}
           
        </Form>
    )
}