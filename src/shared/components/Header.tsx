import {useNavigate } from 'react-router-dom';
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import { useAuthenticationContext } from "../../core/store/authContext";
import toast from 'react-hot-toast';
import DropDownItem from '../ui/DropDownItem';
import { useDropDownModal } from '../hooks/useDropDownModal';
import { logout } from '../../core/services/authService';



const NAV_ITEMS = [
  { to: '/', label: 'Our Mission' },
  { to: '/sessions', label: 'Browse Sessions' },
];


const DROPDOWN_ITEMS =[
  { label: 'My Profile', to: '/profile' },
  { label: 'Upcoming Sessions', to: '/upcoming' },
  { label: 'Logout', action: 'logout' },
]

export default function Header() {
  const { isAuthenticated  ,userProfile} = useAuthenticationContext();
  const {menuOpen, menuRef, handleOpenModal} = useDropDownModal();
  const navigate = useNavigate();
  
 
   console.log(isAuthenticated,"ana hena ")
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
    <header className="header">
      <div className="header__inner">
        <Button to="/" className="header__logo">ReactMentoring</Button>

      <div className="header__nav--container">
        <nav className="header__nav">
          
      
          {
            NAV_ITEMS.map(({ to, label }) => (
              <Button
                key={to}
                to={to}
                className="header__link"
                textOnly
              >
                {label}
              </Button>
            ))
          }
        </nav>
        
      {isAuthenticated && userProfile ? (
          <div className="header__profile" ref={menuRef}>

            <Button
              onClick={handleOpenModal}
              textOnly
            >
              <img
                src={userProfile?.avatar_url}
                alt={userProfile?.name || "user avatar"}
                className="header__avatar"
              />
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
        ) : (
        
             <Button to="/login" textOnly className="header__link">Login</Button>
        )}
      </div>
      </div>
    </header>
  );
}