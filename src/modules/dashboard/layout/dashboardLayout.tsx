import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import AdminHeader from "../components/AdminHeader";

export default function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <AdminHeader />
        <div className="dashboard-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
