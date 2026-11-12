import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "oamui/ui/input-otp";
import * as React from "react";
import { OamUiField, type OamUiFieldProps } from "./oamui-field";

type OamUiInputOTPProps = Pick<OamUiFieldProps, "label" | "description" | "error"> & {
  // Digits per group, e.g. [3, 3] renders "123-456"
  groups?: number[];
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
  className?: string;
};

export function OamUiInputOTP({
  groups = [6],
  value,
  onChange,
  onComplete,
  disabled,
  label,
  description,
  error,
  className,
}: OamUiInputOTPProps) {
  const length = groups.reduce((sum, size) => sum + size, 0);
  let index = 0;
  return (
    <OamUiField label={label} description={description} error={error} className={className}>
      <InputOTP maxLength={length} value={value} onChange={onChange} onComplete={onComplete} disabled={disabled}>
        {groups.map((size, groupIndex) => (
          <React.Fragment key={groupIndex}>
            {groupIndex > 0 && <InputOTPSeparator />}
            <InputOTPGroup>
              {Array.from({ length: size }, () => {
                const slot = index++;
                return <InputOTPSlot key={slot} index={slot} />;
              })}
            </InputOTPGroup>
          </React.Fragment>
        ))}
      </InputOTP>
    </OamUiField>
  );
}
