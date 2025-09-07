import { Link } from "react-router-dom";
import { AppRoute } from "../../../../../app/enums/routes";
import { FiUser, FiBell, FiShield, FiLock } from "react-icons/fi";
import Button from "../../../../../shared/ui/Button";
import { ButtonSizes, ButtonVariations } from "../../../../../shared/enums/buttons";






export default function ShortcutsList( ) {

  const items = [
    { id: "acct", label: "Account",       to: AppRoute.Profile , icon: <FiUser/> },
    { id: "noti", label: "Notifications", to: AppRoute.Notifications , icon: <FiBell/> },
    { id: "priv", label: "Privacy",       to: AppRoute.Privacy , icon: <FiShield/> },
    { id: "sec",  label: "Security",      to: AppRoute.Security , icon: <FiLock/> },
  ];
 
    return(
           <div className="profile__shortcuts">
                          
                        <h4>Shortcuts</h4>

                      <ul>
                        {items.map((item)=>(
                          <li key={item.id}>
                            <Button
                              ui={{ variation: ButtonVariations.Link, size: ButtonSizes.Sm }}
                              className="chip-link header__link"
                              to={item.to}
                              aria-label={item.label}>
                              {item.icon}
                              <span> {item.label} </span>  
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </div>
    )
}