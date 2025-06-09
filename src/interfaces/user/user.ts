export interface UserProfile {
    id: string;
    email: string;
    phone?: number;
    name: string;
    created_at: string;
    avatar_url?: string;
    bio?: string;
    website?: string;
    location?: string;
    social_links?: {
        twitter?: string;
        linkedin?: string;
        github?: string;
    };
    is_verified?: boolean;


}


export interface UserCard {
    userProfile : UserProfile;
}