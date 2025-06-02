import { createContext, useContext, useState } from "react";
import {  AuthContextProviderProps, type AuthContext } from "../types/interfaces";




const AuthContext = createContext<AuthContext | undefined>(undefined);



export function AuthContextProvider ({children}: AuthContextProviderProps) {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = () => setIsAuthenticated(true);
    const logout = () => setIsAuthenticated(false)


    return(
        <AuthContext.Provider value={{isAuthenticated,login,logout}}>
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