import { NavLink } from "react-router-dom";
import { JSX } from "react";

import { ButtonVariations, ButtonSizes } from "../enums/buttons";
import { CustomButtonProps } from "../types/button";

export default function Button(props: CustomButtonProps): JSX.Element {
  // Branch FIRST based on discriminant (presence of `to`)
  if ("to" in props && props.to !== undefined) {
    // LINK BRANCH: type is BaseProps & LinkOnly here
    const {
      to,
      children,
      className: extra,
      ui,
      textOnly,
      block,
      disabled,
      ...navProps // <- only NavLink-allowed props remain
    } = props;

    const variation =
      ui?.variation ?? (textOnly ? ButtonVariations.Link : ButtonVariations.Primary);
    const size = ui?.size ?? ButtonSizes.Md;

    const className = [
      "btn",
      `btn--${variation}`,
      `btn--${size}`,
      block ? "btn--block" : "",
      textOnly ? "btn--text-only" : "",
      extra ?? "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <NavLink
        to={to}
        className={({ isActive }) => `${className} ${isActive ? "active" : ""}`}
        aria-disabled={disabled || undefined}
        onClick={disabled ? (e) => e.preventDefault() : navProps.onClick}
        {...navProps}
      >
        {children}
      </NavLink>
    );
  }

  // BUTTON BRANCH: type is BaseProps & ButtonOnly here
  const {
    children,
    className: extra,
    ui,
    textOnly,
    block,
    disabled,
    htmlType,         // <- only exists on button side
    ...buttonProps    // <- only button-allowed props remain
  } = props;

  const variation =
    ui?.variation ?? (textOnly ? ButtonVariations.Link : ButtonVariations.Primary);
  const size = ui?.size ?? ButtonSizes.Md;

  const className = [
    "btn",
    `btn--${variation}`,
    `btn--${size}`,
    block ? "btn--block" : "",
    textOnly ? "btn--text-only" : "",
    extra ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={htmlType ?? "button"}
      className={className}
      disabled={disabled}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
