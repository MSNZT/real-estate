import { ReactNode } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return {
    title:
      slug === "register"
        ? "Find Estate - Регистрация аккаунта"
        : "Find Estate - Авторизация",
  };
}

export default function AuthPageLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
