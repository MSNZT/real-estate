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
      name={dynamicField.name}
      render={({ field }) => (
        <div>
          <div className="flex items-center flex-wrap">
            <FieldLabel label={dynamicField.label} />
            <div className="flex items-center gap-2 flex-wrap max-w-[800px]">
              {dynamicField.options.map((option) => {
                return (
                  <Button
                    onClick={() => field.onChange(option.value)}
                    key={option.label}
                    className={cn(
                      "flex justify-between items-center text-base hover:bg-chart-1 hover:text-white hover:outline-transparent",
                      {
                        "bg-chart-1 text-white outline-transparent":
                          field.value === option.value,
                      }
                    )}
                    type="button"
                    size="sm"
                    variant="outline"
                  >
                    {option.label}
                  </Button>
                );
              })}
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error.message}</p>}
        </div>
      )}
    />
  );
};
