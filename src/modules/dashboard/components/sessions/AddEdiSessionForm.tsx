import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../../../shared/ui/Button";
import Form from "../../../../shared/ui/Form";
import Input from "../../../../shared/ui/Input";
import Spinner from "../../../../shared/ui/Spinner";
import { useEditAddSession } from "../../hooks/useEditAddSession";
import { AddEditSessionFormData, sessionSchema } from "../../validation/AddEditSessionForm";
import { useQueryClient } from "@tanstack/react-query";
import { Session } from "@supabase/supabase-js";
import toast from "react-hot-toast";




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
    label: "Duration (hr)",
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
  const location = useLocation();
  // Extend Session type to include 'id' if not present
  type SessionWithId = Session & { id: string };
  
  const sessionFromState = location.state as SessionWithId | undefined;
  const isEditMode = Boolean(sessionFromState);

   const navigate = useNavigate();
   const queryClient = useQueryClient();

   const {mutate: addEditSession, isPending} = useEditAddSession(()=>{
       toast.success("Session saved successfully!!!")
       queryClient.invalidateQueries({ queryKey: ["sessions"] });
       navigate("/dashboard/sessions");
  },
);


 const defaultSessionValues =  sessionFromState ?
 {...sessionFromState}:
 {
  title: "",
  summary: "",
  description: "",
  duration: 0,
  date: new Date().toISOString().split("T")[0], 
  image: "",
};

const handleSubmit = (data: AddEditSessionFormData) => {
  console.log("🔥 Form submitted with data:", data); 
  const sessionWithId = isEditMode
    ? { ...sessionFromState, ...data, id: sessionFromState!.id } // ensure id is always present and a string
    : {
        ...data,
        id: crypto.randomUUID?.() || Math.random().toString(36),
      };

  addEditSession(sessionWithId);
};


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
                             <Button type="submit">{isEditMode?"Edit Session" :'Add Session'}</Button>
                             <Button textOnly to="/">Cancel</Button>
                           </div>
            </>
            }
        </Form>
        </div>
    )
}