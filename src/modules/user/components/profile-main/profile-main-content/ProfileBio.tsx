import Button from "../../../../../shared/ui/Button";
import { ButtonVariations, ButtonSizes } from "../../../../../shared/enums/buttons";
import { FiEdit2 } from "react-icons/fi";

export default function ProfileBio({ bio, onEdit }: { bio?: string | null; onEdit?: () => void }) {
  return (
    <section className="profile__bio">
      <div className="profile__bio-header">
         
        <h4>Bio</h4>
        {onEdit && (
          <Button
            ui={{ variation: ButtonVariations.Ghost, size: ButtonSizes.Sm }}
            className="icon-fab"
            htmlType="button"
            aria-label="Edit bio"
            title="Edit bio"
            onClick={onEdit}
          >
            <FiEdit2 />
          </Button>
        )}
      </div>
      <p>{bio || "No bio yet."}</p>
    </section>
  );
}
