import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/Form";
import { PhoneInput } from "@/shared/ui";

interface PhoneInputFieldProps {
  name: string;
  label?: string;
  defaultValue?: string;
}

export const PhoneInputField = ({
  name,
  label,
  defaultValue,
}: PhoneInputFieldProps) => {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <div>
            <FormControl>
              <PhoneInput
                value={field.value || defaultValue || ""}
                onChange={field.onChange}
                placeholder="+7 (912) 345-67-89"
                className="border-gray-300"
                mask="+{7} (000) 000-00-00"
              />
            </FormControl>
          </div>
          <FormMessage className="text-red-500" />
        </FormItem>
      )}
    />
  );
};
