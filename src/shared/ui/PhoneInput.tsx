"use client";
import { Input } from "@/shared/ui";
import { ChangeEvent, HTMLInputTypeAttribute, useRef } from "react";

interface PhoneInputProps {
  placeholder?: string;
  prefix: string;
  maxLength: number;
  className?: string;
  value: string;
  onChange: (value: string) => void;
  type: HTMLInputTypeAttribute;
}

const STATIC_CHAR_VALUES = ["(", ")", "-", ""];

export const PhoneInput = ({
  placeholder,
  prefix,
  maxLength,
  className,
  value: phoneNumber,
  onChange,
  type,
}: PhoneInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const lastPhoneLength = useRef<number>(phoneNumber?.length ?? 0);

  function formatPhoneValue(value: string): string {
    const digits = value.replace(/\D/g, "").slice(0, maxLength);

    let formatted = prefix;

    if (digits.length > 1) {
      const part1 = digits.slice(1, 4);
      const part2 = digits.slice(4, 7);
      const part3 = digits.slice(7, 9);
      const part4 = digits.slice(9, 11);

      if (part1) formatted += ` (${part1})`;
      if (part2) formatted += `-${part2}`;
      if (part3) formatted += `-${part3}`;
      if (part4) formatted += `-${part4}`;
    }
    return formatted;
  }

  function handleChangeValue(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target;
    const { value, selectionStart } = input;

    const previousPhone = phoneNumber;
    let newPhone = formatPhoneValue(value);

    if (
      newPhone === prefix &&
      previousPhone === prefix &&
      value.length < previousPhone.length
    ) {
      newPhone = prefix;
      onChange(newPhone);

      setTimeout(() => {
        inputRef.current?.setSelectionRange(2, 2);
      }, 0);
      return;
    }

    onChange(newPhone);

    lastPhoneLength.current = previousPhone.length;

    setTimeout(() => {
      if (!inputRef.current) return;

      let newPosition = selectionStart ?? 0;
      const lengthDiff = newPhone.length - previousPhone.length;

      if (lengthDiff > 0) {
        newPosition += lengthDiff;
      } else if (lengthDiff < 0 && selectionStart) {
        const deletedChar = previousPhone[selectionStart - 1];
        if (STATIC_CHAR_VALUES.includes(deletedChar)) {
          newPosition -= 1;
        }
      }

      inputRef.current.setSelectionRange(newPosition, newPosition);
    }, 0);
  }

  return (
    <Input
      ref={inputRef}
      value={phoneNumber}
      onChange={handleChangeValue}
      placeholder={placeholder}
      className={className}
      type={type}
    />
  );
};
