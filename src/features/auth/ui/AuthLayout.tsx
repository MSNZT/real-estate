import { Separator } from "@/shared/ui";
import { ReactNode } from "react";
import { SocialButtons } from "./SocialButtons";
import { cn } from "@/shared/lib/utils";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  isSocial?: boolean;
  className?: string;
}

export const AuthLayout = ({
  children,
  title,
  isSocial = true,
  className,
}: AuthLayoutProps) => {
  return (
    <div
      className={cn(
        "flex-1 flex justify-center gap-3 items-center mt-20 sm:mt-40",
        className
      )}
    >
      <div className="bg-white sm:shadow-md max-w-[500px] p-4 w-full">
        <h1 className="font-bold text-center text-2xl mb-6">{title}</h1>
        {children}
        {isSocial && (
          <>
            <div className="relative mb-6">
              <span className="absolute -top-[12px] left-1/2 -translate-x-1/2 bg-white text-slate-500 px-4">
                или
              </span>
              <Separator />
            </div>
            <SocialButtons />
          </>
        )}
      </div>
    </div>
  );
};
