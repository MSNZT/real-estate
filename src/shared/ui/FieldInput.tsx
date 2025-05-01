"use client";
import { type HTMLInputTypeAttribute, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button, Icon, Input } from "@/shared/ui";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/Form";
import EyeHide from "@/shared/assets/eye-hide.svg";
import EyeShow from "@/shared/assets/eye-show.svg";
import { cn } from "../lib/utils";

interface FieldInputProps {
  name: string;
  label?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  className?: string;
}

export const FieldInput = (props: FieldInputProps) => {
  const { name, label, type = "text", placeholder, className } = props;
  const [showPassword, setShowPassword] = useState(false);
  const { control } = useFormContext();

  const togglePassButton = type === "password" && (
    <Button
      variant="ghost"
      size="clear"
      className="absolute right-3 p-1 top-1/2 -translate-y-1/2"
      onClick={() => setShowPassword((prev) => !prev)}
      type="button"
    >
      <Icon Svg={showPassword ? EyeShow : EyeHide} className="w-4 h-4" />
    </Button>
  );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full space-y-0">
          {label && <FormLabel>{label}</FormLabel>}
          <div className="relative">
            <FormControl>
              <Input
                value={field.value ?? ""}
                onChange={field.onChange}
                type={showPassword ? "text" : type}
                placeholder={placeholder}
                className={cn("m-0", className)}
              />
            </FormControl>
            {togglePassButton}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
