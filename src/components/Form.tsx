import { FormProvider, useForm } from "react-hook-form";
import { CustomFormProps } from "../interfaces/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";



export default function Form<T extends Record<string, any>>
({children, onSubmit, schema, defaultValues}: CustomFormProps<T>) {
    const methods = useForm<T>({
        resolver: zodResolver(schema), 
                defaultValues: defaultValues,
        
    })
    const { handleSubmit} = methods;


    return(
        <FormProvider {...methods}>
        <form onSubmit={handleSubmit((data)=>onSubmit(data, methods))} className="form">
            {children(methods)}
        </form>
        </FormProvider>
    )
}