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
  label: string;
}

export const PhoneInputField = ({ name, label }: PhoneInputFieldProps) => {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <div>
            <FormControl>
              <PhoneInput
                value={field.value || "+79"}
                onChange={field.onChange}
                placeholder="+7 (912) 345-67-89"
                prefix="+7"
                maxLength={11}
                className="border-gray-300"
                type="tel"
              />
            </FormControl>
          </div>
          <FormMessage className="text-red-500" />
        </FormItem>
      )}
    />
  );
};
