import toast from "react-hot-toast";
import { useModal } from "../../../shared/hooks/useModal";
import { useGetUserProfile } from "../hooks/useGetUserProfile";
import { UserCard, UserProfile } from "../interface/user";
import { EditorPayload } from "../types/profileSections";
import { SectionKeyEnum } from "../enums/profile-section";
import ProfileSidebar from "./profile-sidebar/ProfileSidebar";
import ShortcutsList from "./profile-sidebar/sidebar-content/ShortcutsList";
import LinksList from "./profile-sidebar/sidebar-content/LinksList";
import ProfileMainContent from "./profile-main/ProfileMainContent";
import ProfileHeader from "./profile-main/profile-main-content/ProfileHeader";
import ProfileKPIs from "./profile-main/profile-main-content/ProfileKPIs";
import ProfileTabs from "./profile-main/profile-main-content/ProfileTabs";
import ProfileBio from "./profile-main/profile-main-content/ProfileBio";
import Modal from "../../../shared/ui/Modal";
import { SectionEditorForm } from "./section-editor-form/SectionEditorForm";
import { useGetMyBookings } from "../../bookings/hooks/useGetMyBookings";
import Spinner from "../../../shared/ui/Spinner";




export default function UserProfileContent(card: UserCard) {
  const initial = (card.profile ?? null) as UserProfile | null;
  const { data } = useGetUserProfile(initial?.id as string);

  const {data: myBookings, isLoading} = useGetMyBookings();

  const { isOpenModal, payload, open, close } = useModal<EditorPayload>();

  const myBookingsCount = myBookings?.length ?? 0;

   // single source of truth for the whole tree
  const profile = data ?? initial;
  if (!profile) return null; 



  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email ?? '');
    toast.success('Email copied');
  };

  const openEditor = (section: SectionKeyEnum) =>
    open({ section, snapshot: profile, title: `Edit ${section}` });


  
  if (isLoading) {
    return <Spinner/>;
  }

  return (
    <div className="profile">
      <ProfileSidebar
        isActive={profile.isActive}
        onEdit={() => openEditor(SectionKeyEnum.HEADER)}
        onCopy={handleCopyEmail}
        name={profile.name}
        userId={profile.id}
      >
        <ShortcutsList/>
        <LinksList onEdit={()=> openEditor(SectionKeyEnum.LINKS)} 
                   linkList={profile.social_links}
        />
      </ProfileSidebar>

      <ProfileMainContent>
        <ProfileHeader
          name={profile.name}
          email={profile.email}
          phone={profile.phone}
          created_at={profile.created_at}
        />
        <ProfileKPIs  numberOfBookings={myBookingsCount}/>
        <ProfileTabs />
        <ProfileBio onEdit={() => openEditor(SectionKeyEnum.BIO)} bio={profile.bio} />
      </ProfileMainContent>

      <Modal isOpen={isOpenModal} 
             onClose={close} 
             modalClassName="backdrop--blur" 
             containerClassName="dialog--md" scrollable>

        {payload && (
          <SectionEditorForm
            section={payload.section}
            snapshot={profile} 
            onDone={() => {
              close();
            }}
          />
        )}
      </Modal>
    </div>
  );
}
