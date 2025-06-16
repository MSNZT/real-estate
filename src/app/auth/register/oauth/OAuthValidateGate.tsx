import { useAuthMutations } from "@/features/auth";
import { Container, Loader } from "@/shared/ui";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useEffect } from "react";

export const OAuthValidateGate = ({ children }: { children: ReactNode }) => {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");

  if (!token) {
    router.push("/");
    return;
  }

  const {
    oauthValidate: { mutate, isPending },
  } = useAuthMutations();

  useEffect(() => {
    if (token) {
      mutate(token);
    } else {
      router.push("/");
    }
  }, []);

  if (isPending) {
    return (
      <Container className="flex justify-center items-center h-[calc(100vh-81px)]">
        <Loader />
      </Container>
    );
  }
  return children;
};
