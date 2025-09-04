import { useFieldArray, useFormContext,  } from "react-hook-form";
import { ArrayFieldSpec } from "../../types/profileSections";
import Input from "../../../../shared/ui/Input";


export function ArrayField({spec}: { spec: ArrayFieldSpec }) {
  const { control, register, formState } = useFormContext<any>();
  const { fields, append, remove } = useFieldArray({ control, name: spec.name });

  return (
    <div className="array-field">
      <div className="array-field__head">
        <h5 className="array-field__title">{spec.label}</h5>
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => append({ label: "", url: "" })}
        >
          + Add
        </button>
      </div>

      <div className="array-field__list">
        {fields.map((row, idx) => (
          <div key={row.id} className="array-field__item">
            {spec.itemFields.map((it) => {
              const fieldName = `${spec.name}.${idx}.${it.name}` as const;
              const err = (formState.errors as any)?.[spec.name]?.[idx]?.[it.name]
                ?.message as string | undefined;

              return (
                <label key={it.name} className="form-field array-field__col">
                  {/* <span className="form-field__label">{it.label}</span> */}
                  <Input
                    label={it.label}
                    className={`form-field__label form-field__input ${err ? "is-invalid" : ""}`}
                    type={it.type ?? "text"}
                    placeholder={it.placeholder}
                    {...register(fieldName)}
                  />
                  {err && <small className="form-field__error">{err}</small>}
                </label>
              );
            })}
            <div className="array-field__col array-field__actions">
              <button
                type="button"
                className="btn btn--danger"
                onClick={() => remove(idx)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}