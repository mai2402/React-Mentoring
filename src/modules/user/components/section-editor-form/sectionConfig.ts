import { FieldKind, LinkItemFieldName, SectionKeyEnum } from "../../enums/profile-section"
import { SectionConfig } from "../../types/profileSections"
import { BioSchema, HeaderSchema, LinksSchema } from "../../validations/profileSections"




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

  [SectionKeyEnum.LINKS]: {
    title: "Edit Links",
    schema: LinksSchema,
    defaults: (p) => ({ social_links: p.social_links ?? [{ label: "", url: "" }] }),
    fields: [{
      kind: FieldKind.Array,
      name: "social_links",
      label: "Links",
      itemFields: [
        { name: LinkItemFieldName.Label, label: "Label", placeholder: "GitHub" },
        { name: LinkItemFieldName.Url,   label: "URL", type: "url", placeholder: "https://github.com/…" },
      ],
    }],
    toPayload: (v) => ({ section: SectionKeyEnum.LINKS, data: { social_links: v.social_links } }),
  },
  
  [SectionKeyEnum.SHORTCUTS]: {
    title: "Edit Shortcuts",
    schema: LinksSchema,
    defaults: (p) => ({ website: p.website ?? "" }),
    fields: [{ kind: FieldKind.Text, name: "website", label: "Website", type: "url", placeholder: "https://…" }],
    toPayload: (v) => ({ section: SectionKeyEnum.SHORTCUTS, data: { website: v.website } }),
  },
};