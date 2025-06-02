import { forwardRef } from "react";
import { CustomInputProps } from "../types/interfaces";



 const Input = forwardRef<HTMLInputElement, CustomInputProps>((props, ref) => {
  const { label ,name ,id,...rest} = props;
  const inputId = name ?? id ;

    return(
        <div className="input-group">
            <label htmlFor={inputId} className="input-group label " >
              {label}
            </label>
            <input className="input-group input" name={name} id={inputId} ref={ref} {...rest} />
        </div>
    )
});


export default Input;