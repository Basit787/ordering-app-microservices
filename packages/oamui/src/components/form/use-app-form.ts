import { createFormHook } from "@tanstack/react-form";
import { fieldContext, formContext } from "./form-context";
import { OamUiForm } from "./oamui-form";
import { OamUiFormCheckboxField } from "./oamui-form-checkbox-field";
import { OamUiFormPasswordField } from "./oamui-form-password-field";
import { OamUiFormSubmitButton } from "./oamui-form-submit-button";
import { OamUiFormTextField } from "./oamui-form-text-field";
import { OamUiFormTextareaField } from "./oamui-form-textarea-field";

// The app-wide TanStack Form hook: form.AppField gives field.TextField…, form.AppForm gives form.Form / SubmitButton
export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField: OamUiFormTextField,
    PasswordField: OamUiFormPasswordField,
    TextareaField: OamUiFormTextareaField,
    CheckboxField: OamUiFormCheckboxField,
  },
  formComponents: {
    Form: OamUiForm,
    SubmitButton: OamUiFormSubmitButton,
  },
});
