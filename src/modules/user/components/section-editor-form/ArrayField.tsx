import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import Input from "../../../../shared/ui/Input";
import { ArrayFieldSpec } from "../../types/profileSections";
import { SocialLinksEnum } from "../../enums/profile-section";

export const ORDER: SocialLinksEnum[] = [
  SocialLinksEnum.WEBSITE,
  SocialLinksEnum.GITHUB,
  SocialLinksEnum.LINKEDIN,
  SocialLinksEnum.TWITTER,
];

const PLACEHOLDERS: Record<SocialLinksEnum, string> = {
  [SocialLinksEnum.WEBSITE]: "https://yourdomain.com",
  [SocialLinksEnum.GITHUB]: "https://github.com/username",
  [SocialLinksEnum.LINKEDIN]: "https://linkedin.com/in/username",
  [SocialLinksEnum.TWITTER]: "https://x.com/username",
};

const pretty = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function ArrayField({ spec }: { spec: ArrayFieldSpec }) {
  const { register, formState, setValue, control } = useFormContext<any>();
  // read defaults so placeholders/prefill work (coming from ensureSocialLinksExist)
  useWatch({ control, name: spec.name });

  // Force the labels from the enum (read-only)
  useEffect(() => {
    ORDER.forEach((label, idx) => {
      setValue(`${spec.name}.${idx}.label`, label, { shouldDirty: false });
    });
  }, [setValue, spec.name]);

  return (
    <div className="array-field">
      <div className="array-field__head">
        <h5 className="array-field__title">{spec.label}</h5>
      </div>

      <div className="array-field__list">
        {ORDER.map((label, idx) => {
          const labelPath = `${spec.name}.${idx}.label` as const;
          const urlPath = `${spec.name}.${idx}.url` as const;
          const urlErr = (formState.errors as any)?.[spec.name]?.[idx]?.url?.message as string | undefined;

          return (
            <div key={label} className="array-field__item">
              {/* fixed label + hidden field so it submits */}
              <div className="array-field__col array-field__label-col">
                <span className="chip">{pretty(label)}</span>
                <input type="hidden" {...register(labelPath)} value={label} />
              </div>

              {/* URL input (optional) */}
              <label className="form-field array-field__col">
                <Input
                  label="URL"
                  className={`form-field__label form-field__input ${urlErr ? "is-invalid" : ""}`}
                  type="url"
                  placeholder={PLACEHOLDERS[label]}
                  {...register(urlPath)}
                />
                {urlErr && <small className="form-field__error">{urlErr}</small>}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
