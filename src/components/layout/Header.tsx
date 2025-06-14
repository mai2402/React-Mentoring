import { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from "../shared/Button";
import Modal from "../shared/Modal";
import { useAuthenticationContext } from "../../contexts/authContext";
import { useGetUserProfile } from "../../hooks/users/useGetUserProfile";
import { logout } from "../../services/authService";
import toast from 'react-hot-toast';


const NAV_ITEMS = [
  { to: '/', label: 'Our Mission' },
  { to: '/sessions', label: 'Browse Sessions' },
];

export default function Header() {
  const { isAuthenticated , setIsAuthenticated} = useAuthenticationContext();
  const navigate = useNavigate();
  const { data: user } = useGetUserProfile();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent)=> {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isAuthenticated]);

  const handleLogout = async () => {
           try {
              await logout();
              setIsAuthenticated(false);
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
          
            {!isAuthenticated && <Button to="/login" textOnly className="header__link">Login</Button>}
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
        
        {isAuthenticated && (
          <div className="header__profile" ref={menuRef}>
            <Button
              
              onClick={() => setMenuOpen(v => !v)}
              textOnly
            >
              <img
                src={user?.avatar_url}
                alt={user?.name}
                className="header__avatar"
              />
            </Button>

            <Modal
              isOpen={menuOpen}
              onClose={() => setMenuOpen(false)}
              modalClassName="dropdown-backdrop"
              containerClassName="dropdown-menu"
            >
              <ul className="header__dropdown-list">
                <li>
                  <Button to="/profile" onClick={() => setMenuOpen(false)}>
                    My Profile
                  </Button>
                </li>
                <li>
                  <Button to="/upcoming" onClick={() => setMenuOpen(false)}>
                    Upcoming Sessions
                  </Button>
                </li>
                <li>
                  <Button textOnly onClick={handleLogout}>
                    Logout
                  </Button>
                </li>
              </ul>
            </Modal>
          </div>
        )}
      </div>
      </div>
    </header>
  );
}