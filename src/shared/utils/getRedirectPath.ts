import { ZodUUID } from "zod/v4";

export function getRedirectPath (role:string, sessionId?:ZodUUID): string {
    if(role === "admin") return "/dashboard";
    if(sessionId) return `/sessions/${sessionId}`;
    return "/";

}