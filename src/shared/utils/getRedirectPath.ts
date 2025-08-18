import { ZodUUID } from "zod/v4";
import { UserRole } from "../../modules/user/enums/users";

export function getRedirectPath (role:string, sessionId?:ZodUUID): string {
    if(role === UserRole.ADMIN) return "/dashboard";
    if(sessionId) return `/sessions/${sessionId}`;
    return "/";

}