import { SocialLinksEnum } from "../enums/profile-section";
import { ProfileLink } from "../interface/user";




/**
 * Ensures the profile always has a complete set of social link entries.
 * 
 * - Takes existing social links from the DB (can be `null` or missing).
 * - Fills in missing links for every value in `SocialLinksEnum`.
 * - Uses the saved URL if present, otherwise defaults to an empty string.
 *
 * @param rows - Optional array of existing social links from the user profile.
 * @returns A normalized array of `ProfileLink` objects, one for each `SocialLinksEnum` value.
 */

export function ensureSocialLinksExist(rows?: ProfileLink[] | null ) : ProfileLink[] {

    const defaultLinksArray  = new Map<SocialLinksEnum, string | null>();

     (rows ?? []).forEach(r => defaultLinksArray.set(r.label, r.url ?? null));

    return Object.values(SocialLinksEnum).map(label => ({
        label,
        url: defaultLinksArray.get(label) ?? "",
    }));

  
}

