import { useRouter, useSearchParams } from "next/navigation";

export const useRedirectTo = () => {
  const params = useSearchParams();
  const router = useRouter();

  const redirectUrl = params.get("redirect");

  function handleRedirect() {
    if (redirectUrl) {
      router.push(redirectUrl);
      return;
    }
    router.push("/");
  }

  return {
    handleRedirect,
  };
};
