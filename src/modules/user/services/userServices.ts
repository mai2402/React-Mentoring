import { UserProfile } from "../interface/user";
import { supabase } from "../../../core/supabase/client";
import { extractFileData } from "../utils/extractFileData";




export async function getUserProfile(id: string): Promise<UserProfile>  {
     
  
     const { data, error } = await supabase
        
    .from("profiles")
    .select("*")
    .eq("id",id)
    .single();

   
    if (error || !data) throw new Error(error?.message || "Profile not found");
   
   

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



  

/**
 *  Uploads and returns the path of the user's avatar image.
 *  @param file The image file to upload.
 *  @returns An object containing the path of the uploaded image.
 *  @throws Will throw an error if no file is provided, if the file size exceeds 2MB,
 *  if the file type is not allowed, or if the user is not authenticated.
 *  Allowed file types: PNG, JPG, JPEG, WEBP.
 */


  const BUCKET = "avatars";
  const MAX_SIZE = 2 * 1024 * 1024; // 2MB
  const ALLOWED = /^image\/(png|jpe?g|webp)$/i;

  export async function uploadAvatar(file: File): Promise<{path: string}> {
   
     if(!file) throw new Error("No file provided");
     if(file.size > MAX_SIZE) throw new Error("File size exceeds 2MB");
     if(!ALLOWED.test(file.type)) throw new Error("Only PNG, JPG, JPEG, and WEBP files are allowed");


     const {data, error} = await supabase.auth.getUser();

      if(error || !data.user) throw new Error("Not authenticated");

      const fileExt = extractFileData(file);
      const path = `${data.user.id}/${crypto.randomUUID()}.${fileExt}`;
      

      const { error: uploadErr } = await supabase.storage
      .from(BUCKET)
      .upload(path, file, 
        { cacheControl: "3600",    
          upsert: false,           // avoid accidental overwrite
          contentType: file.type,  // set the content type
         });

      if(uploadErr) throw new Error(uploadErr.message);


     
      return {path};
  }




 /**
 * Update the signed-in user's avatar path and delete the previous file.
 * @param path Storage path from upload, e.g. `${uid}/${uuid}.jpg`
 * @returns `{ id, avatar_path }`
 */

  export async function updateAvatarPath(path: string) {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) throw new Error("Not authenticated");

  // read old to clean up after success
  const { data: current } = await supabase
    .from("profiles")
    .select("avatar_path")
    .eq("id", user.id)
    .single();
    

  const { data, error: updErr } = await supabase
    .from("profiles")
    .update({ avatar_path: path })
    .eq("id", user.id)
    .select("id, avatar_path")
    .single();

  if (updErr || !data) throw new Error(updErr?.message || "Avatar update failed");

  const oldPath = current?.avatar_path;
  if (oldPath && oldPath !== path) {
    await supabase.storage.from(BUCKET).remove([oldPath]).catch(() => {});
  }


  return data; 
}