import { FiCamera } from "react-icons/fi";
import { AvatarVariant } from "../../../enums/avatar";
import { getInitials } from "../../../utils/getInitials";

interface AvatarCardProps {
  name?: string;
  srcUrl: string | null;        // <- signed URL or null
  variant?: AvatarVariant;
  size?: number;
  onSelect: () => void;
  uploading?: boolean;
}

export default function AvatarCard({
  name,
  srcUrl,
  size = 160,
  onSelect,
  uploading,
  variant,
}: AvatarCardProps) {
  const initials = getInitials(name || "");

  return (
    <div
      className={`profile__avatar profile__avatar--${variant} ${uploading ? "is-uploading" : ""}`}
      style={{ width: size, height: size }}
    >
      <div className="profile__avatar--fallback" aria-hidden={!!srcUrl}>
        {initials}
      </div>

      {srcUrl && (
        <img
          alt={name || initials}
          src={srcUrl}
          style={{ width: size, height: size, objectFit: "cover", borderRadius: "50%" }}
          onError={(e) => {
            // reveal fallback if loading fails
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      )}

      <button
        type="button"
        className="camera-btn"
        aria-label="Change photo"
        onClick={onSelect}
        disabled={uploading}
        title="Change photo"
      >
        <FiCamera size={18} />
      </button>
    </div>
  );
}
