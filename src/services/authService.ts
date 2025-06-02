import { loginSchema } from "../validation/session";





export async function login(email: string, password: string): Promise<string> {
    // throws if invalid
 loginSchema.parse({ email, password }); 

  const token = "FAKE-JWT-TOKEN";
  localStorage.setItem('token', token);
  return token;
}


export function logout (){

    localStorage.removeItem('token');

}


export function getToken (){
     return localStorage.getItem('token')
}


export function isAuthenticated (){
    return !!getToken();
}