import { SignUpFormData } from "../../modules/auth/validation/SignUpForm";
import { loginSchema } from "../../modules/sessions/validation/session";
import { supabase } from "../supabase/client";




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



export async function login(email: string, password: string): Promise<{ token: string; role: any }> {
    
 loginSchema.parse({ email, password }); 

 const { data : userData, error } = await supabase.auth.signInWithPassword({
  email: email,
  password: password,
})

const userId = userData.user?.id;

const {data} = await supabase

    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single()
    
    if(!data)  throw new Error("user not found");
    


if (error) throw new Error(error.message);

return {
    token: userData.session?.access_token || "",
    role: data.role,
  };
 
}


export  async function logout (){

     await supabase.auth.signOut()  

}





