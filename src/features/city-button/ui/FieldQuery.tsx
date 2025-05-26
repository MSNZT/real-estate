import { cn } from "@/shared/lib/utils";
import { Button, Input } from "@/shared/ui";
import { X } from "lucide-react";
import { ChangeEvent } from "react";

interface FieldQueryProps {
  query: string;
  onReset: () => void;
  handleMutate: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  classNameWrapper?: string;
  classNameField?: string;
}

export const FieldQuery = ({
  query,
  handleMutate,
  onReset,
  placeholder,
  classNameWrapper,
  classNameField,
}: FieldQueryProps) => {
  return (
    <div className={cn("relative", classNameWrapper)}>
      <Input
        value={query}
        onChange={handleMutate}
        className={cn(
          "border-gray-300 hover:border-black focus:border-black placeholder:text-base",
          classNameField
        )}
        placeholder={placeholder}
      />
      {query.trim() && (
        <Button
          onClick={onReset}
          className="block absolute right-3 top-1/2 -translate-y-1/2"
          variant="clear"
          size="clear"
        >
          <X size={14} />
        </Button>
      )}
    </div>
  );
};
