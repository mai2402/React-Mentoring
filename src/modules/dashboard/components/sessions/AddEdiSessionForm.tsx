import { useNavigate } from "react-router-dom";
import Button from "../../../../shared/ui/Button";
import Form from "../../../../shared/ui/Form";
import Input from "../../../../shared/ui/Input";
import Spinner from "../../../../shared/ui/Spinner";
import { useAddSession } from "../../hooks/useEditAddSession";
import { AddEditSessionFormData, sessionSchema } from "../../validation/AddEditSessionForm";
import { useQueryClient } from "@tanstack/react-query";




 const sessionFormFields = [
  {
    name: "title",
    label: "Title",
    type: "text",
    placeholder: "Enter session title",
  },
  {
    name: "summary",
    label: "Summary",
    type: "text",
    placeholder: "Short summary of the session",
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Detailed description",
  },
  {
    name: "duration",
    label: "Duration (minutes)",
    type: "number",
    placeholder: "e.g. 60",
    parseAsNumber: true,
  },
  {
    name: "date",
    label: "Date",
    type: "date",
  },
  {
    name: "image",
    label: "Image URL",
    type: "text",
    placeholder: "https://example.com/image.jpg",
  },
];


export default function AddEditSessionForm (){
   const navigate = useNavigate();
   const queryClient = useQueryClient();

   const {mutate: addNewSession, isPending} = useAddSession(()=>{

       queryClient.invalidateQueries({ queryKey: ["sessions"] });
       navigate("/dashboard/sessions");
  },
);


 const defaultSessionValues = {
  title: "",
  summary: "",
  description: "",
  duration: 0,
  date: new Date().toISOString().split("T")[0], 
  image: "",
};
    const handleSubmit = (data:AddEditSessionFormData)=> {

      const sessionWithId = {
        ...data,
        id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36),
      };
      addNewSession(sessionWithId);
    }

    if(isPending) return <Spinner/>

    return(
      <div className="signup-form">
        <Form<AddEditSessionFormData>
            onSubmit={handleSubmit}
            schema={sessionSchema}
            defaultValues={defaultSessionValues}
            >
             

            {({register, formState:{errors}})=>
            <>
            {sessionFormFields.map((field)=>
                <Input
                key={field.name}
                label={field.label}
                type={field.type}
                {...register(
                  field.name as keyof AddEditSessionFormData,
                  field.parseAsNumber ? { valueAsNumber: true } : {}
                )}
                error={errors[field.name as keyof AddEditSessionFormData]?.message}
            />
           )}
            
             <div className="signup-actions">
                             <Button type="submit">Add Session</Button>
                             <Button textOnly to="/">Cancel</Button>
                           </div>
            </>
            }
        </Form>
        </div>
    )
}