import { UserRole } from "../../modules/user/enums/users";
import { AppRoute } from "../../app/enums/routes";
import { buildRoute } from "./buildRoute";

export function getRedirectPath (role:string, sessionId?:string): string {
    if(role === UserRole.ADMIN) return AppRoute.Dashboard;
    if(sessionId) return buildRoute.sessionDetails(sessionId);
    return AppRoute.Home;

}