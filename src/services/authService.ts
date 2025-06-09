
import { supabase } from "../supabase/client";
import { loginSchema } from "../validation/session";





export async function login(email: string, password: string): Promise<string> {
    
 loginSchema.parse({ email, password }); 

 
 const { data : userData, error } = await supabase.auth.signInWithPassword({
  email: email,
  password: password,
})


if (error) throw new Error(error.message);

return userData.session?.access_token || '';
 
}


export  async function logout (){

     await supabase.auth.signOut()

}


export  async function getToken (){
      const {data} = await supabase.auth.getSession();

      return data.session?.access_token || null;
}


export function isAuthenticated (){
    return !!getToken();
}