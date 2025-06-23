import { ReactNode } from "react";
import { UserProfile } from "./user/user";



export interface AuthContext {

  isAuthenticated: boolean;
  userProfile: UserProfile | null;
  isLoading: boolean;
  login: (email:string, password:string)=> Promise<void>;
  logout: ()=> void;
}

export interface AuthContextProviderProps {
  children : ReactNode;
}
