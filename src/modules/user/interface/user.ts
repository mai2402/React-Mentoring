export interface NewUser {
    id: string;
  name: string;
  phone?: string;
  role?: string;
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
    social_links?: {
        twitter?: string;
        linkedin?: string;
        github?: string;
    };
    is_verified?: boolean;
    isActive?: boolean;


}

export interface UserCard {
    profile: UserProfile | null;
}


