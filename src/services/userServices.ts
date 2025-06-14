import { UserProfile } from "../interfaces/user/user";
import { supabase } from "../supabase/client";



export async function getUserProfile() {
    
const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (  userError|| !user) {
        throw new Error("User not found");
    }

    const {data, error} = await supabase
    .from("users")
    .select("*")
    .eq("user_id", user.id)
    .single();
    
  if (error) throw new Error(error.message);
  return data;

}


export async function updateUserProfile(updates: Partial<UserProfile>) {

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User not found");

    
  }
  console.log(user?.id)

  const { data, error } = await supabase
    .from("users")
    .update(updates)
    .eq("id", user.id);

  if (error) throw new Error(error.message);
  return data;

}