"use client";
import { type HTMLInputTypeAttribute } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/shared/ui";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/Form";
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
  const { control } = useFormContext();

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
                type={type}
                placeholder={placeholder}
                className={cn("m-0 border-gray-300", className)}
              />
            </FormControl>
          </div>
          <FormMessage className="text-red-500" />
        </FormItem>
      )}
    />
  );
};
