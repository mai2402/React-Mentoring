import { Link } from "react-router-dom";
import Button from "../../../../../shared/ui/Button";
import {  } from "../../../validations/profileSections";
import { ProfileLink } from "../../../interface/user";
import { ButtonSizes, ButtonVariations } from "../../../../../shared/enums/buttons";
import { FiEdit2 } from "react-icons/fi";


interface LinksListProps {
    onEdit?: ()=>void;
    linkList?: ProfileLink[];
}

export default function LinksList({ onEdit , linkList}:LinksListProps) {
  console.log('linkList', linkList);

    return(
   
         <div className="profile__links">
              <div className="profile__bio-header">
                       
                      <h4>Links</h4>
                      {onEdit && (
                        <Button
                          ui={{ variation: ButtonVariations.Ghost, size: ButtonSizes.Sm }}
                          className="icon-fab"
                          htmlType="button"
                          aria-label="Edit links"
                          title="Edit links"
                          onClick={onEdit}
                        >
                          <FiEdit2 />
                        </Button>
                      )}
                    </div>
              <ul>
                <li><Link to="">Website</Link></li>
                <li><Link to="">GitHub</Link></li>
                <li><Link to="">LinkedIn</Link></li>
                <li><Link to="">Twitter</Link></li>
              </ul>
            </div>
    );
}