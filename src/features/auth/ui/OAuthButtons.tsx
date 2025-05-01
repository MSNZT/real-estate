import { authService } from "@/shared/services/auth.service";
import { Button } from "@/shared/ui";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaYandex } from "react-icons/fa";

export const OAuthButtons = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center gap-3">
      <Button
        onClick={() => router.push(authService.loginWithGoogle())}
        type="button"
        className="bg-transparent"
        variant="outline"
      >
        <FcGoogle size={16} />
      </Button>
      <Button
        onClick={() => router.push(authService.loginWithYandex())}
        type="button"
        className="bg-transparent"
        variant="outline"
      >
        <FaYandex size={16} className="fill-red-600" />
      </Button>
    </div>
  );
};
