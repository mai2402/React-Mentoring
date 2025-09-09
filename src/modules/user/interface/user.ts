import {  SocialLinksEnum } from "../enums/profile-section";


export interface NewUser {
    id: string;
  name: string;
  phone?: string;
  role?: string;
}


export type ProfileLink ={
    label: SocialLinksEnum;
    url?: string | null;
}

export interface UserProfile {
    id: string;
    email: string;
    phone?: string;
    name: string;
    created_at: string;
    role:string;
    avatar_path?: string | null;
    bio?: string;
    location?: string;
    social_links?: ProfileLink[];
    is_verified?: boolean;
    isActive?: boolean;


}

export interface UserCard {
    profile: UserProfile | null;
}


