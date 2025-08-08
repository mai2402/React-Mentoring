import { UserProfile } from "../../../user/interface/user";


const options: Intl.DateTimeFormatOptions = {
  dateStyle: "medium",
};

export const userTableColumns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  {
    key: "role",
    label: "Role",
    render: (user: UserProfile) =>
      user.role.charAt(0).toUpperCase() + user.role.slice(1),
  },
  {
    key: "created_at",
    label: "Joined At",
    render: (user: UserProfile) =>
      new Date(user.created_at).toLocaleDateString("en-US", options),
  },
  {
    key: "status",
    label: "Status",
    render: (user: UserProfile) =>
      user.isActive ? "🟢 Active" : "🔴 Inactive",
  },
];


