import { useEffect, useState } from "react";
import { getSignedAvatarUrl } from "../../../utils/getSignedAvatarUrl";
import { FiCamera } from "react-icons/fi";
import { AvatarVariant } from "../../../enums/avatar";
import { getInitials } from "../../../utils/getInitials";

interface AvatarCardProps {
    name?: string;
    avatarPath: string | null; 
    variant?: AvatarVariant;
    size?: number;
    onSelect: ()=>void;
    uploading?: boolean;
}

export default function AvatarCard({name, avatarPath, size = 160, onSelect, uploading,variant}: AvatarCardProps) {
  
    const [src, setSrc] = useState<string | null>(null);

    const initials = getInitials(name || "");
    

    useEffect(()=>{
      let isMounted = true;
      (async()=>{
        try{
          const avatarUrl = await getSignedAvatarUrl(avatarPath, size);

            if (isMounted) setSrc(avatarUrl);

        }
        catch(err){
            console.log(err);
            if (isMounted) setSrc(null);
        }
        })();
     
        return () => { isMounted = false; };

    },[avatarPath, size]);



    return(
     <div className={`profile__avatar profile__avatar--${variant}  ${uploading ? "is-uploading" : ""}`}>
       <div className="profile__avatar--fallback" aria-hidden={!!src}>
        {initials}
      </div>

        { src && 
                  <img 
                      alt={name || initials}
                      src={src} 
                      onError={(e)=>e.currentTarget.remove()} // if it fails → reveal fallback
                    />}  

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
    )
}