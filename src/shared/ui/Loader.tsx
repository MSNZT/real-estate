import { cn } from "../lib/utils";

interface LoaderProps {
  className?: string;
}

export const Loader = ({ className }: LoaderProps) => {
  return (
    <span
      className={cn(
        "h-10 w-10 border-[3px] border-black border-b-transparent rounded-full inline-block animate-spin",
        className
      )}
    />
  );
};
