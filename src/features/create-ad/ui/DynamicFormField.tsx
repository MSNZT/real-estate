import { AdFormData, FormField } from "../types/types";
import { FieldErrors, useFormContext } from "react-hook-form";
import { NumberField } from "./FormField/NumberField";
import { TextField } from "./FormField/TextField";
import { TextAreaField } from "./FormField/TextAreaField";
import { CheckboxField } from "./FormField/CheckboxField";
import { RadioField } from "./FormField/RadioField";
import { FieldLabel } from "./FormField/FieldLabel";
import { FileUploadForm } from "./FileUploadForm";

interface DynamicFormFieldProps {
  dynamicField: FormField;
}

export type FieldError = {
  message: string;
  ref: {
    name: string;
  };
  type: string;
};

export const DynamicFormField = ({ dynamicField }: DynamicFormFieldProps) => {
  const {
    formState: { errors },
  } = useFormContext<AdFormData>();

  const getNestedError = (errors: FieldErrors, path: string): FieldError =>
    path?.split(".").reduce((err: any, key) => {
      return err?.[key];
    }, errors);

  switch (dynamicField.type) {
    case "number": {
      return (
        <NumberField
          dynamicField={dynamicField}
          error={getNestedError(errors, dynamicField.name)}
        />
      );
    }
    case "text": {
      return (
        <TextField
          dynamicField={dynamicField}
          error={getNestedError(errors, dynamicField.name)}
        />
      );
    }
    case "textarea": {
      return (
        <TextAreaField
          dynamicField={dynamicField}
          error={getNestedError(errors, dynamicField.name)}
        />
      );
    }
    case "checkbox": {
      return (
        <CheckboxField
          dynamicField={dynamicField}
          error={getNestedError(errors, dynamicField.name)}
        />
      );
    }
    case "radio": {
      return (
        <RadioField
          dynamicField={dynamicField}
          error={getNestedError(errors, dynamicField.name)}
        />
      );
    }

    case "file": {
      return (
        <FileUploadForm
          dynamicField={dynamicField}
          error={getNestedError(errors, dynamicField.name)}
        />
      );
    }

    case "separator": {
      return <p>{dynamicField.content}</p>;
    }

    case "nested": {
      return (
        <div className="flex flex-col sm:flex-row sm:items-center">
          <FieldLabel label={dynamicField.label} />
          <div className="flex items-center gap-2 flex-wrap">
            {dynamicField.nestedFields.map((nestedField, index) => {
              const key = `nestedField-${index}`;
              return <DynamicFormField key={key} dynamicField={nestedField} />;
            })}
          </div>
        </div>
      );
    }
    default:
      return null;
  }
};
