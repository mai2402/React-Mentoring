import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../services/userServices";
import { PROFILE_ME_QK } from "./useUpdateProfileSection";


export function useGetUserProfile(id:string){
 return useQuery({
    queryKey: PROFILE_ME_QK,
    queryFn: ()=> getUserProfile(id),
  });


}