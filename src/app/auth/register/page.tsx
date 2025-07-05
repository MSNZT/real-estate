import { AuthLayout, RegisterForm } from "@/features/auth";

export default function Page() {
  return (
    <AuthLayout title="Регистрация" isSocial={false}>
      <RegisterForm />
    </AuthLayout>
  );
}
