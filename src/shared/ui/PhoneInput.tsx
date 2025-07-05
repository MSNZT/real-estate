"use client";
import { useIMask } from "react-imask";
import { Input } from "./Input";
import { ChangeEvent, Ref, useCallback, useEffect } from "react";
import { useIsMounted } from "../lib/useIsMounted";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  mask: string;
}

export const PhoneInput = ({
  mask,
  onChange,
  value,
  className,
  placeholder,
}: PhoneInputProps) => {
  const isMounted = useIsMounted();
  const {
    ref,
    value: maskedValue,
    setValue,
  } = useIMask({
    mask,
    unmask: true,
  });

  const handleChangeTelNumber = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setValue(value);
      onChange?.(value.replace(/\D/g, ""));
    },
    [setValue, onChange]
  );

  useEffect(() => {
    if (isMounted) {
      setValue(value);
    }
  }, [isMounted, setValue, value]);

  return (
    <Input
      ref={ref as Ref<HTMLInputElement>}
      value={maskedValue}
      className={className}
      placeholder={placeholder}
      inputMode="tel"
      type="tel"
      autoComplete="tel"
      onChange={handleChangeTelNumber}
    />
  );
};
