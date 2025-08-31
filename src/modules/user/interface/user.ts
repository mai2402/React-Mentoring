export interface NewUser {
    id: string;
  name: string;
  phone?: string;
  role?: string;
}

export type profileLink ={
    label: string;
    url: string;
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
    website?: string;
    location?: string;
    social_links?: profileLink[];
    is_verified?: boolean;
    isActive?: boolean;


}

export interface UserCard {
    profile: UserProfile | null;
}


