import { AppRoute } from "../../app/enums/routes";


export const buildRoute = {
  sessionDetails: (id: string) =>
    AppRoute.SessionDetails.replace(":sessionId", id),
  editSession: (id: string) =>
    AppRoute.EditSession.replace(":sessionId", id),
};
