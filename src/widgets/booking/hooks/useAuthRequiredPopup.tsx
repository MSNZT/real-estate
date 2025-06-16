"use client";
import { useClientMediaQuery } from "@/shared/lib/useClientMediaQuery";
import { Button } from "@/shared/ui";
import { Dialog, DialogContent, DialogHeader } from "@/shared/ui/dialog";
import {
  DrawerContent,
  DrawerHeader,
  Drawer,
  DrawerDescription,
  DrawerFooter,
  DrawerTitle,
} from "@/shared/ui/drawer";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import Link from "next/link";

interface UseAuthRequiredPopupArgs {
  isOpen: boolean;
  onClose: () => void;
  redirect?: string;
}

export const useAuthRequiredPopup = ({
  isOpen,
  onClose,
  redirect,
}: UseAuthRequiredPopupArgs) => {
  const isDesktop = useClientMediaQuery({
    minWidth: "1024px",
  });
  const redirectTo = `redirect=${redirect}`;

  if (isDesktop) {
    return (
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
            <Button
              asChild
              className="bg-foreground w-full rounded-lg justify-center"
            >
              <Link href={`/auth/login?${redirectTo}`}>Войти</Link>
            </Button>
            <Button
              asChild
              className="bg-muted-foreground w-full rounded-lg justify-center"
            >
              <Link href={`/auth/register?${redirectTo}`}>
                Зарегистрироваться
              </Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
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
              <Button
                asChild
                className="bg-foreground w-full rounded-lg justify-center"
              >
                <Link href={`/auth/login?${redirectTo}`}>Войти</Link>
              </Button>
              <Button
                asChild
                className="bg-muted-foreground w-full rounded-lg justify-center"
              >
                <Link href={`/auth/register?${redirectTo}`}>
                  Зарегистрироваться
                </Link>
              </Button>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
