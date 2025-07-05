"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { useClientMediaQuery } from "@/shared/lib/useClientMediaQuery";
import { Button } from "@/shared/ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/shared/ui/drawer";

interface AuthRequiredPopupProps {
  isOpen: boolean;
  onClose: () => void;
  redirect?: string;
}

export const AuthRequiredPopup = ({
  isOpen,
  onClose,
  redirect,
}: AuthRequiredPopupProps) => {
  const pathname = usePathname();

  const isDesktop = useClientMediaQuery({
    minWidth: "1024px",
  });
  const redirectTo = `redirect=${redirect ? redirect.slice(1) : pathname.slice(1)}`;

  const signInButton = (
    <Button asChild className="bg-foreground w-full rounded-lg justify-center">
      <Link href={`/auth/login?${redirectTo}`} onClick={onClose}>
        Войти
      </Link>
    </Button>
  );

  const signUpButton = (
    <Button
      asChild
      className="bg-muted-foreground w-full rounded-lg justify-center"
    >
      <Link href={`/auth/register?${redirectTo}`} onClick={onClose}>
        Зарегистрироваться
      </Link>
    </Button>
  );

  let content;
  if (isDesktop) {
    content = (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="p-5 rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-medium text-gray-900">
              Войдите в аккаунт
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              Для продолжения необходимо авторизоваться
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            {signInButton}
            {signUpButton}
          </div>
        </DialogContent>
      </Dialog>
    );
  } else {
    content = (
      <Drawer open={isOpen} onOpenChange={onClose}>
        <DrawerContent className="max-h-[30vh] h-full rounded-t-xl">
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader className="text-center pb-4">
              <DrawerTitle className="text-lg font-medium text-gray-900">
                Войдите в аккаунт
              </DrawerTitle>
              <DrawerDescription className="text-sm text-gray-500 mt-1">
                Для продолжения необходимо авторизоваться
              </DrawerDescription>
            </DrawerHeader>

            <DrawerFooter className="pt-0 pb-6">
              <div className="space-y-2">
                {signInButton}
                {signUpButton}
              </div>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    typeof document !== "undefined" && createPortal(content, document.body)
  );
};
