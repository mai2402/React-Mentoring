import { useNavigate } from 'react-router-dom';
import { useAuthenticationContext } from '../../core/store/authContext';
import { logout } from '../../core/services/authService';
import toast from 'react-hot-toast';

import Button from '../ui/Button';
import { ButtonVariations, ButtonSizes } from '../enums/buttons'; // ⬅️ adjust path if needed

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
        {/* Brand / Logo */}
        <Button
          to={AppRoute.Home}
          ui={{ variation: ButtonVariations.Link, size: ButtonSizes.Md }}
          className="header__logo"
        >
          {isAdmin ? 'Admin Dashboard' : 'ReactMentoring'}
        </Button>

        <div className="header__nav--container">
          {!isAdmin && (
            <nav className="header__nav">
              {NAV_ITEMS.map(({ to, label }) => (
                <Button
                  key={to}
                  to={to}
                  ui={{ variation: ButtonVariations.Link, size: ButtonSizes.Md }}
                  className="header__link"
                >
                  {label}
                </Button>
              ))}
            </nav>
          )}

          <div className="header__actions">
            {isAdmin && (
              <>
                <Button
                  ui={{ variation: ButtonVariations.Ghost, size: ButtonSizes.Sm }}
                  className="header__icon"
                >
                  <FaMoon />
                </Button>

                <Button
                  ui={{ variation: ButtonVariations.Ghost, size: ButtonSizes.Sm }}
                  className="header__icon header__icon--notification"
                >
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
                    ui={{ variation: ButtonVariations.Ghost, size: ButtonSizes.Sm }}
                    className={`header__icon ${isAdmin ? 'header__icon--profile' : ''}`}
                  >
                    {!userProfile.avatar_path ? (
                      <FaUserCircle />
                    ) : (
                      <img
                        src={userProfile.avatar_path}
                        alt={userProfile.name || 'user avatar'}
                        className="header__avatar"
                          referrerPolicy="no-referrer"
          decoding="async"
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
                <Button
                  to={AppRoute.Login}
                  ui={{ variation: ButtonVariations.Link, size: ButtonSizes.Md }}
                  className="header__link"
                >
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
