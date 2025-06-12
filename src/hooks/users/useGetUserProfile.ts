import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../../services/userServices";


export function useGetUserProfile(){
 return useQuery({
    queryKey: ["users"],
    queryFn: getUserProfile,
  });


}