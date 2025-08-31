import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../services/userServices";


export function useGetUserProfile(id:string){
 return useQuery({
    queryKey: ["profiles", id],
    queryFn: ()=> getUserProfile(id),
  });


}