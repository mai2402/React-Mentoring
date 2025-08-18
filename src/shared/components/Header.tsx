import { useNavigate } from 'react-router-dom';
import { useAuthenticationContext } from '../../core/store/authContext';
import { logout } from '../../core/services/authService';
import toast from 'react-hot-toast';

import Button from '../ui/Button';



import { FaMoon, FaBell, FaUserCircle } from 'react-icons/fa';
import Spinner from '../ui/Spinner';
import { DropDownMenu } from '../ui/DropDownMenu';
import DropDownItem from '../ui/DropDownItem';
import { UserRole } from '../../modules/user/enums/users';
import { AppRoute } from '../../app/enums/routes';

const NAV_ITEMS = [
  { to: AppRoute.Home, label: 'Our Mission' },
  { to: AppRoute.Sessions, label: 'Browse Sessions' },
];

const USER_DROPDOWN_ITEMS = [
  { label: 'My Profile', to: AppRoute.Profile },
  { label: 'Upcoming Sessions', to: AppRoute.Upcoming },
  { label: 'Logout', action: 'logout' },
];

export default function SmartHeader() {
  const { isAuthenticated, userProfile, isLoading } = useAuthenticationContext();
  const navigate = useNavigate();

  const isAdmin = userProfile?.role === UserRole.ADMIN;
  const isUser = userProfile?.role === UserRole.USER;

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully!');
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <header className={`header ${isAdmin ? 'header--admin' : 'header--user'}`}>
      <div className="header__inner">
        <Button to={AppRoute.Home} className="header__logo">
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

            {isAuthenticated && isUser ? (
              <DropDownMenu
                align="right"
                trigger={
                  <Button
                    textOnly
                    className={`header__icon ${isAdmin ? 'header__icon--profile' : ''}`}
                  >
                    {!userProfile.avatar_url ? (
                      <FaUserCircle />
                    ) : (
                      <img
                        src={userProfile.avatar_url}
                        alt={userProfile.name || 'user avatar'}
                        className="header__avatar"
                      />
                    )}
                  </Button>
                }
              >
                {(close) => (
                  <ul className="header__dropdown-list">
                    {USER_DROPDOWN_ITEMS.map(({ label, to, action }) => (
                      <DropDownItem
                        key={label}
                        to={to}
                        textOnly={!to}
                        onClick={() => {
                          close();
                          if (action === 'logout') handleLogout();
                        }}
                      >
                        {label}
                      </DropDownItem>
                    ))}
                  </ul>
                )}
              </DropDownMenu>
            ) : (
              !isAdmin && (
                <Button to="/login" textOnly className="header__link">
                  Login
                </Button>
              )
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
