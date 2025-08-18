import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../../../shared/ui/Button";
import Form from "../../../../shared/ui/Form";
import Input from "../../../../shared/ui/Input";
import Spinner from "../../../../shared/ui/Spinner";
import { AddEditSessionFormData, sessionSchema } from "../../validation/AddEditSessionForm";
import { useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { Session } from "../../../sessions/interfaces/session";
import { ZodUUID } from "zod/v4";
import { useEditAddSession } from "../../hooks/sessions/useEditAddSession";
import { AppRoute } from "../../../../app/enums/routes";




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
  type SessionWithId = Session & { id: ZodUUID };
  
  const sessionFromState = location.state as SessionWithId | undefined;
  const isEditMode = Boolean(sessionFromState);

   const navigate = useNavigate();
   const queryClient = useQueryClient();

   const {mutate: addEditSession, isPending} = useEditAddSession((newSession)=>{

       toast.success("Session saved successfully!!!")
     
       // Optimistically update the cache
        queryClient.setQueryData<Session[]>(["sessions"], (old) => {
          const filtered = (old ?? []).filter(s => s.id !== newSession.id);
          return [newSession, ...filtered];
      });

      // Refetch in background for data freshness
       queryClient.invalidateQueries({ queryKey: ["sessions"] });
       navigate(AppRoute.DashboardSessions);
  },
);


const defaultSessionValues: AddEditSessionFormData = sessionFromState
  ? { 
      ...sessionFromState, 
      id: sessionFromState.id?.toString?.() ?? sessionFromState.id 
    }
  : {
      title: "",
      summary: "",
      description: "",
      duration: 0,
      date: new Date().toISOString().split("T")[0],
      image: "",
    };


const handleSubmit = (data: AddEditSessionFormData) => {

  const sessionWithId = isEditMode
    ? { ...sessionFromState, ...data, id: sessionFromState!.id }
    : data;

  addEditSession(sessionWithId as Session);
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
            
             
                   < div className="modal-actions">
                             <Button type="submit">{isEditMode?"Edit Session" :'Add Session'}</Button>
                             <div className="half-width">
                             <Button textOnly to={AppRoute.Home}>Cancel</Button>
                             </div>
               </div>
            </>
            }
        </Form>
        </div>
    )
}