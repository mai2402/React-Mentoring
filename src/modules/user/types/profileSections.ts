import { z as ZOD} from "zod";
import { FieldKind, LinkItemFieldName, SectionKeyEnum } from "../enums/profile-section";
import { UserProfile } from "../interface/user";



export type SectionFields = {
  [SectionKeyEnum.HEADER]: Pick<UserProfile, "name" | "email" | "phone">;
  [SectionKeyEnum.BIO]: Pick<UserProfile, "bio">;
  [SectionKeyEnum.LINKS]: Pick<UserProfile, "social_links">;
  [SectionKeyEnum.SHORTCUTS]: Pick<UserProfile, "shortcuts">;
};

export type SectionPayload =
  | { section: SectionKeyEnum.HEADER; data: SectionFields[SectionKeyEnum.HEADER] }
  | { section: SectionKeyEnum.BIO; data: SectionFields[SectionKeyEnum.BIO] }
  | { section: SectionKeyEnum.LINKS; data: SectionFields[SectionKeyEnum.LINKS] }
  | { section: SectionKeyEnum.SHORTCUTS; data: SectionFields[SectionKeyEnum.SHORTCUTS] };


type BaseField = {
  name: string;
  label: string;
};

// text
export type TextFieldSpec = BaseField & {
  kind: FieldKind.Text;
  type?: string;            // 'text' | 'email' | 'url' | 'tel' ...
  placeholder?: string;
};

// textarea
export type TextareaFieldSpec = BaseField & {
  kind: FieldKind.Textarea;
  rows?: number;
  placeholder?: string;
};

export type ArrayFieldSpec = {
  kind: FieldKind.Array;
  name: "social_links"; 
  label: string;
  itemFields: Array<{
    name: LinkItemFieldName;
    label: string;
    type?: string;
    placeholder?: string;
  }>;
};

export type FieldSpec = TextFieldSpec | TextareaFieldSpec | ArrayFieldSpec;


export type SectionConfig = {
  title: string;
  schema: ZOD.ZodTypeAny;
  defaults: (p: UserProfile) => Record<string, any>;
  fields: FieldSpec[];
  toPayload: (values: Record<string, any>) => SectionPayload;
};


export type EditorPayload = {
  section: SectionKeyEnum;
  snapshot: UserProfile;
  title?: string;
};
