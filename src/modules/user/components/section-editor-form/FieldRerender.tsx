import { FieldSpec } from "../../types/profileSections";
import { ArrayField } from "./ArrayField";
import { FieldKind } from "../../enums/profile-section";
import { useFormContext } from "react-hook-form";
import Input from "../../../../shared/ui/Input";




export function FieldRenderer({
  spec,}: {
  spec: FieldSpec;
}) {

  const{formState, register} = useFormContext<any>()

  if (spec.kind === FieldKind.Text) {
    const err = formState.errors?.[spec.name]?.message as
      | string
      | undefined;
    return (
      <label className="form-field">

        <Input
          label={spec.label}
          className={`form-field__label form-field__input ${err ? "is-invalid" : ""}`}
          type={spec.type ?? FieldKind.Text}
          placeholder={spec.placeholder}
          {...register(spec.name)}
        />
        {err && <small className="form-field__error">{err}</small>}
      </label>
    );
  }

  if (spec.kind === FieldKind.Textarea) {
    const err = formState.errors?.[spec.name]?.message as
      | string
      | undefined;
    return (
      <label className="form-field">
        <span className="form-field__label">{spec.label}</span>
        <textarea
          className={`form-field__textarea ${err ? "is-invalid" : ""}`}
          rows={spec.rows ?? 4}
          placeholder={spec.placeholder}
          {...register(spec.name)}
        />
        {err && <small className="form-field__error">{err}</small>}
      </label>
    );
  }

  // Array (social_links)
  return (
    <ArrayField
      spec= {spec}
    />
  );
}