import {  NavLinkProps } from "react-router-dom";
import { BaseProps } from "../interface/button";
import { ButtonHTMLAttributes } from "react";




type LinkOnly = Omit<NavLinkProps, "to" | "className" | "children"> & {
  to: NavLinkProps["to"];
};

type ButtonOnly = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "className" | "children"> & {
  to?: undefined;
  htmlType?: "button" | "submit" | "reset";
};

// 🧩 final props: base & (link | button)
//    -> now `block`, `textOnly`, etc. are always visible.
export type CustomButtonProps = BaseProps & (LinkOnly | ButtonOnly);




