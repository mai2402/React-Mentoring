import { SectionPayload } from "../types/profileSections";
import { useOptimisticMutation } from "./useOptimisticMutation";
import { UserProfile } from "../interface/user";
import { updateUserProfileSection } from "../services/userServices";
import { patchProfileSection } from "../utils/patchProfileSection";




export const PROFILE_ME_QK = ['profiles', 'me'] as const;



export function useUpdateProfileSection (){

    return useOptimisticMutation<unknown,unknown,SectionPayload,UserProfile>({

        mutationKey: ['profiles', 'update', 'me'],
        mutationFn: (payload)=> updateUserProfileSection(payload),
        queryKeyOf: ()=> PROFILE_ME_QK,
        makePatch: (payload)=> patchProfileSection(payload),      

    },
   
);

  
};