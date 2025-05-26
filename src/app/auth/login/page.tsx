import { AuthLayout, LoginForm } from "@/features/auth";

export default function Page() {
  return (
    <AuthLayout title="Авторизация">
      <LoginForm />
    </AuthLayout>
  );
}
