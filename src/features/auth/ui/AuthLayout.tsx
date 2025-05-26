import { Separator } from "@/shared/ui";
import { ReactNode } from "react";
import { SocialButtons } from "./SocialButtons";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  isSocial?: boolean;
}

export const AuthLayout = ({
  children,
  title,
  isSocial = true,
}: AuthLayoutProps) => {
  return (
    <div className="flex-1 flex justify-center gap-3 items-center mt-20 sm:mt-40">
      <div className="bg-white rounded-lg sm:shadow-md max-w-[500px] p-4 w-full">
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
