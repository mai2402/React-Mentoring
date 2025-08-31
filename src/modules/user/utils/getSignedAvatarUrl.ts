import { supabase } from "../../../core/supabase/client";

/**
 * 
 * @param path 
 * @param size 
 * @returns A signed URL for accessing the avatar image stored in Supabase storage.
 * @throws Will throw an error if the path is null or if there is an issue generating the signed URL.
 * The signed URL is valid for 1 hour (3600 seconds) and can be transformed to the specified size.
 * Default size is 150x150 pixels.
 * 
 */

export type AvatarInfo = { path: string | null; version: number | null };

export async function getSignedAvatarUrl( path: string | null , expiresInSec : number = 60) {

    if (!path)  throw new Error("Path is required");

    const { data, error } = await supabase
        .storage
        .from("avatars")
        .createSignedUrl(path,expiresInSec);

    if (error || !data.signedUrl) {
        throw new Error(error?.message || "Could not get signed URL");
    }

    return `${data.signedUrl}&cb=${Date.now()}`;

}