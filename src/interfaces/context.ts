import { ReactNode } from "react";



export interface AuthContext {

  isAuthenticated: boolean;
  login: (email:string, password:string)=> Promise<void>;
  logout: ()=> void;
}

export interface AuthContextProviderProps {
  children : ReactNode;
}
