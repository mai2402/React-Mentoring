// modules/shared/enums/AppRoute.ts
export enum AppRoute {
  // Public
  Home = "/",
  Login = "/login",
  SignUp = "/signUp",
  Unauthorized = "/unauthorized",
  NotFound = "*",

  // User
  Profile = "/profile",
  Upcoming = "/upcoming",

  // Sessions
  Sessions = "/sessions",
  SessionDetails = "/sessions/:sessionId",

  // Dashboard
  Dashboard = "/dashboard",
  DashboardSessions = "/dashboard/sessions",
  AddSession = "/dashboard/sessions/add-session",
  EditSession = "/dashboard/sessions/edit-session/:sessionId",
  DashboardNewAdmin = "/dashboard/new-admin",
  DashboardCreateAdmin = "/dashboard/create-admin",
  DashboardSettings = "/dashboard/settings",
  DashboardUsers = "/dashboard/users",
}
