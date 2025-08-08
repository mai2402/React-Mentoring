import {  NavLink } from "react-router-dom";
import { CustomButtonProps } from "../interface/button";


export default function Button(props: CustomButtonProps): JSX.Element {

  const className = `btn  ${props.textOnly ? "btn--text-only" : ""}`;
  const { to, children, textOnly, ...rest } = props;

  if (to) {

    return (
      <NavLink to={to} 
               className={({ isActive }) => `${className} ${isActive ? 'active' : ''}` } 
               {...rest}
         >
           {children}
      </NavLink>
    );

  }

    return (
      <button className={className} {...rest}>
        {children}
      </button>
    );
  }

