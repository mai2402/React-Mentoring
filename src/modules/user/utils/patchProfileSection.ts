import { SectionKeyEnum } from "../enums/profile-section";
import { UserProfile } from "../interface/user";
import { SectionPayload } from "../types/profileSections";




export function patchProfileSection (payload: SectionPayload): Partial<UserProfile>{

    switch(payload.section){
        case SectionKeyEnum.HEADER: 
         return payload.data;
        case SectionKeyEnum.BIO: 
         return payload.data;
        case SectionKeyEnum.LINKS: 
         return {social_links: payload.data.social_links};  
        case SectionKeyEnum.SHORTCUTS: 
         return {website: payload.data.website}; 

       default:{
          // exhaustive check: if you add a new section and forget this case, TS will error
            const _exhaustive: never = payload;
            return _exhaustive;
       }  
    }

}