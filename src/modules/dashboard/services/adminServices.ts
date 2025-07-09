import { supabase } from "../../../core/supabase/client";
import { CreateAdminFormData } from "../validation/createAdminForm";


export async function createNewAdmin ({email,password}: CreateAdminFormData) {

const { data } = await supabase.auth.signUp({
  email: email,
  password: password,  
  options:{
     data:{
      email,
      role:"admin",
     }
  }
})


  const admin = data.user;
  if (!admin) throw new Error("No admin returned after signUp");


  return admin;
}
