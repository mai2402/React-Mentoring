import { useNavigate } from 'react-router-dom';
import { useAuthenticationContext } from '../../core/store/authContext';
import { useDropDownModal } from '../hooks/useDropDownModal';
import { logout } from '../../core/services/authService';
import toast from 'react-hot-toast';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import DropDownItem from '../ui/DropDownItem';
import { FaMoon, FaBell, FaUserCircle } from 'react-icons/fa';
import Spinner from '../ui/Spinner';


const NAV_ITEMS = [
  { to: '/', label: 'Our Mission' },
  { to: '/sessions', label: 'Browse Sessions' },
];

const Admin_DROPDOWN_ITEMS =[
  { label: 'My Profile', to: '/dashboard/profile' },
  { label: 'Settings', to: '/dashboard/settings' },
  { label: 'Manage Sessions', to: '/dashboard/sessions' },
  { label: 'Logout', action: 'logout' },
]

const User_DROPDOWN_ITEMS = [
  { label: 'My Profile', to: '/profile' },
  { label: 'Upcoming Sessions', to: '/upcoming' },
  { label: 'Logout', action: 'logout' },
];

export default function SmartHeader() {
  const { isAuthenticated, userProfile, isLoading } = useAuthenticationContext();
  const { menuOpen, menuRef, handleOpenModal } = useDropDownModal();
  
  const isAdmin = userProfile?.role === 'admin';
  const dropDownItems = isAdmin ? Admin_DROPDOWN_ITEMS : User_DROPDOWN_ITEMS;
  const navigate = useNavigate();

  isLoading && <Spinner/>

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully!');
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const renderDropdown = () => (
    <Modal
      isOpen={menuOpen}
      onClose={handleOpenModal}
      modalClassName="dropdown-backdrop"
      containerClassName="dropdown-menu"
    >
     <ul className="header__dropdown-list">
        {dropDownItems.map(({ label, action, to }) => (
          <li key={label}>
            <DropDownItem
              to={to}
              textOnly={!to}
              onClick={() => {
                handleOpenModal();
                if (action === 'logout') handleLogout();
              }}
            >
              {label}
            </DropDownItem>
          </li>
        ))}
      </ul>
    </Modal>
  );


  return (
    <header className={`header ${isAdmin ? 'header--admin' : 'header--user'}`}>
      <div className="header__inner">
        <Button to="/" className="header__logo">
          {isAdmin ? 'Admin Dashboard' : 'ReactMentoring'}
        </Button>

        <div className="header__nav--container">
          {!isAdmin && (
            <nav className="header__nav">
              {NAV_ITEMS.map(({ to, label }) => (
                <Button key={to} to={to} className="header__link" textOnly>
                  {label}
                </Button>
              ))}
            </nav>
          )}

          <div className="header__actions">
            {isAdmin && (
              <>
                <Button className="header__icon">
                  <FaMoon />
                </Button>
                <Button className="header__icon header__icon--notification">
                  <FaBell />
                  <span className="header__badge">3</span>
                </Button>
              </>
            )}

            {isAuthenticated && userProfile ? (
              <div className="header__profile" ref={menuRef}>
                <Button
                  onClick={handleOpenModal}
                  textOnly
                  className={`header__icon ${isAdmin ? 'header__icon--profile' : ''}`}
                >
                  {isAdmin ? <FaUserCircle /> : (
                    <img
                      src={userProfile.avatar_url}
                      alt={userProfile.name || 'user avatar'}
                      className="header__avatar"
                    />
                  )}
                </Button>
                {renderDropdown()}
              </div>
            ) : (
              !isAdmin && <Button to="/login" textOnly className="header__link">Login</Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 