import { Controller, FieldError } from "react-hook-form";
import { FormField } from "../../types/types";
import { Input } from "@/shared/ui";
import { FieldLabel } from "./FieldLabel";
import { cn } from "@/shared/lib/utils";

interface StringFieldProps {
  dynamicField: Extract<FormField, { type: "string" }>;
  error: FieldError;
}

export const StringField = ({ dynamicField, error }: StringFieldProps) => {
  return (
    <Controller
      render={({ field }) => (
        <div className={dynamicField.label ? "flex items-center" : ""}>
          <FieldLabel label={dynamicField.label} />
          <div className={dynamicField.label ? "max-w-[200px]" : ""}>
            <Input
              value={field.value}
              onChange={field.onChange}
              type={dynamicField.type}
              placeholder={dynamicField.placeholder}
              disabled={dynamicField.disabled}
              className={cn({
                "max-w-[200px] w-full": dynamicField.label,
                "border-red-500": error,
              })}
            />
            {error && (
              <span className="text-red-500 text-sm">{error.message}</span>
            )}
          </div>
        </div>
      )}
      name={dynamicField.name}
    />
  );
};
