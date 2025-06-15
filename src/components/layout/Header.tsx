import { useState, useRef, useEffect, act } from 'react';
import {useNavigate } from 'react-router-dom';
import Button from "../shared/Button";
import Modal from "../shared/Modal";
import { useAuthenticationContext } from "../../contexts/authContext";
import { useGetUserProfile } from "../../hooks/users/useGetUserProfile";
import { logout } from "../../services/authService";
import toast from 'react-hot-toast';
import DropDownItem from '../shared/DropDownItem';
import { useDropDownModal } from '../../hooks/useDropDownModal';


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
  const { isAuthenticated , setIsAuthenticated} = useAuthenticationContext();
  const {menuOpen, menuRef, handleOpenModal} = useDropDownModal();
  const { data: user } = useGetUserProfile();
  const navigate = useNavigate();
  


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
        
        {isAuthenticated && user &&  (
          <div className="header__profile" ref={menuRef}>

            <Button
              onClick={handleOpenModal}
              textOnly
            >
              <img
                src={user?.avatar_url}
                alt={user?.name || "user avatar"}
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
        )}
      </div>
      </div>
    </header>
  );
}