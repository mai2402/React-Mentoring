import { supabase } from "../../../core/supabase/client";
import { extractFileData } from "../utils/extractFileData";
import type { UserProfile } from "../interface/user";
import { SectionPayload } from "../types/profileSections";

const BUCKET = "avatars";
const MAX_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED = /^image\/(png|jpe?g|webp)$/i;

/**
 * Fetch a single user profile by ID.
 *
 * @param id - The Supabase auth user ID.
 * @returns The full `UserProfile` record.
 * @throws Error if the profile is missing or the query fails.
 */
export async function getUserProfile(id: string): Promise<UserProfile> {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", id).single();
  if (error || !data) throw new Error(error?.message || "Profile not found");
  return data;
}

/**
 * Update a specific section of the **currently authenticated** user's profile.
 *
 * @param payload - A section-scoped payload (e.g., header/bio/links/shortcuts)
 *                      constrained by `SectionPayloadEnumTied`.
 * @returns The updated `UserProfile` record.
 * @throws Error if unauthenticated or the update fails.
 */
export async function updateUserProfileSection(
  payload: SectionPayload
): Promise<UserProfile> {
  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();
  if (userErr || !user) throw new Error("Not Authenticated !!");

  const { data: profile, error: profileErr } = await supabase
    .from("profiles")
    .update(payload.data)
    .eq("id", user.id)
    .select("*")
    .single();
    

  if (profileErr || !profile) throw new Error(profileErr?.message || "Profile not found");
  return profile;
}

/**
 * Upload a new avatar file to storage (no DB update here).
 *
 * @param userId - The owner folder (used to namespace the file path).
 * @param file   - The image file to upload (PNG/JPG/JPEG/WEBP, ≤ 2MB).
 * @returns An object containing the storage `path` to persist in the DB later.
 * @throws Error if no file, invalid type/size, or upload fails.
 */
export async function uploadAvatar(
  userId: string,
  file: File
): Promise<{ path: string }> {
  if (!file) throw new Error("No file provided");
  if (file.size > MAX_SIZE) throw new Error("File size exceeds 2MB");
  if (!ALLOWED.test(file.type)) throw new Error("Only PNG, JPG, JPEG, and WEBP files are allowed");

  const ext = extractFileData(file) || file.type.split("/")[1] || "jpg";
  const path = `${userId}/${crypto.randomUUID()}.${ext}`;

  // simple sanity check against path traversal
  if (!path.startsWith(`${userId}/`)) throw new Error("Invalid path");

  const { error: uploadErr } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });

  if (uploadErr) throw new Error(uploadErr.message);
  return { path }; // use with updateAvatarPath()
}

/**
 * Persist a new avatar path on the authenticated user's profile and
 * best-effort delete the previous avatar file from storage.
 *
 * @param path - The storage path returned by `uploadAvatar`.
 * @returns `{ id, avatar_path }` for the updated profile.
 * @throws Error if unauthenticated or the DB update fails.
 */
export async function updateAvatarPath(
  path: string
): Promise<{ id: string; avatar_path: string | null }> {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) throw new Error("Not authenticated");

  // read old path for cleanup
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

  // cleanup previous file (best effort, no throw)
  const oldPath = current?.avatar_path;
  if (oldPath && oldPath !== path) {
    await supabase.storage.from(BUCKET).remove([oldPath]).catch(() => {});
  }

  return data; // { id, avatar_path }
}

/**
 * Read only the avatar path for a given user.
 *
 * @param userId - The profile owner ID.
 * @returns `{ avatar_path }` (can be `null` if none).
 * @throws Error if the query fails.
 */
export async function getUserAvatar(
  userId: string
): Promise<{ avatar_path: string | null }> {
  const { data, error } = await supabase
    .from("profiles")
    .select("avatar_path")
    .eq("id", userId)
    .single();

  if (error) throw new Error(error.message || "No avatar was found!!");
  return data; // { avatar_path }
}
