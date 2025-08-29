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


export async function getSignedAvatarUrl(
    path: string |null ,
    size: number = 150) : Promise<string | null> {

    if (!path) return null;
    const { data, error } = await supabase
        .storage
        .from("avatars")
        .createSignedUrl(path, 3600, {transform: {width: size, height: size, resize: "cover"}});

    if (error || !data.signedUrl) {
        throw new Error(error?.message || "Could not get signed URL");
    }

    return data.signedUrl;

}