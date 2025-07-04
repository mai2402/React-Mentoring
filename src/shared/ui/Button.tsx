import { Link } from "react-router-dom";
import { CustomButtonProps } from "../interface/button";


export default function Button(props: CustomButtonProps): JSX.Element {

  const className = `btn  ${props.textOnly ? "btn--text-only" : ""}`;
  const { to, children, textOnly, ...rest } = props;

  if (to) {

    return (
      <Link to={to} className={className} {...rest}>
        {children}
      </Link>
    );

  }

    return (
      <button className={className} {...rest}>
        {children}
      </button>
    );
  }

