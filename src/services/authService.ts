

import { supabase } from "../supabase/client";
import { loginSchema } from "../validation/session";
import { SignUpFormData } from "../validation/SignUpForm";


export async function signUp ({email,password, name, phone}: SignUpFormData) {

const { data } = await supabase.auth.signUp({
  email: email,
  password: password,  
  options:{
     data:{
      name,
      phone,
      email,
      role:"user",
     }
  }
  
})

const user = data.user;
  if (!user) throw new Error("No user returned after signUp");


  return user;
}



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





