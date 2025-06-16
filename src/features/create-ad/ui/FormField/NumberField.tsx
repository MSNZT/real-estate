import { Controller, FieldErrors } from "react-hook-form";
import { AdFormData, FormField } from "../../types/types";
import { Input } from "@/shared/ui";
import { FieldLabel } from "./FieldLabel";
import { FieldError } from "../DynamicFormField";
import { cn } from "@/shared/lib/utils";

interface NumberFieldProps {
  dynamicField: Extract<FormField, { type: "number" }>;
  error: FieldError;
}

export const NumberField = ({ dynamicField, error }: NumberFieldProps) => {
  return (
    <Controller
      render={({ field }) => (
        <div className={dynamicField.label ? "flex flex-col sm:flex-row" : ""}>
          <FieldLabel label={dynamicField.label} />
          <div>
            <Input
              value={field.value}
              onChange={(e) => field.onChange(e.target.valueAsNumber)}
              type={dynamicField.type}
              placeholder={dynamicField.placeholder}
              disabled={dynamicField.disabled}
              className={cn("border-gray-300", {
                "max-w-[200px] w-full ": dynamicField.label,
                "border-destructive": error,
              })}
            />
            {error && (
              <span className="text-destructive text-sm">{error.message}</span>
            )}
          </div>
        </div>
      )}
      name={dynamicField.name}
    />
  );
};
