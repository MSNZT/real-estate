import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;

  if (!city) {
    redirect("/moscow");
  }
}
