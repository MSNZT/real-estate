import { Controller, ControllerRenderProps, FieldError } from "react-hook-form";
import { FormField } from "../../types/types";
import { Button } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { useCallback } from "react";
import { FieldLabel } from "./FieldLabel";

interface CheckboxFieldProps {
  dynamicField: Extract<FormField, { type: "checkbox" }>;
  error: FieldError;
}

type ValueType = string | number | boolean;

export const CheckboxField = ({ dynamicField, error }: CheckboxFieldProps) => {
  const onClickCheckbox = useCallback(
    (value: ValueType, field: ControllerRenderProps) => {
      const newSelectList = field.value?.includes(value)
        ? [...field.value.filter((v: ValueType) => v !== value)]
        : [...field.value, value];

      field.onChange(newSelectList);
    },
    []
  );

  return (
    <Controller
      render={({ field }) => (
        <div className="flex flex-col gap-2">
          <FieldLabel label={dynamicField.label} />
          <div className="flex items-center gap-2 flex-wrap max-w-[800px]">
            {dynamicField.options.map((option) => {
              return (
                <Button
                  onClick={() => onClickCheckbox(option.value, field)}
                  key={option.label}
                  type="button"
                  className={cn(
                    "flex justify-between items-center text-base hover:bg-active hover:text-white hover:outline-transparent",
                    {
                      "bg-blue-400 text-white outline-transparent":
                        field.value.includes(option.value),
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
