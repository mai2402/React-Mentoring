import { CustomInputProps } from "../types/interfaces";



export default function Input(props: CustomInputProps){
  const { label ,name ,id, ...rest} = props;
  const inputId = name ?? id ;

    return(
        <div className="input-group">
            <label htmlFor={inputId} className="input-group label " >
              {label}
            </label>
            <input className="input-group input" name={name} id={inputId}  {...rest} />
        </div>
    )
}