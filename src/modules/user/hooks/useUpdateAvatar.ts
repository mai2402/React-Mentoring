import { useRef, useState } from "react";
import { updateAvatarPath, uploadAvatar } from "../services/userServices";



export function useUpdateAvatar (intialAvatar: string | null){
  
        const [avatarPath, setAvatarPath] = useState<string | null>(intialAvatar ?? null);
         const [uploading, setUploading] = useState(false);
         const fileRef = useRef<HTMLInputElement>(null);   
    
       async function onPick() {
        const file = fileRef.current?.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
          const { path } = await uploadAvatar(file);   // storage
          await updateAvatarPath(path);                // DB + cleanup old
          setAvatarPath(path);                         // local state
        } catch (err: any) {
          alert(err.message ?? "Avatar change failed");
        } finally {
          if (fileRef.current) fileRef.current.value = ""; // reset safely
          setUploading(false);
        }
      }

   return {avatarPath,uploading,onPick,fileRef}
 
}