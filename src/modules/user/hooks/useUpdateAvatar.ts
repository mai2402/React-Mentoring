import { updateAvatarPath, uploadAvatar } from "../services/userServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getSignedAvatarUrl } from "../utils/getSignedAvatarUrl";


export type UploadResult = { newPath: string; url: string };

export function useUpdateAvatar(userId: string) {
  const qc = useQueryClient();

  return useMutation<UploadResult, Error, File>({
    mutationFn: async (file: File) => {
    
      const { path } = await uploadAvatar(userId, file);
      await updateAvatarPath(path);
      const url = await getSignedAvatarUrl(path);
      return { newPath: path, url };
    },
    onSuccess: ({ newPath, url }) => {
      // snap UI to the new image immediately
      qc.setQueryData(["avatar_path", userId], url);

      // if you also cache the full profile elsewhere, update its path
      qc.setQueryData(["profiles", userId], (old: any) =>
        old ? { ...old, avatar_path: newPath } : old
      );
    },
    
  });
}
