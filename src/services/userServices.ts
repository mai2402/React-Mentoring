import { UserProfile } from "../interfaces/user/user";
import { supabase } from "../supabase/client";



export async function getUserProfile(id: string): Promise<UserProfile>  {
     
  
     const { data, error } = await supabase
        
    .from("profiles")
    .select("*")
    .eq("id",id)
    .single();

   
    if (error || !data) throw new Error(error?.message || "Profile not found");
   
    console.log(data, " this is from get use profile  after the  errr")
    
    return data;
}


export async function updateUserProfile(updates: Partial<UserProfile>): Promise<UserProfile> {

  const {data:{user}, error:userErr} = await supabase.auth.getUser()


  if (  userErr|| !user) {
        throw new Error("Not Authenticated !!");
    }
  
    // update the profiles table

  const { data: profile, error: profileErr } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", user.id)
    .single();

    
    if (profileErr || !profile) throw new Error(profileErr?.message || "Profile not found");
  
    return profile;
     

}