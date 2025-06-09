import { ReactNode } from "react";



export interface AuthContext {

  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  isLoading: boolean;
  login: (email:string, password:string)=> Promise<void>;
  logout: ()=> void;
}

export interface AuthContextProviderProps {
  children : ReactNode;
}
