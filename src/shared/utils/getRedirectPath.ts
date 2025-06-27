
export function getRedirectPath (role:string, sessionId:string): string {
    if(role === "admin") return "/dashboard";
    if(sessionId) return `/sessions/${sessionId}`;
    return "/profile";

}