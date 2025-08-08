
import { supabase } from "../../../../core/supabase/client";
import { UserProfile } from "../../../user/interface/user";

const TABLE = "profiles";

const handleError = (context: string, error: any) => {
  console.error(`Error ${context}:`, error.message);
  throw error;
};


export async function getAllUsers() {
  const { data, error } = await supabase.from(TABLE).select("*");
  if (error) { 
    handleError("fetching users", error);
  
 throw error;
};

return data;
}

// userId: UserProfile["id"]: This uses an indexed access type to ensure the userId matches the 
// exact type of 'id' from UserProfile.
// This keeps things consistent even if the type of 'id' changes in the UserProfile interface.

export async function getUserById(userId: UserProfile["id"]) {
  const { data, error } = await supabase.from(TABLE).select("*").eq("id", userId).single();
  if (error) { 
    handleError("fetching user by ID", error)
   throw error;
  };
  return data;
}

export async function updateUserRole(userId: UserProfile["id"], role: string) {
  const { error } = await supabase.from(TABLE).update({ role }).eq("id", userId);
  if (error) { 
    handleError("updating user role", error);
   throw error;
  }
}

export async function toggleUserActive(userId: UserProfile["id"], isActive: boolean) {
  const { error } = await supabase.from(TABLE).update({ isActive }).eq("id", userId);
  if (error) { 
    handleError("toggling user active", error)
     throw error;
  };
  return isActive;
}

export async function deleteUser(userId: UserProfile["id"]) {
  console.log("🔍 Deleting user with ID:", userId); // Add this
  const { error } = await supabase.from(TABLE).delete().eq("id", userId);

  if (error) {
    handleError("deleting user", error);
    throw error;
  }
}
