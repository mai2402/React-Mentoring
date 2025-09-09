import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomFormProps } from "../interface/form";
import { useEffect } from "react";



export default function Form<T extends Record<string, any>>
({children, onSubmit, schema, defaultValues}: CustomFormProps<T>) {
    const methods = useForm<T>({
        resolver: zodResolver(schema), 
                defaultValues: defaultValues,
                mode: 'onChange',
        
    })
    const { handleSubmit} = methods;

    
  console.log('form vals', methods.getValues());
 useEffect(() => {
    methods.reset(defaultValues);
  }, [defaultValues, methods]);

    return(
        <FormProvider {...methods}>
        <form onSubmit={handleSubmit((data)=>onSubmit(data, methods))} className="form">
            {children(methods)}
        </form>
        </FormProvider>
    )
}