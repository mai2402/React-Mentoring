import { Link } from "react-router-dom";




export default function LinksList() {

    return(
   
         <div className="profile__links">
              <h4>Links</h4>
              <ul>
                <li><Link to="">Website</Link></li>
                <li><Link to="">GitHub</Link></li>
                <li><Link to="">LinkedIn</Link></li>
                <li><Link to="">Twitter</Link></li>
              </ul>
            </div>
    );
}