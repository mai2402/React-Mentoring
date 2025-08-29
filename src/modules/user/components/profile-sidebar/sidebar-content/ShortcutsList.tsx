import { Link } from "react-router-dom";




export default function ShortcutsList() {
    return(
           <div className="profile__shortcuts">
                      <h4>Shortcuts</h4>
                      <ul>
                        <li><Link className="header__link"  to="" >Account</Link></li>
                        <li><Link className="header__link"  to="">Notifications</Link></li>
                        <li><Link className="header__link"  to="">Privacy</Link></li>
                        <li><Link className="header__link"  to="">Security</Link></li>
                      </ul>
                    </div>
    )
}