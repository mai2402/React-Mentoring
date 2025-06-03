import { createContext, useContext, useState } from "react";
import {  AuthContextProviderProps, type AuthContext } from "../interfaces/interfaces";
import * as authService from "../services/authService";




const AuthContext = createContext<AuthContext | undefined>(undefined);



export function AuthContextProvider ({children}: AuthContextProviderProps) {

    const [token, setToken] = useState(()=> authService.getToken());
   

    const login =  async (email:string, password: string) => {
         
        const newToken = await authService.login(email,password);
        setToken(newToken);
    
      
    }


    const logout = () =>{
        authService.logout();
        setToken(null);
    }


   


    return(
        <AuthContext.Provider value={{isAuthenticated: !!token, login, logout}}>
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