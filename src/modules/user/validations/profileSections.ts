import { z  as ZOD} from "zod";



// HEADER SECTION
export const HeaderSchema = ZOD.object({
   name: ZOD.string().min(2, "Name is too short"),
   email: ZOD.string().email(),
   phone: ZOD.string().min(5).optional().nullable(),
})

export type HeaderFormValues = ZOD.infer<typeof HeaderSchema>;


//BIO SECTION 

export const BioSchema = ZOD.object({
bio: ZOD.string().min(10, "Bio is too short"),
});

export type BioFormValues = ZOD.infer<typeof BioSchema>;

// SHORTCUT- LINKS SECTION

 const LinkItemSchema = ZOD.object({ label: ZOD.string().min(2), url: ZOD.string().url() });

export const LinksSchema = ZOD.object({
links: ZOD.array(LinkItemSchema).min(1, "Add at least one link"),
});
export type LinksFormValues = ZOD.infer<typeof LinksSchema>;

