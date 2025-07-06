import { Controller, FieldError } from "react-hook-form";
import { FormField } from "../../types/types";
import { Input } from "@/shared/ui";
import { FieldLabel } from "./FieldLabel";
import { cn } from "@/shared/lib/utils";

interface StringFieldProps {
  dynamicField: Extract<FormField, { type: "text" }>;
  error: FieldError;
}

export const TextField = ({ dynamicField, error }: StringFieldProps) => {
  return (
    <Controller
      name={dynamicField.name}
      render={({ field }) => (
        <div
          className={dynamicField.label ? "flex items-center flex-wrap" : ""}
        >
          <FieldLabel label={dynamicField.label} />
          <div
            className={cn(
              "w-full",
              dynamicField.disabled ? "max-w-[250px]" : "max-w-[200px]"
            )}
          >
            <Input
              value={field.value}
              onChange={field.onChange}
              type={dynamicField.type}
              placeholder={dynamicField.placeholder}
              disabled={dynamicField.disabled}
              className={cn({
                "disabled:border-0 disabled:text-gray-500": dynamicField.label,
                "border-red-500": error,
              })}
            />
            {error && (
              <span className="text-red-500 text-sm">{error.message}</span>
            )}
          </div>
        </div>
      )}
    />
  );
};
