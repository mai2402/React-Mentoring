import { useEffect, useState } from "react";
import { getSignedAvatarUrl } from "../../../utils/getSignedAvatarUrl";
import fallback from "../../../../../assets/students.jpg";
import { FiCamera } from "react-icons/fi";
import { AvatarVariant } from "../../../enums/avatar";

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
         <img alt={name} src={src || fallback} />
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