import { authService } from "@/shared/services/auth.service";
import { FcGoogle } from "react-icons/fc";
import { FaYandex } from "react-icons/fa";
import Link from "next/link";

export const SocialButtons = () => {
  return (
    <div className="flex flex-col gap-3">
      <Link
        className="flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2.5 px-3.5 hover:bg-gray-50"
        href={authService.loginWithGoogle()}
      >
        <FcGoogle size={16} />
        <span className="font-semibold text-sm">Продолжить с Google</span>
      </Link>
      <Link
        className="flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2.5 px-3.5 hover:bg-gray-50"
        href={authService.loginWithYandex()}
      >
        <FaYandex size={16} className="fill-red-600" />
        <span className="font-semibold text-sm">Продолжить с Yandex</span>
      </Link>
    </div>
  );
};
