import { createContext, useContext } from "react";
import * as authService from "../services/authService";
import { useAuthListener } from "../../modules/auth/hooks/useAuthListener";
import {  type AuthContext, AuthContextProviderProps } from "../interface/context";






const AuthContext = createContext<AuthContext | undefined>(undefined);



export function AuthContextProvider ({children}: AuthContextProviderProps) {

    const {isAuthenticated,userProfile,isLoading} = useAuthListener()
    
   
    const login =  async (email:string, password: string) => {
         
        await authService.login(email,password);
    
    }

    const logout = () =>{
        authService.logout();
       
    }

    return(
        <AuthContext.Provider value={{isAuthenticated, login, logout,userProfile, isLoading}}>
            {children}
        </AuthContext.Provider>
    )
}


export function useAuthenticationContext(){
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuthenticationContext must be used within a AuthenticationContextProvider")
    }
    return context;
}