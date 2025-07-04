import { forwardRef } from "react";
import { CustomInputProps } from "../interface/input";




 const Input = forwardRef<HTMLInputElement, CustomInputProps>((props, ref) => {
  const { label ,name ,id,error,...rest} = props;
  const inputId = name ?? id ;

    return(
        <div className="input-group">
            <label htmlFor={inputId} className="label">
              {label}
            </label>
            <input className="input" name={name} id={inputId} ref={ref} {...rest} />
            {error && <p className="error">{error}</p>}
       </div>

    )
});


export default Input;