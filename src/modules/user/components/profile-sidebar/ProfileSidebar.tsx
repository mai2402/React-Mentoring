import AvatarCard from "./sidebar-content/AvatarCard";
import { AvatarVariant } from "../../enums/avatar";
import Spinner from "../../../../shared/ui/Spinner";
import { useAvatarPreview } from "../../hooks/useAvatarPreview";
import { useAvatar } from "../../hooks/useAvatar";

interface UserSidebarProps {
  children?: React.ReactNode;
  onEdit?: () => void;
  onCopy?: () => void;
  isActive?: boolean;
  name?: string;
  userId: string;
}

export default function ProfileSidebar({
  userId,
  children,
  onEdit,
  onCopy,
  isActive,
  name,
}: UserSidebarProps) {

  const {isLoading} = useAvatar(userId);
  const {isUploading, optimisticUrl, ref, onPick,openPicker} = useAvatarPreview(userId)

  if (isLoading) return <Spinner />;

  

  return (
    <aside className="profile__sidebar">
      <AvatarCard
        name={name}
        srcUrl={optimisticUrl} 
        onSelect={openPicker}
        uploading={isUploading}
        variant={AvatarVariant.XL}
      />

      <input
        ref={ref}
        type="file"
        accept="image/png,image/jpeg,image/webp" // matches your service ALLOWED
        hidden
        onChange={onPick}
        disabled={isUploading}
      />

      <span className={`badge ${isActive ? "badge--active" : "badge--inactive"}`}>
        {isActive ? "Active" : "InActive"}
      </span>

      <div className="profile__quick">
        <button onClick={onEdit} className="btn btn--primary" disabled={isUploading}>
          Edit Profile
        </button>
        <button onClick={onCopy} className="btn btn--ghost" disabled={isUploading}>
          Copy Email
        </button>
      </div>

      {children}
    </aside>
  );
}
