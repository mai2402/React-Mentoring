import { FieldKind, LinkItemFieldName, SectionKeyEnum } from "../../enums/profile-section"
import { SectionConfig } from "../../types/profileSections"
import { ensureSocialLinksExist } from "../../utils/ensureSocialLinksExist";
import { BioSchema, HeaderSchema, SocialLinksSchema } from "../../validations/profileSections"




export const sectionConfigs: Record<SectionKeyEnum, SectionConfig> = {

  [SectionKeyEnum.HEADER]: {

    title: "Edit Profile",
    schema: HeaderSchema,
    defaults: (p) => ({ name: p.name ?? "", email: p.email ?? "", phone: p.phone ?? "" }),
    fields: [
      { kind: FieldKind.Text, name: "name",  label: "Name",  placeholder: "Your name" },
      { kind:FieldKind.Text, name: "email", label: "Email", type: "email", placeholder: "you@example.com" },
      { kind:FieldKind.Text, name: "phone", label: "Phone", placeholder: "(+20) ..." },
    ],
    toPayload: (v) => ({ section: SectionKeyEnum.HEADER, data: { name: v.name, email: v.email, phone: v.phone } }),
  },

 [SectionKeyEnum.BIO]: {
    title: "Edit Bio",
    schema: BioSchema,
    defaults: (p) => ({ bio: p.bio ?? "" }),
    fields: [{ kind: FieldKind.Textarea, name: "bio", label: "Bio", rows: 6, placeholder: "Tell us about you…" }],
    toPayload: (v) => ({ section: SectionKeyEnum.BIO, data: { bio: v.bio } }),
  },

[SectionKeyEnum.SOCIAL_LINKS]: {
  title: "Edit Links",
  schema: SocialLinksSchema,
  defaults: (p) => ({
    social_links: ensureSocialLinksExist(p?.social_links ?? []),
  }),
  fields: [
    {
      kind: FieldKind.Array,
      name: "social_links",
      label: "Links",
        itemFields: [
        {
          name: LinkItemFieldName.Url,     
          label: "URL",
          kind: FieldKind.Text,
          type: "url",
          placeholder: "https://…",
        },
      ],
    },
  ],
  toPayload: (v) => ({
    section: SectionKeyEnum.SOCIAL_LINKS,
    data: { social_links: v.social_links },
  }),
},

};

