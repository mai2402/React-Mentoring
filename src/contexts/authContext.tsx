import { createContext, useContext, useEffect, useState } from "react";
import {  AuthContextProviderProps, type AuthContext } from "../interfaces/interfaces";
import * as authService from "../services/authService";





const AuthContext = createContext<AuthContext | undefined>(undefined);



export function AuthContextProvider ({children}: AuthContextProviderProps) {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
   

    useEffect(()=>{

        const checkAuth = async () => {
            try{
                const token = await authService.getToken();
                if(token){
                    setIsAuthenticated(true);
                    ;
                }else{
                    setIsAuthenticated(false);
                   
                }
            }catch(err){
                console.error("Error checking authentication", err);
                setIsAuthenticated(false);
            }
            finally {
                setIsLoading(false);
            }

        } 
        checkAuth();
    },[]);

    const login =  async (email:string, password: string) => {
         
        await authService.login(email,password);
        setIsAuthenticated(true)
      
      
    }


    const logout = () =>{
        authService.logout();
        setIsAuthenticated(false)
       
    }


   


    return(
        <AuthContext.Provider value={{isAuthenticated, login, logout,setIsAuthenticated, isLoading}}>
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