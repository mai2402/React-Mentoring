import toast from "react-hot-toast";
import { logout } from "../../../core/services/authService";
import {  NavLink, useNavigate } from "react-router-dom";

const Admin_SideBar_Tabs =[
  { label: '➕ Create new Admin', to: '/dashboard/new-admin' },
  { label: '⚙️ Settings', to: '/dashboard/settings' },
  { label: '📅  Manage Sessions', to: '/dashboard/sessions' },
  {label: '👥 Users' , to:'/dashboard/users'},
  { label: '🔓 Logout', action: 'logout' },
]

export default function Sidebar (){
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
          await logout();
          toast.success('Logged out successfully!');
          navigate('/');
        } catch (error) {
          console.error('Logout failed:', error);
        }
      };

 return (
    <aside className="sidebar">
      <h2 className="sidebar__logo">Admin Panel</h2>
      <nav className="sidebar__nav">
       <ul>

        {Admin_SideBar_Tabs.map((tab) =>
          <li key={tab.label}>
            {tab.to ? (
              <NavLink
                to={tab.to}
                className="sidebar__link"
                onClick={() => {
                  if (tab.action === 'logout') handleLogout();
                }}
              >
                {tab.label}
              </NavLink>
            ) : (
              <button
                className="sidebar__link"
                onClick={handleLogout}
              >
                {tab.label}
              </button>
            )}
          </li>
        )}
        </ul>
      </nav>
    </aside>
 )
}