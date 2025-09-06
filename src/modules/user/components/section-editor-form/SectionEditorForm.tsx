import type { UserProfile } from "../../interface/user";
import { SectionKeyEnum } from "../../enums/profile-section";
import { sectionConfigs } from "./sectionConfig";
import { useUpdateProfileSection } from "../../hooks/useUpdateProfileSection";
import Form from "../../../../shared/ui/Form";
import toast from "react-hot-toast";
import { ToastError, ToastSuccess } from "../../../../shared/enums/toasts";
import { FieldRenderer } from "./FieldRerender";
import { EnumValues } from "zod";

// ⬇️ new imports
import Button from "../../../../shared/ui/Button";
import { ButtonVariations, ButtonSizes } from "../../../../shared/enums/buttons";

interface SectionEditorFormProps  {
  section: SectionKeyEnum;
  snapshot: UserProfile;
  onDone: () => void;
};

export function SectionEditorForm({ section, snapshot, onDone }: SectionEditorFormProps) {
  const cfg = sectionConfigs[section];
  const { mutateAsync, isPending } = useUpdateProfileSection();

  const onSubmit = async (values: EnumValues) => {
    try {
      await mutateAsync(cfg.toPayload(values));
      toast.success(ToastSuccess.Updated);
      onDone();
    } catch (err) {
      console.log(err);
      toast.error(ToastError.Unknown);
    }
  };

  return (
    <div className="section-editor">
      <h3 className="section-editor__title">{cfg.title}</h3>

      <Form<any> schema={cfg.schema} defaultValues={snapshot} onSubmit={onSubmit}>
        {() => (
          <div className="section-editor__form">
            {cfg.fields.map((f, i) => (
              <FieldRenderer key={i} spec={f} />
            ))}

            <div className="form-actions">
              <Button
                ui={{ variation: ButtonVariations.Outline, size: ButtonSizes.Md }}
                htmlType="button"
                onClick={onDone}
                disabled={isPending}
              >
                Cancel
              </Button>

              <Button
                ui={{ variation: ButtonVariations.Primary, size: ButtonSizes.Md }}
                htmlType="submit"
                disabled={isPending}
              >
                {isPending ? "Saving…" : "Save"}
              </Button>
            </div>
          </div>
        )}
      </Form>
    </div>
  );
}
