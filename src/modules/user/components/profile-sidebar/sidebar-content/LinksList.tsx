import Button from "../../../../../shared/ui/Button";
import {  } from "../../../validations/profileSections";
import { ProfileLink } from "../../../interface/user";
import { ButtonSizes, ButtonVariations } from "../../../../../shared/enums/buttons";
import { FiEdit2, FiExternalLink } from "react-icons/fi";
import { ORDER } from "../../section-editor-form/ArrayField";


interface LinksListProps {
    onEdit?: ()=>void;
    linkList?: ProfileLink[];
}

const pretty = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function LinksList({ onEdit , linkList}:LinksListProps) {

  

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
                 {ORDER.map((label) => {
                    const item = linkList!!.find((l) => l.label === label);
                    const url = item?.url?.trim();

                           return (
            <li key={label} className="profile-links__item">
              {url ? (
                <a
                  className="profile-link"
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={url}
                >
                  {pretty(label)}
                  <FiExternalLink className="profile-link__icon" aria-hidden="true" />
                </a>
              ) : (
                <span className="profile-link profile-link--muted">{pretty(label)}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );

}