import { FieldSection } from "../types/types";
import { DynamicFormField } from "./DynamicFormField";

interface AdFormSectionProps {
  section: FieldSection;
}

export const AdFormSection = ({ section }: AdFormSectionProps) => {
  return (
    <section>
      <h3 className="text-xl font-semibold mb-2">{section.label}</h3>
      {section.description && (
        <p className="mb-2 text-gray-500">{section.description}</p>
      )}
      <div className="flex flex-col gap-4 sm:gap-3">
        {section.fields.map((field, index) => {
          const key = `${section.label}-field-${index}`;
          return <DynamicFormField key={key} dynamicField={field} />;
        })}
      </div>
    </section>
  );
};
