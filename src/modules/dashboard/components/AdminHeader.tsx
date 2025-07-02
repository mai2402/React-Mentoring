
import { FaBell, FaMoon, FaUserCircle } from "react-icons/fa";
import Button from "../../../shared/ui/Button";
import { useDropDownModal } from "../../../shared/hooks/useDropDownModal";
import { useNavigate } from "react-router-dom";
import Modal from "../../../shared/ui/Modal";
import DropDownItem from "../../../shared/ui/DropDownItem";
import { logout } from "../../../core/services/authService";
import toast from "react-hot-toast";



const DROPDOWN_ITEMS =[
  { label: 'My Profile', to: '/dashboard/profile' },
  { label: 'Settings', to: '/dashboard/settings' },
  { label: 'Manage Sessions', to: '/dashboard/sessions' },
  { label: 'Logout', action: 'logout' },
]


export default function AdminHeader() {
  const {menuOpen, menuRef, handleOpenModal} = useDropDownModal();
    const navigate = useNavigate();

   const handleLogout = async () => {
           try {
              await logout();
              toast.success("Logged out successfully!");
              navigate("/");
           } catch (error) {
              console.error("Logout failed:", error);
           }
        }


  return (
    <header className="admin-header">
      <h1 className="admin-header__title">Dashboard</h1>

      <div className="admin-header__actions">
        <Button className="admin-header__icon">
          <FaMoon />
        </Button>

        <Button className="admin-header__icon admin-header__icon--notification">
          <FaBell />
          <span className="admin-header__badge">3</span>
        </Button>

        <div className="admin-header__profile" ref={menuRef}>
          <Button
             onClick={handleOpenModal}
              textOnly
              className="admin-header__icon admin-header__icon--profile"
          >
            <FaUserCircle />
          </Button>

         
                     <Modal
                       isOpen={menuOpen}
                       onClose={handleOpenModal}
                       modalClassName="dropdown-backdrop"
                       containerClassName="dropdown-menu"
                     >
                       <ul className="header__dropdown-list">
         
                         {DROPDOWN_ITEMS.map(({label,action,to})=> (
                           <li key={label}>
         
                           <DropDownItem
                               to={to}
                               textOnly={!to}
                               onClick={()=>{
                                    handleOpenModal();
                                 if(action === 'logout')
                                    handleLogout();
                               }}
                            >
                                 {label}
                           </DropDownItem>
                           </li>
                         ))}
                       </ul>
                     </Modal>

        </div>
      </div>
    </header>
  );
}
