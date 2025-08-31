import { useOptimistic, useRef } from "react";
import { useAvatar } from "./useAvatar";
import { useUpdateAvatar } from "./useUpdateAvatar";
import toast from "react-hot-toast";
import { ToastError } from "../../../shared/enums/toasts";



export function useAvatarPreview (userId: string){
    const { data: serverUrl, isLoading } = useAvatar(userId);
    const { mutateAsync: updateAvatar, isPending } = useUpdateAvatar(userId);
  
    const fileRef = useRef<HTMLInputElement>(null);
  
   const [optimisticUrl, setOptimisticUrl] = useOptimistic<string | null, string | null>(
      serverUrl ?? null,
      (_prev, newUrl) => newUrl
    );
  
     
  
  async function onPick() {
      const file = fileRef.current?.files?.[0];
      if (!file) return;
  
    const tempUrl = URL.createObjectURL(file);
    setOptimisticUrl(tempUrl) 
      
      try {
         const {url} = await updateAvatar(file);
         setOptimisticUrl(url);
         toast.success("Avatar updated ✅");
      } catch {
         setOptimisticUrl(serverUrl ?? null);
        toast.error(ToastError.Unknown);
      } finally {
        if (fileRef.current) fileRef.current.value = ""; // allow re-selecting same file
      }
    }
  
    const openPicker = () => !isPending && fileRef.current?.click();


    return {
      isLoading,
      isUploading: isPending,
      optimisticUrl,
      ref: fileRef,
      onPick,
      openPicker

    }


}