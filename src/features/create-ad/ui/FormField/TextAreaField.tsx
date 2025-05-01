import { Controller, FieldError } from "react-hook-form";
import { FormField } from "../../types/types";
import { FieldLabel } from "./FieldLabel";
import { cn } from "@/shared/lib/utils";

interface TextAreaFieldProps {
  dynamicField: Extract<FormField, { type: "textarea" }>;
  error: FieldError;
}

export const TextAreaField = ({ dynamicField, error }: TextAreaFieldProps) => {
  return (
    <Controller
      render={({ field }) => (
        <div className="flex items-center">
          <FieldLabel label={dynamicField.label} />
          <div className="flex-1">
            <textarea
              value={field.value}
              onChange={field.onChange}
              contentEditable
              maxLength={2000}
              placeholder={dynamicField.placeholder}
              className={cn(
                "w-full border rounded-lg py-2 px-4 resize-none min-h-[100px] overflow-hidden",
                {
                  "max-w-[200px] w-full": dynamicField.label,
                  "border-red-500": error,
                }
              )}
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
