import { supabase } from "../../../core/supabase/client";
import { extractFileData } from "../utils/extractFileData";

const BUCKET = "avatars";
const MAX_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED = /^image\/(png|jpe?g|webp)$/i;

export async function getUserProfile(id: string) {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", id).single();
  if (error || !data) throw new Error(error?.message || "Profile not found");
  return data;
}

export async function updateUserProfile(updates: Record<string, unknown>) {
  const { data: { user }, error: userErr } = await supabase.auth.getUser();
  if (userErr || !user) throw new Error("Not Authenticated !!");

  const { data: profile, error: profileErr } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", user.id)
    .select("*")
    .single();

  if (profileErr || !profile) throw new Error(profileErr?.message || "Profile not found");
  return profile;
}

export async function uploadAvatar(userId: string, file: File) {
  if (!file) throw new Error("No file provided");
  if (file.size > MAX_SIZE) throw new Error("File size exceeds 2MB");
  if (!ALLOWED.test(file.type)) throw new Error("Only PNG, JPG, JPEG, and WEBP files are allowed");

  const ext = extractFileData(file) || file.type.split("/")[1] || "jpg";
  const path = `${userId}/${crypto.randomUUID()}.${ext}`;

  if (!path.startsWith(`${userId}/`)) throw new Error("Invalid path");

  const { error: uploadErr } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });

  if (uploadErr) throw new Error(uploadErr.message);
  return { path }; // save this to profiles.avatar_path via updateAvatarPath()
}

/**
 * Update profile.avatar_path and delete the previous file (best-effort).
 * No avatar_version used.
 */
export async function updateAvatarPath(path: string) {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) throw new Error("Not authenticated");

  // read old path
  const { data: current } = await supabase
    .from("profiles")
    .select("avatar_path")
    .eq("id", user.id)
    .single();

  // set new path
  const { data, error: updErr } = await supabase
    .from("profiles")
    .update({ avatar_path: path })
    .eq("id", user.id)
    .select("id, avatar_path")
    .single();

  if (updErr || !data) throw new Error(updErr?.message || "Avatar update failed");

  // cleanup old file after success
  const oldPath = current?.avatar_path;
  if (oldPath && oldPath !== path) {
    await supabase.storage.from(BUCKET).remove([oldPath]).catch(() => {});
  }

  return data; // { id, avatar_path }
}

export async function getUserAvatar(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("avatar_path")
    .eq("id", userId)
    .single();

  if (error) throw new Error(error.message || "No avatar was found!!");
  return data; // { avatar_path }
}

