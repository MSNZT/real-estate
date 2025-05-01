import { Controller, FieldError } from "react-hook-form";
import { FormField } from "../../types/types";
import { FieldLabel } from "./FieldLabel";
import { Button } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";

interface RadioFieldProps {
  dynamicField: Extract<FormField, { type: "radio" }>;
  error: FieldError;
}

export const RadioField = ({ dynamicField, error }: RadioFieldProps) => {
  return (
    <Controller
      render={({ field }) => (
        <div className="flex flex-col sm:flex-row sm:items-center flex-wrap">
          <FieldLabel label={dynamicField.label} />
          <div className="flex items-center gap-2 flex-wrap max-w-[800px]">
            {dynamicField.options.map((option) => {
              return (
                <Button
                  onClick={() => field.onChange(option.value)}
                  key={option.label}
                  className={cn(
                    "flex justify-between items-center text-base hover:border-blue-500",
                    {
                      "bg-blue-500 text-white": field.value === option.value,
                    }
                  )}
                  size="sm"
                  variant="outline"
                >
                  {option.label}
                </Button>
              );
            })}
          </div>
          {error && <p className="text-red-500 text-sm">{error.message}</p>}
        </div>
      )}
      name={dynamicField.name}
    />
  );
};
