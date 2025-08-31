import { useQuery } from "@tanstack/react-query";
import { getUserAvatar } from "../services/userServices";
import { getSignedAvatarUrl } from "../utils/getSignedAvatarUrl";





export function useAvatar(userId: string) {
  return useQuery({
    queryKey: ["avatar_path", userId],
    enabled: !!userId,
    queryFn: async () => {
      const { avatar_path } = await getUserAvatar(userId);
      return await getSignedAvatarUrl(avatar_path);
    },
    // signed URLs are short-lived; don't cache for a day
    staleTime: 30_000, // 30s feels safe; bump if you like
    refetchOnWindowFocus: false,
  });
}
