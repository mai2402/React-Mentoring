import AvatarCard from "./sidebar-content/AvatarCard";
import { useUpdateAvatar } from "../../hooks/useUpdateAvatar";
import { AvatarVariant } from "../../enums/avatar";

interface UserSidebarProps {
    children?: React.ReactNode;
    onEdit?: () => void;
    onCopy?: () => void;
    isActive?: boolean;
    name?: string;
    avatarPath?: string | null;
    
}


export default function ProfileSidebar({children,onEdit,onCopy,isActive,name, avatarPath: intialAvatar}: UserSidebarProps) {
   
  const {fileRef, avatarPath, uploading, onPick} = useUpdateAvatar(intialAvatar!)

      const openPicker = ()=> fileRef.current?.click();

    return(
     <aside className="profile__sidebar">

          <AvatarCard 
               name={name} 
               avatarPath={avatarPath} 
               onSelect={openPicker} 
               uploading={uploading}
               variant={AvatarVariant.XL}/>

          <input 
              ref={fileRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              hidden
              onChange={onPick}
              disabled={uploading}
          />
          
            <span className={`badge ${isActive? "badge--active": "badge--inactive"}`}>
                {isActive? "Active" : "InActive"}
            </span>

            
        
            <div className="profile__quick">
              <button onClick={onEdit} className="btn btn--primary">Edit Profile</button>
              <button  onClick={onCopy} className="btn btn--ghost">Copy Email</button>
            </div>

        
            {children}
     </aside>
    )
}