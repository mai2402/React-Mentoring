import { ReactNode } from "react";
import { UserProfile } from "../../modules/user/interface/user";
import { Session } from "@supabase/supabase-js";

export enum AuthStatus {
  Loading = "loading",
  Authenticated = "authenticated",
  Unauthenticated = "unauthenticated",
}



export interface AuthContext {

  isAuthenticated: boolean;
  userProfile: UserProfile | null;
  isLoading: boolean;
  session?: Session | null  ;
  login: (email:string, password:string)=> Promise<void>;
  logout: ()=> void;
}

export interface AuthContextProviderProps {
  children : ReactNode;
}
