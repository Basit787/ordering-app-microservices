import type { ComponentProps } from "react";
import { OamUiButton } from "../button/oamui-button";
import { useFormContext } from "./form-context";

type OamUiFormSubmitButtonProps = Omit<ComponentProps<typeof OamUiButton>, "type">;

// Submit button: disabled until something changed and while the form is invalid or submitting
export function OamUiFormSubmitButton({ disabled, loading, ...props }: OamUiFormSubmitButtonProps) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting, state.isPristine] as const}>
      {([canSubmit, isSubmitting, isPristine]) => (
        <OamUiButton
          {...props}
          type="submit"
          loading={loading || isSubmitting}
          disabled={disabled || !canSubmit || isPristine}
        />
      )}
    </form.Subscribe>
  );
}
