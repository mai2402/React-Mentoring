import Form from "../../../../shared/ui/Form";
import Input from "../../../../shared/ui/Input";
import { AddEditSessionFormData, sessionSchema } from "../../validation/AddEditSessionForm";




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
 
 const defaultSessionValues = {
  title: "",
  summary: "",
  description: "",
  duration: 0,
  date: new Date().toISOString().split("T")[0], 
  image: "",
};
    const handleSubmit = (data:AddEditSessionFormData)=> {
      console.log(data)
    }

    return(
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
                {...register(field.name as keyof AddEditSessionFormData)}
                error={errors[field.name as keyof AddEditSessionFormData]?.message}
            />
           )}
            </>
            }
        </Form>
    )
}